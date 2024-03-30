package controllers

import (
	m "backend/middleware"
	u "backend/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func RetrieveLocation(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output interface{}
	locationId := chi.URLParam(r, "id")
	if locationId == "" {
		resp := u.Error("Location ID missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT row_to_json(t.*) as result from (SELECT * from location_get() where location_code =$1) t;", locationId).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Location", result)
	u.RespondJson(w, resp)
}

func SaveLocation(w http.ResponseWriter, r *http.Request) {
	msg := "Submit Success"
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}
	output := input
	output["company_code"] = m.DecodeJWT("company_code", r)
	output["user_id"] = m.DecodeJWT("user_id", r)

	jsonb, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Parsing Failed")
		u.RespondJson(w, resp)
		return
	}
	_, err = db.Exec(ctx, "call location_save($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Saving Location")
		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

func DeleteLocation(w http.ResponseWriter, r *http.Request) {
	msg := "Deleted Location"
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}
	locationId := input["location_code"]
	if locationId == "" {
		resp := u.Error("Location Code missing")
		u.RespondJson(w, resp)
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
	_, err = db.Exec(ctx, "call location_delete($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Deleting Location")
		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

func RetrieveLocations(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	filter := r.URL.Query().Get("filter")
	page := r.URL.Query().Get("page")
	rowCount := r.URL.Query().Get("rowCount")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from locations_filtered_get($1,$2,$3)) t;", filter, page, rowCount).Scan(&outputStr)
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

func RetrieveLocationList(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from location_get()) t;").Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Location List", result)
	u.RespondJson(w, resp)
}
