package routes

import (
	"net/http"

	"github.com/JoYBoY1210/task2/handlers"
)

func SetupRoutes(h *handlers.Handler) *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/addtodo", h.AddTodo)
	mux.HandleFunc("/getTodos", h.GetTodos)
	mux.HandleFunc("/updateTodo", h.UpdateTodo)
	mux.HandleFunc("/todos/{id}/delete", h.DeleteTodo)
	mux.HandleFunc("/todos/{id}/completed", h.CompleteTodos)

	return mux

}
