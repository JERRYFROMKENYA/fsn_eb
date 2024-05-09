/*
  Warnings:

  - Added the required column `creator_id` to the `CampaignPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CampaignPhoto" ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CampaignPhoto" ADD CONSTRAINT "CampaignPhoto_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
