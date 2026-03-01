package contact

import (
	"context"
	"errors"
	"net/mail"
	"strings"
	"sync"
	"time"
	"unicode/utf8"
)

const (
	defaultRateLimitMax    = 3
	defaultRateLimitWindow = 10 * time.Minute
)

type Service struct {
	repo    Repository
	limiter *inMemoryRateLimiter
	now     func() time.Time
}

type SubmitInput struct {
	Name      string
	Email     string
	Message   string
	HP        string
	IP        string
	UserAgent *string
}

type ErrorKind string

const (
	ErrorInvalidInput ErrorKind = "invalid_input"
	ErrorSpam         ErrorKind = "spam_detected"
	ErrorRateLimited  ErrorKind = "rate_limited"
	ErrorInternal     ErrorKind = "internal_error"
)

type ServiceError struct {
	Kind    ErrorKind
	Message string
}

func (e *ServiceError) Error() string {
	return e.Message
}

func NewService(repo Repository) *Service {
	return &Service{
		repo:    repo,
		limiter: newInMemoryRateLimiter(defaultRateLimitMax, defaultRateLimitWindow),
		now:     time.Now,
	}
}

func (s *Service) Submit(ctx context.Context, input SubmitInput) error {
	if s == nil || s.repo == nil {
		return &ServiceError{Kind: ErrorInternal, Message: errors.New("contact service not configured").Error()}
	}

	if strings.TrimSpace(input.HP) != "" {
		return &ServiceError{Kind: ErrorSpam, Message: "submission rejected"}
	}

	name := strings.TrimSpace(input.Name)
	if n := utf8.RuneCountInString(name); n < 2 || n > 80 {
		return &ServiceError{Kind: ErrorInvalidInput, Message: "name must be between 2 and 80 characters"}
	}

	email := strings.TrimSpace(input.Email)
	if !isValidEmail(email) {
		return &ServiceError{Kind: ErrorInvalidInput, Message: "email is invalid"}
	}

	message := strings.TrimSpace(input.Message)
	if n := utf8.RuneCountInString(message); n < 10 || n > 2000 {
		return &ServiceError{Kind: ErrorInvalidInput, Message: "message must be between 10 and 2000 characters"}
	}

	ip := strings.TrimSpace(input.IP)
	if ip == "" {
		ip = "unknown"
	}

	if !s.limiter.Allow(ip, s.now()) {
		return &ServiceError{Kind: ErrorRateLimited, Message: "too many contact attempts, try again later"}
	}

	if err := s.repo.Save(ctx, Submission{
		Name:      name,
		Email:     email,
		Message:   message,
		IP:        ip,
		UserAgent: input.UserAgent,
	}); err != nil {
		return &ServiceError{Kind: ErrorInternal, Message: "failed to persist contact request"}
	}

	return nil
}

func isValidEmail(email string) bool {
	if email == "" || !strings.Contains(email, "@") {
		return false
	}

	addr, err := mail.ParseAddress(email)
	if err != nil {
		return false
	}

	return strings.EqualFold(addr.Address, email)
}

type inMemoryRateLimiter struct {
	max    int
	window time.Duration

	mu   sync.Mutex
	hits map[string][]time.Time
}

func newInMemoryRateLimiter(max int, window time.Duration) *inMemoryRateLimiter {
	if max <= 0 {
		max = defaultRateLimitMax
	}
	if window <= 0 {
		window = defaultRateLimitWindow
	}

	return &inMemoryRateLimiter{
		max:    max,
		window: window,
		hits:   make(map[string][]time.Time),
	}
}

func (l *inMemoryRateLimiter) Allow(key string, now time.Time) bool {
	if key == "" {
		key = "unknown"
	}

	cutoff := now.Add(-l.window)

	l.mu.Lock()
	defer l.mu.Unlock()

	filtered := l.hits[key][:0]
	for _, ts := range l.hits[key] {
		if ts.After(cutoff) {
			filtered = append(filtered, ts)
		}
	}

	if len(filtered) >= l.max {
		l.hits[key] = filtered
		return false
	}

	filtered = append(filtered, now)
	l.hits[key] = filtered
	return true
}
