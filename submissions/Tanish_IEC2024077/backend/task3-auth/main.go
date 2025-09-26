package main

import (
	"log"
	"net/http"

	"github.com/JoYBoY1210/task3/db"
	"github.com/JoYBoY1210/task3/handlers"
)

func main() {
	db.Init()

	http.HandleFunc("/signup", handlers.Signup)
	http.HandleFunc("/login", handlers.SignIn)

	log.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
