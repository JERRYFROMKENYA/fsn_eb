/*
  Warnings:

  - Added the required column `is_main` to the `CampaignPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CampaignPhoto" ADD COLUMN     "is_main" BOOLEAN NOT NULL;
