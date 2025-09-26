package handlers

import (
	"io"
	"net/http"
	"os"

	"github.com/JoYBoY1210/task3/db"
	"github.com/JoYBoY1210/task3/utils"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Could not parse form", http.StatusBadRequest)
		return
	}

	username := r.FormValue("username")
	email := r.FormValue("email")
	password := r.FormValue("password")

	file, handler, err := r.FormFile("profile_image")
	profileImagePath := ""
	if err == nil {
		defer file.Close()
		profileImagePath = "uploads/" + handler.Filename

		dst, err := os.Create(profileImagePath)
		if err != nil {
			http.Error(w, "Could not save image", http.StatusInternalServerError)
			return
		}
		defer dst.Close()
		_, err = io.Copy(dst, file)
		if err != nil {
			http.Error(w, "Could not save image", http.StatusInternalServerError)
			return
		}
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	_, err = db.DB.Exec("INSERT INTO users(username, email, password, profile_image) VALUES(?,?,?,?)",
		username, email, hashedPassword, profileImagePath)
	if err != nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))
}
