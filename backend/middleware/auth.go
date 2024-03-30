package middleware

import (
	"crypto/rand"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/jwtauth"
)

type JWT struct {
	TokenAuth *jwtauth.JWTAuth
}

var Jwt JWT

func init() {
	token := make([]byte, 32)
	rand.Read(token)
	log.Printf("Server Token: %x \n", token)
	Jwt.TokenAuth = jwtauth.New("HS256", token, nil)
}

func EncodeJWT(claims map[string]interface{}) string {
	expiration := (24 * time.Hour)
	claims["exp"] = jwtauth.ExpireIn(expiration)
	_, tokenString, _ := Jwt.TokenAuth.Encode(claims)
	return tokenString
}

func DecodeJWT(tokenClaim string, r *http.Request) interface{} {
	_, claims, _ := jwtauth.FromContext(r.Context())
	claim := claims[tokenClaim]
	return claim
}
