package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/JoYBoY1210/task2/models"
)

type Handler struct {
	DB *sql.DB
}

func (h *Handler) AddTodo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request type", http.StatusBadRequest)
		return
	}
	var todo models.Todo
	err := json.NewDecoder(r.Body).Decode(&todo)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if todo.Title == "" {
		http.Error(w, "Title is a required field", http.StatusBadRequest)
		return
	}
	result, err := h.DB.Exec("INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)", todo.Title, todo.Description, todo.Completed)
	if err != nil {
		http.Error(w, "Failed to add todo", http.StatusInternalServerError)
		return
	}
	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, "Failed to retrieve last insert id", http.StatusInternalServerError)
		return
	}
	todo.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(todo)
}

func (h *Handler) GetTodos(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request type", http.StatusBadRequest)
		return
	}
	var todos []models.Todo
	rows, err := h.DB.Query("SELECT id,title,description,completed FROM todos")
	if err != nil {
		http.Error(w, "Failed to fetch todos", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var todo models.Todo
		err := rows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Completed)
		if err != nil {
			http.Error(w, "Failed to scan todo", http.StatusInternalServerError)
			return
		}
		todos = append(todos, todo)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}

func (h *Handler) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Invalid request type", http.StatusBadRequest)
		return
	}
	var todo models.Todo
	err := json.NewDecoder(r.Body).Decode(&todo)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if todo.ID == 0 {
		http.Error(w, "ID is a required field", http.StatusBadRequest)
		return
	}
	_, err = h.DB.Exec("UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?", todo.Title, todo.Description, todo.Completed, todo.ID)
	if err != nil {
		http.Error(w, "Failed to update todo", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *Handler) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid request type", http.StatusBadRequest)
		return
	}
	id := strings.TrimPrefix(r.URL.Path, "/todos/")
	id = strings.TrimSuffix(id, "/delete")
	ID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	_, err = h.DB.Exec("DELETE FROM todos WHERE id = ?", ID)
	if err != nil {
		http.Error(w, "Failed to delete todo", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("deleted todo successfully")

}

func (h *Handler) CompleteTodos(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Invalid request type", http.StatusBadRequest)
		return
	}
	id := strings.TrimPrefix(r.URL.Path, "/todos/")
	id = strings.TrimSuffix(id, "/completed")
	ID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	_, err = h.DB.Exec("UPDATE todos SET completed = 1 WHERE id = ?", ID)
	if err != nil {
		http.Error(w, "Failed to mark todo as completed", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("marked todo as completed successfully")
}
