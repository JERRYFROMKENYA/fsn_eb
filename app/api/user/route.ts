import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export  async function POST(req: Request, res: Response) {

        const userData = await req.json();
        if(userData.action=="create"){
            try {
                console.log(userData)
           
        
                const user = await prisma.user.create({
                    data: {
                        email: userData.email,
                        first_name: userData.first_name,
                        middle_name: userData.middle_name || null,
                        last_name: userData.last_name,
                        phone_number: userData.phone_number || null,
                        password: userData.password||null,
                        user_name: userData.user_name||null,
                        gender: userData.gender||null,
                        birthday: new Date(userData.birthday),
                        reason: userData.reason || null,
                        profession: userData.profession || null,
                        university: userData.university || null,
                        degree: userData.degree || null,
                        interests: userData.interests || null,
                        is_team: userData.is_team || false,
                        photo_url: userData.photo_url || null,
                    }
                });
        
                console.log("User created:", user);
                return new Response('User Created', {
                    status: 200,})
            } catch (error) {
                console.error("Error creating user:", error);
                return new Response('An error occurred while creating the user', {
                    status: 500,})
            } finally {
                await prisma.$disconnect();
            }

        }else if(userData.action=="read_one"){
            try {
                console.log(userData)
                
                const user = await prisma.user.findFirst({where:{
                    uid:userData.uid
                }})
        
               
                return new Response(JSON.stringify(user), {
                    status: 200,})
            } catch (error) {
                console.error("Error Obtaining User:", error);
                return new Response('An error occurred while getting the user', {
                    status: 500,})
            } finally {
                await prisma.$disconnect();
            }
            
        }else if(userData.action=="read_many"){
            try {
                console.log(userData)
                
                const user = await prisma.user.findMany()
        
               
                return new Response(JSON.stringify(user), {
                    status: 200,})
            } catch (error) {
                console.error("Error Obtaining Users:", error);
                return new Response('An error occurred while getting the user', {
                    status: 500,})
            } finally {
                await prisma.$disconnect();
            }
            
        }
        else if(userData.action=="update"){
            try {
                console.log(userData)
                
                const user = await prisma.user.update({where:{
                    uid:userData.uid,
                    
                },
            data:userData.data})
        
               
                return new Response("user updated successfully", {
                    status: 200,})
            } catch (error) {
                console.error("Error Updating User:", error);
                return new Response('An error occurred while getting the user', {
                    status: 500,})
            } finally {
                await prisma.$disconnect();
            }
            
        }
        else if(userData.action=="delete"){
            try {
                console.log(userData)
                
                const user = await prisma.user.delete({
                    where:{
                        uid:userData.uid
                    }
                })
        
               
                return new Response("User deleted successfully", {
                    status: 200,})
            } catch (error) {
                console.error("Error Deleting User:", error);
                return new Response('An error occurred while deleting the user', {
                    status: 500,})
            } finally {
                await prisma.$disconnect();
            }
            
        }
        else if(userData.action=="search"){
            try {
                console.log(userData)
                
                const user = await prisma.user.findMany({
                    where: {
                        email: userData.email ? userData.email : undefined,
                        first_name: userData.first_name ? userData.first_name : undefined,
                        middle_name: userData.middle_name ? userData.middle_name : undefined,
                        last_name: userData.last_name ? userData.last_name : undefined,
                        phone_number: userData.phone_number ? userData.phone_number : undefined,
                        user_name: userData.user_name ? userData.user_name : undefined,
                        gender: userData.gender ? userData.gender : undefined,
                        birthday: userData.birthday ? new Date(userData.birthday) : undefined,
                        reason: userData.reason ? userData.reason : undefined,
                        profession: userData.profession ? userData.profession : undefined,
                        university: userData.university ? userData.university : undefined,
                        degree: userData.degree ? userData.degree : undefined,
                        interests: userData.interests ? userData.interests : undefined,
                        is_team: userData.is_team ? userData.is_team : undefined,
                    }
                });
        
               
                return new Response(JSON.stringify(user), {
                    status: 200,})
            } catch (error) {
                console.error("Error Obtaining Users:", error);
                return new Response('An error occurred while getting the user', {
                    status: 500,})
            } finally {
                await prisma.$disconnect();
            }
            
        }
       
        
}




