/*
  Warnings:

  - Added the required column `given_by` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "given_by" TEXT NOT NULL;
