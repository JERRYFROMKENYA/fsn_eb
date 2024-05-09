import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export  async function POST(req: Request, res: Response) {
    const campaignData= await req.json()

    if(campaignData.action=="create"){
        try {
            console.log(campaignData)
    
            const campaign = await prisma.campaign.create({
                data: {
                    campaign_name: campaignData.campaign_name,
                    start_date: new Date(campaignData.start_date),
                    end_date: new Date(campaignData.end_date),
                    creator_id: campaignData.creator_id
                }
            });
    
            console.log("User created:", campaign);
            return new Response('Campaign Created', {
                status: 200,})
        } catch (error) {
            console.error("Error creating campaign:", error);
            return new Response('An error occurred while creating the campaign', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(campaignData.action=="read_one"){
        try {
            console.log(campaignData)
    
            const campaign = await prisma.campaign.findFirst({
               where:{
                uid: campaignData.uid
               }
            });
    
            console.log("Campaign read:", campaign);
            return new Response(JSON.stringify(campaign), {
                status: 200,})
        } catch (error) {
            console.error("Error reading campaign:", error);
            return new Response('An error occurred while reading the campaign', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(campaignData.action=="read_many"){
        try {
            console.log(campaignData)
    
            const campaign = await prisma.campaign.findMany();
    
            console.log("Campaign read:", campaign);
            return new Response(JSON.stringify(campaign), {
                status: 200,})
        } catch (error) {
            console.error("Error reading campaign:", error);
            return new Response('An error occurred while reading the campaign', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(campaignData.action=="update"){
        try {
            console.log(campaignData)
    
            const campaign = await prisma.campaign.update({
                where:{
                    uid:campaignData.uid
                },
               data:campaignData.data
            });
    
            console.log("Campaign  updated:", campaign);
            return new Response('Campaign Updated', {
                status: 200,})
        } catch (error) {
            console.error("Error updating campaign:", error);
            return new Response('An error occurred while updating the campaign', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(campaignData.action=="delete"){
        try {
            console.log(campaignData)
    
            const campaign = await prisma.campaign.delete({
                where:{
                    uid:campaignData.uid
                }
            });
    
            console.log("Campaign deleted:", campaign);
            return new Response('Campaign deleted', {
                status: 200,})
        } catch (error) {
            console.error("Error deleting campaign:", error);
            return new Response('An error occurred while deleting the campaign', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(campaignData.action=="search"){
        try {
            console.log(campaignData)
    
            const campaign = await prisma.campaign.findMany({
                where:{
                    campaign_name: campaignData.campaign_name? campaignData.campaign_name:undefined,
                    start_date: campaignData.start_date? new Date(campaignData.start_date): undefined,
                    end_date: campaignData.end_date? new Date(campaignData.end_date): undefined,
                    creator_id: campaignData.creator_id? campaignData.creator_id:undefined
                }
            });
    
            console.log("Campaign search:", campaign);
            return new Response(JSON.stringify(campaign), {
                status: 200,})
        } catch (error) {
            console.error("Error finding campaigns:", error);
            return new Response('An error occurred while finding campaigns', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }
}
