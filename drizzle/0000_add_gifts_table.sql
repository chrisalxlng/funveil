CREATE TABLE "gifts" (
	"gift_id" uuid PRIMARY KEY NOT NULL,
	"owner_user_id" text NOT NULL,
	"owner_user_name" text NOT NULL,
	"recipient" text NOT NULL,
	"title" text NOT NULL,
	"file_id" text NOT NULL,
	"released_at" timestamp with time zone NOT NULL,
	"opened_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
