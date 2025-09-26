package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var users []User
var ID int
var mu sync.Mutex

func AddUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request type", http.StatusBadRequest)
		return
	}
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	if newUser.Name == "" || newUser.Email == "" {
		http.Error(w, "name and email are required fields", http.StatusBadRequest)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	ID++
	newUser.ID = ID
	users = append(users, newUser)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "invalid request type", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	mu.Lock()
	defer mu.Unlock()
	json.NewEncoder(w).Encode(users)
}

func main() {
	http.Handle("/adduser", http.HandlerFunc(AddUser))
	http.Handle("/users", http.HandlerFunc(GetAllUsers))
	fmt.Println("server started at :8000")
	http.ListenAndServe(":8000", nil)
}
