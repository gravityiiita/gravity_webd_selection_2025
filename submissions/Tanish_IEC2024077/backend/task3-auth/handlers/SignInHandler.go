package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/JoYBoY1210/task3/db"
	"github.com/JoYBoY1210/task3/models"
	"github.com/JoYBoY1210/task3/utils"
)

type SignInInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var login SignInInput

	err := json.NewDecoder(r.Body).Decode(&login)

	if err != nil {
		http.Error(w, "invalid input", http.StatusBadRequest)
		return
	}
	var user models.User
	err = db.DB.QueryRow("SELECT id, password FROM users WHERE email = ?", login.Email).Scan(&user.ID, &user.Password)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if !utils.ComparePassword(login.Password, user.Password) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})

}
