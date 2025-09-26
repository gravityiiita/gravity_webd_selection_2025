package main

import (
	"fmt"
	"net/http"

	"github.com/JoYBoY1210/task2/db"
	"github.com/JoYBoY1210/task2/handlers"
	"github.com/JoYBoY1210/task2/routes"
)

func main() {
	Dbconn := db.InitDB()

	h := handlers.Handler{DB: Dbconn}
	mux := routes.SetupRoutes(&h)
	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", mux)
}
