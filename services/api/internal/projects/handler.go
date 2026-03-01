package projects

import (
	"net/http"
	"strings"

	"github.com/Kguie/portfolio-system/services/api/internal/httpjson"
	"github.com/go-chi/chi/v5"
)

const requestIDHeader = "X-Request-ID"

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	projects, err := h.service.List(r.Context())
	if err != nil {
		httpjson.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to list projects", requestIDFromResponse(w))
		return
	}
	httpjson.WriteJSON(w, http.StatusOK, projects)
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	idOrSlug := chi.URLParam(r, "idOrSlug")
	project, ok, err := h.service.GetByIDOrSlug(r.Context(), idOrSlug)
	if err != nil {
		httpjson.WriteError(w, http.StatusInternalServerError, "internal_error", "failed to fetch project", requestIDFromResponse(w))
		return
	}
	if !ok {
		httpjson.WriteError(w, http.StatusNotFound, "project_not_found", "project not found", requestIDFromResponse(w))
		return
	}
	httpjson.WriteJSON(w, http.StatusOK, project)
}

func requestIDFromResponse(w http.ResponseWriter) string {
	return strings.TrimSpace(w.Header().Get(requestIDHeader))
}
