import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export  async function POST(req: Request, res: Response) {
    const groupData= await req.json()
    if(groupData.action=="create"){
        try {
            console.log(groupData)
    
            const group = await prisma.buddyGroup.create({
                data: {
                 group_name:groupData.group_name
                }
            });
    
            console.log("group created:", group);
            return new Response('Group Created', {
                status: 200,})
        } catch (error) {
            console.error("Error creating group:", error);
            return new Response('An error occurred while creating the group', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(groupData.action=="read_one"){
        try {
            console.log(groupData)
    
            const group = await prisma.buddyGroup.findFirst({
               where:{
                uid:groupData.uid
               }
            });
    
            console.log("group read:", group);
            return new Response(JSON.stringify(group), {
                status: 200,})
        } catch (error) {
            console.error("Error reading group:", error);
            return new Response('An error occurred while read the group', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(groupData.action=="read_many"){
        try {
            console.log(groupData)
    
            const group = await prisma.buddyGroup.findMany();
    
            console.log("groups read:", group);
            return new Response(JSON.stringify(group), {
                status: 200,})
        } catch (error) {
            console.error("Error reading group:", error);
            return new Response('An error occurred while updating the group', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(groupData.action=="update"){
        try {
            console.log(groupData)
    
            const group = await prisma.buddyGroup.update({
                where:{
                    uid:groupData.uid
                }, 
                data:groupData.data
            });
    
            console.log("group Updated:", group);
            return new Response('Group Updated', {
                status: 200,})
        } catch (error) {
            console.error("Error updating group:", error);
            return new Response('An error occurred while updating the group', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(groupData.action=="delete"){
        try {
            console.log(groupData)
    
            const group = await prisma.buddyGroup.delete({
                where:{
                    uid:groupData.uid
                }
            });
    
            console.log("group deleted:", group);
            return new Response('Group deleted', {
                status: 200,})
        } catch (error) {
            console.error("Error deleting group:", error);
            return new Response('An error occurred while deleting the group', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }else  if(groupData.action=="search"){
        try {
            console.log(groupData)
    
            const group = await prisma.buddyGroup.findMany({
                where:{
                    group_name: groupData.group_name ? groupData.group_name : undefined,
                }
            });
    
            console.log("group found:", group);
            return new Response(JSON.stringify(group), {
                status: 200,})
        } catch (error) {
            console.error("Error finding group:", error);
            return new Response('An error occurred while finding the group', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }

    }
    
}