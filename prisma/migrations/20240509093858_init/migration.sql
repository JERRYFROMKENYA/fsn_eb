/*
  Warnings:

  - You are about to drop the column `giver_id` on the `Point` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_giver_id_fkey";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "giver_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
