package controllers

import (
	m "backend/middleware"
	u "backend/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func RetrieveUserSecurityLocations(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	user_code := chi.URLParam(r, "id")
	if user_code == "" {
		resp := u.Error("user id missing")
		u.RespondJson(w, resp)
		return
	}

	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from user_security_location_rights_get($1)) t;", user_code).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Security Locations", result)
	u.RespondJson(w, resp)
}
func SaveUserSecurityLocations(w http.ResponseWriter, r *http.Request) {
	msg := "Submit Success"
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}

	output := input
	output["user_id"] = m.DecodeJWT("user_id", r)
	jsonb, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Parsing Failed")
		u.RespondJson(w, resp)
		return
	}
	fmt.Println("Debug JSON:", string(jsonb))
	data := make(map[string]interface{})
	_, err = db.Exec(ctx, "call security_location_rights_save($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Saving Location Rights")
		u.RespondJson(w, resp)
		return
	} else {
		id := "id"
		if err != nil {
			fmt.Println(err.Error())
			resp := u.Error("ID Get Failed")
			u.RespondJson(w, resp)
			return
		}
		data["id"] = id
	}
	resp := u.PayloadWithMessage(true, msg, data)
	u.RespondJson(w, resp)
}
