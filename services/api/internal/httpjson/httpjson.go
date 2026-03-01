package httpjson

import (
	"encoding/json"
	"net/http"
)

type errorBody struct {
	Code      string `json:"code"`
	Message   string `json:"message"`
	RequestID string `json:"requestId,omitempty"`
}

type responseBody struct {
	Data  any        `json:"data,omitempty"`
	Error *errorBody `json:"error,omitempty"`
}

func WriteJSON(w http.ResponseWriter, status int, data any) {
	write(w, status, responseBody{Data: data})
}

func WriteError(w http.ResponseWriter, status int, code, message, requestID string) {
	write(w, status, responseBody{
		Error: &errorBody{
			Code:      code,
			Message:   message,
			RequestID: requestID,
		},
	})
}

func write(w http.ResponseWriter, status int, payload responseBody) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)

	enc := json.NewEncoder(w)
	enc.SetEscapeHTML(true)
	_ = enc.Encode(payload)
}
