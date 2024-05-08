import type { NextApiRequest, NextApiResponse } from 'next';
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

export async function main(  req: NextApiRequest,res: NextApiResponse,) {

    if(req.body.action=="create"){
        try{

        }catch(e){
            console.error(e)
        }

    }
    await prisma.$disconnect();
    
}

// main().then(async()=>{
   
// }).catch(async (e)=>{
//     console.error(e)
//     await prisma.$disconnect();
//     process.exit(1)
// })