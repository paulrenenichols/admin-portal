CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" varchar(256),
	"company" varchar(256),
	"phone" varchar(10)
);
