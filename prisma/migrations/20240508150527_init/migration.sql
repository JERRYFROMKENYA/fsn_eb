-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,
    "profession" TEXT,
    "university" TEXT,
    "degree" TEXT,
    "interests" TEXT[],
    "is_team" BOOLEAN NOT NULL,
    "photo_url" TEXT,
    "group_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "BuddyGroup" (
    "uid" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "BuddyGroup_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "uid" TEXT NOT NULL,
    "campaign_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "creator_id" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Event" (
    "uid" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "campaign_id" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CampaignPhoto" (
    "uid" TEXT NOT NULL,
    "caption" TEXT,
    "url" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,

    CONSTRAINT "CampaignPhoto_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Point" (
    "uid" TEXT NOT NULL,
    "points_earned" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "given_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "giver_id" TEXT NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "BuddyGroup"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignPhoto" ADD CONSTRAINT "CampaignPhoto_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_giver_id_fkey" FOREIGN KEY ("giver_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
