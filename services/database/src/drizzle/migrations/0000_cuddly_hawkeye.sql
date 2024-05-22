CREATE TABLE IF NOT EXISTS "customer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" varchar(256),
	"company_name" varchar(256),
	"phone_number" varchar(10)
);
