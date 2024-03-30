package main

import (
	"backend/router"
	"context"
	"strings"

	// "database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"

	// "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	kitlog "github.com/go-kit/log"
	_ "github.com/lib/pq"
	"github.com/philippseith/signalr"
	signalr_router "github.com/philippseith/signalr/router"
	// _todosResource "backend/router"
	// "github.com/volatiletech/null/v8"
	// "github.com/joho/godotenv"
)

type AppHub struct {
	signalr.Hub
}

func (h *AppHub) Echo(message string) {
	h.Clients().Caller().Send("TargetMesssage", message)
}

func (h *AppHub) OnConnected(connectionID string) {
	fmt.Printf("%s connected\n", connectionID)
}

func (h *AppHub) OnDisconnected(connectionID string) {
	fmt.Printf("%s disconnected\n", connectionID)
}

func runHTTPServer() {
	address := "localhost:" + os.Getenv("app_port")
	r := chi.NewRouter()
	r.Use(middleware.AllowContentType("application/json", "text/xml", "application/x-www-form-urlencoded", "multipart/form-data"))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   strings.Split(os.Getenv("consumer_origin"), ","),
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Use(middleware.RequestID)
	r.Use(middleware.Heartbeat("/ping"))
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	//r.Use(middleware.URLFormat)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	r.Use(middleware.Timeout(60 * time.Second))

	// create an instance of your hub
	hub := AppHub{}

	// build a signalr.Server using your hub
	// and any server options you may need
	server, _ := signalr.NewServer(context.TODO(),
		signalr.KeepAliveInterval(time.Second*2),
		signalr.AllowOriginPatterns([]string{"http://localhost:8082"}), //strings.Split(os.Getenv("consumer_origin"), ",")),
		signalr.SimpleHubFactory(&hub),
		signalr.Logger(kitlog.NewLogfmtLogger(os.Stderr), true),
	)

	// ask the signalr server to map it's server
	// api routes to your custom baseurl
	// type todosResource struct{}
	mapR := signalr_router.WithChiRouter(r)
	server.MapHTTP(mapR, "/signalr")

	// r.Mount("/todos", todosResource{}.Routes())
	r.Handle("/uploads/*", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))
	router.SetupRoutes(r)
	fmt.Printf("Listening for websocket connections on http://%s\n", address)
	if err := http.ListenAndServe(address, r); err != nil {
		log.Fatal("ListenAndServe:", err)
	}

	// http.ListenAndServe(":"+os.Getenv("webapp_port"), r)

}

func main() {
	// databaseConnectionInit()
	runHTTPServer()
}
