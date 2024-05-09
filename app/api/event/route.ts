import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export  async function POST(req: Request, res: Response) {
    const eventData= await req.json()
    if(eventData.action=="create"){
        try {
            console.log(eventData)
    
            const event = await prisma.event.create({
                data: {
                    event_name: eventData.event_name,
                    start_date: new Date(eventData.start_date),
                    end_date: new Date(eventData.end_date),
                    campaign_id: eventData.campaign_id
                }
            });
    
            console.log("Event created:", event);
            return new Response('Campaign Created', {
                status: 200,})
        } catch (error) {
            console.error("Error creating event:", error);
            return new Response('An error occurred while creating the event', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    } else if(eventData.action=="read_one"){
        try {
            console.log(eventData)
    
            const event = await prisma.event.findFirst({
               where:{
                uid: eventData.uid
               }
            });
    
            console.log("Event found:", event);
            return new Response(JSON.stringify(event), {
                status: 200,})
        } catch (error) {
            console.error("Error finding event:", error);
            return new Response('An error occurred while finding the event', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(eventData.action=="read_many"){
        try {
            console.log(eventData)
    
            const event = await prisma.event.findMany();
    
            console.log("Event found:", event);
            return new Response(JSON.stringify(event), {
                status: 200,})
        } catch (error) {
            console.error("Error finding event:", error);
            return new Response('An error occurred while finding the event', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(eventData.action=="update"){
        try {
            console.log(eventData)
    
            const event = await prisma.event.update({
                where:{
                    uid:eventData.uid
                },
                data:eventData.data
            });
    
            console.log("Event Updated:", event);
            return new Response("Event Updated", {
                status: 200,})
        } catch (error) {
            console.error("Error updating event:", error);
            return new Response('An error occurred while updating the event', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else if(eventData.action=="delete"){
        try {
            console.log(eventData)
    
            const event = await prisma.event.delete({
                where:{
                    uid:eventData.uid
                }
            });
    
            console.log("Event Deleted:", event);
            return new Response("Event Deleted", {
                status: 200,})
        } catch (error) {
            console.error("Error deleting event:", error);
            return new Response('An error occurred while deleting the event', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }
    else if(eventData.action=="search"){
        try {
            console.log(eventData)
    
            const event = await prisma.event.findMany({
                where:{
                    event_name: eventData.event_name?eventData.event_name:undefined,
                    start_date: eventData.start_date?new Date(eventData.start_date):undefined,
                    end_date: eventData.end_date?new Date(eventData.end_date):undefined,
                    campaign_id: eventData.campaign_id?eventData.campaign_id:undefined
                }
            });
    
            console.log("Event Found:", event);
            return new Response("Event Found", {
                status: 200,})
        } catch (error) {
            console.error("Error finding event:", error);
            return new Response('An error occurred while finding the event', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }
}