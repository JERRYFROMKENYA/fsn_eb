import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export  async function POST(req: Request, res: Response) {
    const pointData= await req.json()
    if(pointData.action=="create"){
        try {
            console.log(pointData)
    
            const point = await prisma.point.create({
                data: {
                    points_earned: parseInt(pointData.points_earned),
                    reason: pointData.reason,
                    user_id: pointData.user_id,
                    given_by: pointData.given_by
                }
            });
    
            console.log("Point Awarded:", point);
            return new Response('Point Created', {
                status: 200,})
        } catch (error) {
            console.error("Error creating point:", error);
            return new Response('An error occurred while creating the point', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }
    }else if(pointData.action=="count_for_one"){
        try {
            console.log(pointData)
    
            const point=await prisma.point.aggregate({
                where: {
                    user_id: pointData.user_id
                },
                _sum: {
                    points_earned: true 
                }
            });
            const totalPoints = point._sum?.points_earned ?? 0;
    
            console.log("Points accumulated :", totalPoints);
            return new Response(JSON.stringify({total_points:totalPoints}), {
                status: 200,})
        } catch (error) {
            console.error("Error reading total points:", error);
            return new Response('An error occurred while calculating the totals', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }
    }else if(pointData.action=="point_history_for_one"){
        try {
            console.log(pointData)
    
            const point=await prisma.point.findMany({
                where:{
                    user_id: pointData.user_id
                }
            })
            // const totalPoints = point._sum?.points_earned ?? 0;
    
            console.log("Point History", point);
            return new Response(JSON.stringify({point}), {
                status: 200,})
        } catch (error) {
            console.error("Error reading point history:", error);
            return new Response('An error occurred while obtaining point history', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }
    }
    //for groups
    else if(pointData.action=="count_for_group"){
        try {
            // Find the buddy group by its ID
            const buddyGroup = await prisma.buddyGroup.findUnique({
                where: {
                    uid: pointData.buddyGroupId // Replace buddyGroupId with the actual ID of the buddy group
                },
                include: {
                    members: true // Include all members of the buddy group
                }
            });
        
            if (!buddyGroup) {
                throw new Error("Buddy group not found");
            }
        
            // Calculate total points earned by the group
            let totalPoints = 0;
            for (const member of buddyGroup.members) {
                const memberPoints = await prisma.point.aggregate({
                    where: {
                        user_id: member.uid
                    },
                    _sum: {
                        points_earned: true
                    }
                });
                totalPoints += memberPoints._sum?.points_earned || 0;
            }
            return new Response(JSON.stringify({groupPoints:totalPoints}), {
                status: 200,})
        } catch (error) {
            console.error("Error displaying point history:", error);
            return new Response('An error occurred while displaying point history', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }
    }else if(pointData.action=="create_for_group"){
try{
        const buddyGroup = await prisma.buddyGroup.findUnique({
            where: {
                uid: pointData.buddyGroupId // Replace buddyGroupId with the actual ID of the buddy group
            },
            include: {
                members: true // Include all members of the buddy group
            }
        });
        if (!buddyGroup) {
            throw new Error("Buddy group not found");
        }
        let totalPoints = 0;
        const pointsPerMember = totalPoints / buddyGroup.members.length;
    for (const member of buddyGroup.members) {
        // Update each member's points
        await prisma.point.create({
            data: {
                points_earned: pointsPerMember,
                reason: "Points distribution for buddy group",
                given_at: new Date(),
                given_to: {
                    connect: {
                        uid: member.uid
                    }
                },
                given_by: pointData.given_by // You may specify who gave the points
            }
        });
    }

    console.log("Points distributed successfully");
    return new Response("Points distributed successfully", {
        status: 200,})
    
    // Now points are collectively assigned and subtracted for each member
 } catch (error) {
    console.error("Error distributing points:", error);
    return new Response('An error occurred while distributing points', {
        status: 500,})
} finally {
    await prisma.$disconnect();
}
    }
    //end for groups
    else if(pointData.action=="delete"){
        try {
            console.log(pointData)
    
            const point=await prisma.point.delete({
               where:{
                uid: pointData.uid
               }
            })
            // const totalPoints = point._sum?.points_earned ?? 0;
    
            console.log("Deleted this point", point);
            return new Response("Delete points", {
                status: 200,})
        } catch (error) {
            console.error("Error deleting point history:", error);
            return new Response('An error occurred while deleting point history', {
                status: 500,})
        } finally {
            await prisma.$disconnect();
        }
    }



}