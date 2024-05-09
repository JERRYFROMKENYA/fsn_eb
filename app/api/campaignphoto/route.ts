import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export  async function POST(req: Request, res: Response) {
    const campaignPhotoData= await req.json()
    if(campaignPhotoData.action=="create"){
        try {
            console.log(campaignPhotoData)
    
            const campaignphoto = await prisma.campaignPhoto.create({
                data: {
                    caption: campaignPhotoData.caption ? campaignPhotoData.caption: undefined,
                    url: campaignPhotoData.url,
                    is_main: campaignPhotoData.is_main? campaignPhotoData.is_main:false,
                    campaign_id: campaignPhotoData.campaign_id,
                    creator_id: campaignPhotoData.creator_id
                }
            });
    
            console.log("Campaign Photo:", campaignphoto);
            return new Response('Campaign Photo Created', {
                status: 200,})
        } catch (error) {
            console.error("Error creating photo:", error);
            return new Response('An error occurred while creating the photo', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(campaignPhotoData.action=="read_one"){
        try {
            console.log(campaignPhotoData)
    
            const campaignphoto = await prisma.campaignPhoto.findFirst({
              where:{
                uid: campaignPhotoData.uid
                
              }
            });
    
            console.log("Campaign Photo:", campaignphoto);
            return new Response(JSON.stringify(campaignphoto), {
                status: 200,})
        } catch (error) {
            console.error("Error retrieving photo:", error);
            return new Response('An error occurred while retrieving the photo', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(campaignPhotoData.action=="read_many"){
        try {
            console.log(campaignPhotoData)
    
            const campaignphoto = await prisma.campaignPhoto.findMany({
              where:{
                campaign_id:campaignPhotoData.campaign_id?campaignPhotoData.campaign_id:undefined,
                creator_id: campaignPhotoData.creator_id? campaignPhotoData.creator_id:undefined
              }
            });
    
            console.log("Campaign Photo:", campaignphoto);
            return new Response(JSON.stringify(campaignphoto), {
                status: 200,})
        } catch (error) {
            console.error("Error retrieving photo:", error);
            return new Response('An error occurred while retrieving the photo', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(campaignPhotoData.action=="update"){
        try {
            console.log(campaignPhotoData)
    
            const campaignphoto = await prisma.campaignPhoto.update({
                where:{
                    uid: campaignPhotoData.uid
                  }, data:campaignPhotoData.data
            });
    
            console.log("Campaign Photo:", campaignphoto);
            return new Response("Campaign Photo Updated", {
                status: 200,})
        } catch (error) {
            console.error("Error updating photo:", error);
            return new Response('An error occurred while updating the photo', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(campaignPhotoData.action=="delete"){
        try {
            console.log(campaignPhotoData)
    
            const campaignphoto = await prisma.campaignPhoto.delete({
                where:{
                    uid: campaignPhotoData.uid
                  }
            });
    
            console.log("Campaign Photo:", campaignphoto);
            return new Response("Campaign Photo Deleted", {
                status: 200,})
        } catch (error) {
            console.error("Error deleting photo:", error);
            return new Response('An error occurred while deleting the photo', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }
}