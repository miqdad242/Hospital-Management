package controllers

import (
	m "backend/middleware"
	u "backend/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type UserCredentials struct {
	LoginId      string
	UserName     string
	PasswordHash string
	CompanyCode  string
}

func Validate(w http.ResponseWriter, r *http.Request) {
	user := m.DecodeJWT("user_name", r)
	resp := u.Message(true, fmt.Sprintf("User logged In - Hello %s", user))
	u.RespondJson(w, resp)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}
	userName := input["user_name"].(string)
	password := input["password"].(string)
	location := input["location"].(string)
	hospital := input["working_hospital"].(string)
	if userName == "" {
		resp := u.Error("User Name missing")
		u.RespondJson(w, resp)
		return
	}
	if password == "" {
		resp := u.Error("Password missing")
		u.RespondJson(w, resp)
		return
	}
	if location == "" {
		resp := u.Error("Location missing")
		u.RespondJson(w, resp)
		return
	}
	if hospital == "" {
		resp := u.Error("Location missing")
		u.RespondJson(w, resp)
		return
	}
	var creds UserCredentials
	err = db.QueryRow(ctx, "select login_id,user_name,password_hash,company_code from get_user_creds($1)", userName).Scan(&creds.LoginId, &creds.UserName, &creds.PasswordHash, &creds.CompanyCode)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("User not available")
		u.RespondJson(w, resp)
		return
	}
	passwordMatched, err := u.ComparePasswordAndHash(password, creds.PasswordHash)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Password Comparison Failed")
		u.RespondJson(w, resp)
		return
	}
	if passwordMatched {
		claims := map[string]interface{}{"user_id": creds.LoginId, "user_name": creds.UserName, "company_code": creds.CompanyCode, "location_code": location,"working_hospital":hospital}
		token := m.EncodeJWT(claims)
		payload := map[string]interface{}{"user_id": creds.LoginId, "token": token, "user_name": creds.UserName}
		w.Header().Add("Authorization", fmt.Sprintf("Bearer %s", token))
		cookie := http.Cookie{}
		cookie.Name = "jwt"
		cookie.Value = token
		cookie.Secure = true
		cookie.Expires = time.Now().Add(24 * time.Hour)
		http.SetCookie(w, &cookie)
		resp := u.PayloadWithMessage(true, "Login Successful", payload)
		u.RespondJson(w, resp)
		return
	} else {
		token := ""
		w.Header().Add("Authorization", fmt.Sprintf("Bearer %s", token))
		resp := u.Message(false, "Login Failed - Password Not Matching")
		cookie := http.Cookie{}
		cookie.Name = "jwt"
		cookie.Value = token
		cookie.Secure = true
		cookie.Expires = time.Now().Add(24 * time.Hour)
		http.SetCookie(w, &cookie)
		u.RespondJson(w, resp)
		return
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	token := ""
	w.Header().Add("Authorization", fmt.Sprintf("Bearer %s", token))
	resp := u.Message(true, "Logged out Successfully")
	cookie := http.Cookie{}
	cookie.Name = "jwt"
	cookie.Value = token
	cookie.Secure = true
	cookie.Expires = time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &cookie)
	u.RespondJson(w, resp)
}

func RetrieveUserLocations(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	user_id := r.URL.Query().Get("user_id")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from user_location_get($1)) t;", user_id).Scan(&outputStr)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Records not available")
		u.RespondJson(w, resp)
		return
	}
	json.Unmarshal([]byte(outputStr), &output)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Record decoding Failed")
		u.RespondJson(w, resp)
		return
	}
	result["data"] = output
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Locations", result)
	u.RespondJson(w, resp)
}

func RetrieveUserWorkingHospital(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	user_id := r.URL.Query().Get("user_id")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from user_working_hospital_get() where login_id = $1) t;", user_id).Scan(&outputStr)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Records not available")
		u.RespondJson(w, resp)
		return
	}
	json.Unmarshal([]byte(outputStr), &output)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Record decoding Failed")
		u.RespondJson(w, resp)
		return
	}
	result["data"] = output
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Locations", result)
	u.RespondJson(w, resp)
}
