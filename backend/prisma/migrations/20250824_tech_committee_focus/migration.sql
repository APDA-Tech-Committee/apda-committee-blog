-- This migration updates the database schema to remove committee-related tables
-- and modify the Post table to add tech-specific fields.

-- Create the tech_team table
CREATE TABLE "tech_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- Add new fields to User table
ALTER TABLE "users" ADD COLUMN "bio" TEXT;
ALTER TABLE "users" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "users" ADD COLUMN "position" TEXT;

-- Add new fields to Post table
ALTER TABLE "posts" ADD COLUMN "projectUrl" TEXT;
ALTER TABLE "posts" ADD COLUMN "githubUrl" TEXT;

-- Remove the committee references from posts
UPDATE "posts" SET "committeeId" = NULL WHERE "committeeId" IS NOT NULL;

-- We keep the committee data for now, but we'll stop using it in the app
-- In a real migration, you would drop these tables, but we're keeping them
-- so you can revert if needed
