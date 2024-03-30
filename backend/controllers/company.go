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
	// "github.com/go-chi/render"
)

func RetrieveCompany(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	filter := r.URL.Query().Get("filter")
	page := r.URL.Query().Get("page")
	rowCount := r.URL.Query().Get("rowCount")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from company_filtered_get($1,$2,$3)) t;", filter, page, rowCount).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Company", result)
	u.RespondJson(w, resp)
}

func DeleteCompany(w http.ResponseWriter, r *http.Request) {
	msg := "Deleted Company"
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
	_, err = db.Exec(ctx, "call  company_delete($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Deleting Company")
		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

func SaveCompany(w http.ResponseWriter, r *http.Request) {
	validate := validator.New()
	msg := "Submit Success"
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}
	output := input

	errs := validate.Var(output["company_name"], "required")
	if errs != nil {
		resp := u.Error("Company Name is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["company_prefix"], "required")
	if errs != nil {
		resp := u.Error("Prefix is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["address"], "required")
	if errs != nil {
		resp := u.Error("Address is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["telephone"], "required,len=10")
	if errs != nil {
		resp := u.Error("Valid Telephone No is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["fax"], "omitempty,len=10")
	if errs != nil {
		resp := u.Error("Valid Fax No is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["email"], "required,email")
	if errs != nil {
		resp := u.Error("Valid Email is Required")
		u.RespondJson(w, resp)
		return
	}
	vatPercentage, ok := output["vat_percentage"].(string)
	if !ok || vatPercentage == "" {
		output["vat_percentage"] = 0
	}

	output["user_id"] = m.DecodeJWT("user_id", r)
	jsonb, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Parsing Failed")
		u.RespondJson(w, resp)
		return
	}

	_, err = db.Exec(ctx, "call company_save($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Saving Company profile")
		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

func RetrieveCompanyById(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	id := chi.URLParam(r, "id")
	if id == "" {
		resp := u.Error("Company ID missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from company_get() where company_code =$1) t;", id).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Company", result)
	u.RespondJson(w, resp)
}

func RetrieveCompanyList(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from company_get()) t;").Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Area", result)
	u.RespondJson(w, resp)
}

func RetrieveCompanyByName(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	name := chi.URLParam(r, "name")
	if name == "" {
		resp := u.Error("company name missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from company_by_name_get($1)) t;", name).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved comapny", result)
	u.RespondJson(w, resp)
}

func RetrieveBarcodePrinter(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	id := m.DecodeJWT("company_code", r)
	if id == "" {
		resp := u.Error("Company ID missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from company_get() where company_code =$1) t;", id).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Company", result)
	u.RespondJson(w, resp)
}
