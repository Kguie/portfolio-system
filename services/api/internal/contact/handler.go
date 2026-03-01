package contact

import (
	"encoding/json"
	"errors"
	"io"
	"net"
	"net/http"
	"strings"

	"github.com/Kguie/portfolio-system/services/api/internal/httpjson"
)

const requestIDHeader = "X-Request-ID"

type Handler struct {
	service *Service
}

type submitRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
	HP      string `json:"hp"`
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Submit(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	var req submitRequest
	if err := decoder.Decode(&req); err != nil {
		httpjson.WriteError(w, http.StatusBadRequest, "invalid_json", "invalid request body", requestIDFromResponse(w))
		return
	}
	if err := decoder.Decode(&struct{}{}); err != nil && !errors.Is(err, io.EOF) {
		httpjson.WriteError(w, http.StatusBadRequest, "invalid_json", "request body must contain a single JSON object", requestIDFromResponse(w))
		return
	}

	userAgent := strings.TrimSpace(r.UserAgent())
	input := SubmitInput{
		Name:    req.Name,
		Email:   req.Email,
		Message: req.Message,
		HP:      req.HP,
		IP:      clientIP(r),
	}
	if userAgent != "" {
		input.UserAgent = &userAgent
	}

	err := h.service.Submit(r.Context(), input)
	if err == nil {
		httpjson.WriteJSON(w, http.StatusAccepted, map[string]string{"status": "accepted"})
		return
	}

	serviceErr, ok := err.(*ServiceError)
	if !ok {
		httpjson.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to process contact request", requestIDFromResponse(w))
		return
	}

	switch serviceErr.Kind {
	case ErrorInvalidInput:
		httpjson.WriteError(w, http.StatusBadRequest, string(ErrorInvalidInput), serviceErr.Message, requestIDFromResponse(w))
	case ErrorSpam:
		httpjson.WriteError(w, http.StatusBadRequest, string(ErrorSpam), serviceErr.Message, requestIDFromResponse(w))
	case ErrorRateLimited:
		httpjson.WriteError(w, http.StatusTooManyRequests, string(ErrorRateLimited), serviceErr.Message, requestIDFromResponse(w))
	default:
		httpjson.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to process contact request", requestIDFromResponse(w))
	}
}

func clientIP(r *http.Request) string {
	forwarded := strings.TrimSpace(r.Header.Get("X-Forwarded-For"))
	if forwarded != "" {
		parts := strings.Split(forwarded, ",")
		for _, part := range parts {
			ip := strings.TrimSpace(part)
			if ip != "" {
				return ip
			}
		}
	}

	remote := strings.TrimSpace(r.RemoteAddr)
	if remote == "" {
		return "unknown"
	}

	host, _, err := net.SplitHostPort(remote)
	if err == nil && strings.TrimSpace(host) != "" {
		return host
	}

	return remote
}

func requestIDFromResponse(w http.ResponseWriter) string {
	return strings.TrimSpace(w.Header().Get(requestIDHeader))
}
