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

//Retrieve bill function

func RetrieveBill(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	filter := r.URL.Query().Get("filter")
	page := r.URL.Query().Get("page")
	rowCount := r.URL.Query().Get("rowCount")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from bill_filtered_get($1,$2,$3)) t;", filter, page, rowCount).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved bill", result)
	u.RespondJson(w, resp)
}

func SaveBill(w http.ResponseWriter, r *http.Request) {

	validate := validator.New()
	msg := "Submit Success"

	//Decodind JSON Request body  which will hold the submitted data.
	var input map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		u.RespondJson(w, u.Message(false, "Error while decoding request body"))
		return
	}

	output := input

	// This line checks if the area_name field in the input data is present. If it's missing, it will produce an error.
	errs := validate.Var(output["bill_name"], "required")
	if errs != nil {
		resp := u.Error("Bill Name is Required")
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
	_, err = db.Exec(ctx, "call bill_save($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Saving Bill")
		u.RespondJson(w, resp)
		return
	} else {
		id := "id"
		err := db.QueryRow(ctx, "Select last_gen_code From gen_codes Where gen_ref= 'MBIL';").Scan(&id)
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

// Delete Bill

func DeleteBill(w http.ResponseWriter, r *http.Request) {
	msg := "Deleted Bill"
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
	_, err = db.Exec(ctx, "call bill_delete($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Deleting Bill")
		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

//RetrievebyIdBill

func RetrievebyIdBill(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	id := chi.URLParam(r, "id")
	if id == "" {
		resp := u.Error("Bill ID missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from bill_get() where bill_code =$1) t;", id).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Bill", result)
	u.RespondJson(w, resp)
}

//Retrive bill list

func RetrieveBillList(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from bill_get()) t;").Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Bill", result)
	u.RespondJson(w, resp)
}

func RetrieveBillByName(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	name := chi.URLParam(r, "name")
	if name == "" {
		resp := u.Error("bill name missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from bill_by_name_get($1)) t;", name).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved bill", result)
	u.RespondJson(w, resp)
}
