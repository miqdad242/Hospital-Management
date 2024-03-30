package controllers

import (
	"context"
	"fmt"
	"net/url"
	"os"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/joho/godotenv"
)

var ctx context.Context
var LogFile *os.File
var db *pgxpool.Pool

func init() {
	e := godotenv.Load()
	if e != nil {
		fmt.Print(e)
	}
	query := url.Values{}
	query.Add("database", os.Getenv("database_name"))
	dns := &url.URL{
		Scheme:   "postgresql",
		User:     url.UserPassword(os.Getenv("database_user"), os.Getenv("database_password")),
		Host:     fmt.Sprintf("%s:%s", os.Getenv("database_ip"), os.Getenv("database_port")),
		RawQuery: query.Encode(),
	}
	postgresconfig := dns.String()
	ctx = context.Background()
	var err error
	db, err = pgxpool.Connect(context.Background(), postgresconfig)
	if err != nil {
		print(err.Error())
	}
	err = db.Ping(ctx)
	if err != nil {
		print(err.Error())
	}
	LogFile, err = os.OpenFile("logs.txt", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
	if err != nil {
		panic(err)
	}
	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	db.Config().MaxConns = 1

	// SetMaxOpenConns sets the maximum number of open connections to the database.
	db.Config().MinConns = 1

	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	db.Config().MaxConnLifetime = 120
}
