package controllers

import (
	m "backend/middleware"
	u "backend/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
	// "github.com/go-chi/render"
)

func RetrieveUser(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	filter := r.URL.Query().Get("filter")
	page := r.URL.Query().Get("page")
	rowCount := r.URL.Query().Get("rowCount")
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from user_filtered_get($1,$2,$3)) t;", filter, page, rowCount).Scan(&outputStr)
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

func SaveUser(w http.ResponseWriter, r *http.Request) {
	validate := validator.New()
	msg := "Submit Success"
	input := make(map[string]interface{})
	// err := json.NewDecoder(r.Body).Decode(&input)
	// if err != nil {
	// 	u.RespondJson(w, u.Message(false, "Error while decoding request body"))
	// 	return
	// }

	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		fmt.Println(err)
		resp := u.Error("Unable to parse form")
		u.RespondJson(w, resp)
		return
	}

	// Get a reference to the uploaded file
	dirImage := "./uploads/profileimage/" //must start with ./ and end with /
	dirSign := "./uploads/signature/"     //must start with ./ and end with /
	fileName := ""

	file, handler, err := r.FormFile("image")
	if err == nil {
		defer file.Close()

		fileName, err = u.UploadFile(handler.Filename, dirImage, file)
		if err != nil {
			resp := u.Error("Error uploading the image")
			u.RespondJson(w, resp)
			return
		}

		input["image"] = fileName
	}

	file, handler, err = r.FormFile("signature")
	if err == nil {
		defer file.Close()

		fileName, err = u.UploadFile(handler.Filename, dirSign, file)
		if err != nil {
			resp := u.Error("Error uploading the image")
			u.RespondJson(w, resp)
			return
		}

		input["signature"] = fileName
	}

	input["user_id"] = m.DecodeJWT("user_id", r)
	for key, value := range r.Form {
		input[key] = value[0]
	}
	output := input

	errs := validate.Var(output["user_name"], "required")
	if errs != nil {
		resp := u.Error("Area Name is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["login_id"], "required")
	if errs != nil {
		resp := u.Error("Login ID is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["company_code"], "required")
	if errs != nil {
		resp := u.Error("Company is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["department_code"], "required")
	if errs != nil {
		resp := u.Error("Department is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["email"], "required,email")
	if errs != nil {
		resp := u.Error("Valid Email is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["mobile_no"], "required,len=10")
	if errs != nil {
		resp := u.Error("Valid Mobile No is Required")
		u.RespondJson(w, resp)
		return
	}
	errs = validate.Var(output["telephone_no"], "omitempty,len=10")
	if errs != nil {
		resp := u.Error("Valid Telephone No is Required")
		u.RespondJson(w, resp)
		return
	}

	if output["user_code"] == nil || output["user_code"] == "" {
		errs = validate.Var(output["password_hash"], "required,min=8")
		if errs != nil {
			resp := u.Error("Valid Password is Required")
			u.RespondJson(w, resp)
			return
		}

		if output["is_cashier"] == true {
			errs = validate.Var(output["cashier_pwd_hash"], "required,min=8")
			if errs != nil {
				resp := u.Error("Valid Cashier Password is Required")
				u.RespondJson(w, resp)
				return
			}
		}
	} else {
		errs = validate.Var(output["password_hash"], "omitempty,min=8")
		if errs != nil {
			resp := u.Error("Valid Password is Required")
			u.RespondJson(w, resp)
			return
		}

		if output["is_cashier"] != nil && output["is_cashier"] != "" && output["is_cashier"] != false {
			errs = validate.Var(output["cashier_pwd_hash"], "omitempty,min=8")
			if errs != nil {
				resp := u.Error("Valid Cashier Password is Required")
				u.RespondJson(w, resp)
				return
			}
		}
	}

	// Encryptiong Passwords
	params := &u.Params{
		Memory:      16,
		Iterations:  2,
		Parallelism: 1,
		SaltLength:  16,
		KeyLength:   16,
	}

	if output["password_hash"] != nil && output["password_hash"] != "" {
		encodedHash, err := u.GenerateFromPassword(output["password_hash"].(string), params)
		if err != nil {
			fmt.Println(err.Error())
			resp := u.Error("Password encryption failed")
			u.RespondJson(w, resp)
			return
		}
		output["password_hash"] = encodedHash
	}
	if output["cashier_pwd_hash"] != nil && output["cashier_pwd_hash"] != "" {
		encodedHash, err := u.GenerateFromPassword(output["cashier_pwd_hash"].(string), params)
		if err != nil {
			fmt.Println(err.Error())
			resp := u.Error("Cashier Password encryption failed")
			u.RespondJson(w, resp)
			return
		}
		output["cashier_pwd_hash"] = encodedHash
	}
	// Encrypting Passwords

	jsonb, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Parsing Failed")
		u.RespondJson(w, resp)
		return
	}
	fmt.Println("Debug JSON:", string(jsonb))
	data := make(map[string]interface{})

	_, err = db.Exec(ctx, "call user_save($1)", string(jsonb[:]))
	if err != nil {

		if strings.Contains(err.Error(), "duplicate") {
			resp := u.Error("A user with the same login id already exists!")
			u.RespondJson(w, resp)
			return
		}

		fmt.Println(err.Error())
		resp := u.Error("Failed Saving User")
		u.RespondJson(w, resp)
		return
	} else {
		id := "id"
		err := db.QueryRow(ctx, "Select last_gen_code From gen_codes Where gen_ref= 'MUSR';").Scan(&id)
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

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	msg := "Deleted User"
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
	_, err = db.Exec(ctx, "call user_delete($1)", string(jsonb[:]))
	if err != nil {
		fmt.Println(err.Error())
		resp := u.Error("Failed Deleting User")
		u.RespondJson(w, resp)
		return
	}
	resp := u.Message(true, msg)
	u.RespondJson(w, resp)
}

func RetrievebyIdUser(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	id := chi.URLParam(r, "id")
	if id == "" {
		resp := u.Error("User ID missing")
		u.RespondJson(w, resp)
		return
	}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from user_get() where user_code =$1) t;", id).Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved User", result)
	u.RespondJson(w, resp)
}

func RetrieveUserList(w http.ResponseWriter, r *http.Request) {
	result := map[string]interface{}{}
	var outputStr string
	var output []interface{}
	err := db.QueryRow(ctx, "SELECT json_agg(t) as result from (SELECT * from user_get()) t;").Scan(&outputStr)
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
	resp := u.PayloadWithMessage(true, "Successfully Retrieved Users", result)
	u.RespondJson(w, resp)
}
