package controllers

import (
	m "backend/middleware"
	u "backend/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
	// "github.com/go-chi/render"
)

func Retrieve(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	filter := r.URL.Query().Get("filter")
	page := r.URL.Query().Get("page")
	rowCount := r.URL.Query().Get("rowCount")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from doctor_group_filter_get($1,$2,$3)) t;", filter, page, rowCount).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved area", result)
	u.RespondJson(w, resp)
}
func SaveDoctorGroup(w http.ResponseWriter, r *http.Request) {
	validate := validator.New()
	msg := "Submit Success"
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}

	output := input

	errs := validate.Var(output["doctor_group_name"], "required")
	if errs != nil {
		resp := u.Error("doctor group name is Required")
		u.RespondJson(w, resp)
		return
	}

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
	_, err = db.Exec(ctx, "call doctor_groupe_save($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed SavingDoctor Groupe")
		u.RespondJson(w, resp)
		return
	} else {
		id := "id"
		err := db.QueryRow(ctx, "Select last_gen_code From gen_codes Where gen_ref= 'MDRG';").Scan(&id)
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

func Delete(w http.ResponseWriter, r *http.Request) {
	msg := "Deleted"
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
	_, err = db.Exec(ctx, "call doctor_group_delete($1)", string(jsonb[:]))
	if err != nil {

		fmt.Println("Database Error:", err.Error())
		resp := u.Error("Failed Deleting Area")

		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

func RetrievebyId(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	id := chi.URLParam(r, "id")
	if id == "" {
		resp := u.Error("Area ID missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from doctor_groupe_get() where doctor_group_code =$1) t;", id).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully RetrievedDoctore group", result)
	u.RespondJson(w, resp)
}

// func RetrieveDoctorGroupNameList(w http.ResponseWriter, r *http.Request) {
// 	result := map[string]interface{}{}
// 	var outputStr string
// 	var output []interface{}
// 	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from doctor_groupid_get()) t;").Scan(&outputStr)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		resp := u.Error("Records not available")
// 		u.RespondJson(w, resp)
// 		return
// 	}
// 	json.Unmarshal([]byte(outputStr), &output)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		resp := u.Error("Record decoding Failed")
// 		u.RespondJson(w, resp)
// 		return
// 	}
// 	result["data"] = output
// 	resp := u.PayloadWithMessage(true, "Successfully Retrieved  ", result)
// 	u.RespondJson(w, resp)
// }

func RetrieveDoctorGroupeList(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from doctor_groupe_get()) t;").Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved groupe doctors", result)
	u.RespondJson(w, resp)
}

// func RetrieveDoctorGroupeByName(w http.ResponseWriter, r *http.Request) {
// 	result := map[string]interface{}{}
// 	var outputStr string
// 	var output []interface{}
// 	name := chi.URLParam(r, "name")
// 	if name == "" {
// 		resp := u.Error("area name missing")
// 		u.RespondJson(w, resp)
// 		return
// 	}
// 	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from area_by_name_get($1)) t;", name).Scan(&outputStr)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		resp := u.Error("Records not available")
// 		u.RespondJson(w, resp)
// 		return
// 	}
// 	json.Unmarshal([]byte(outputStr), &output)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		resp := u.Error("Record decoding Failed")
// 		u.RespondJson(w, resp)
// 		return
// 	}
// 	result["data"] = output
// 	resp := u.PayloadWithMessage(true, "Successfully Retrieved area", result)
// 	u.RespondJson(w, resp)
// }