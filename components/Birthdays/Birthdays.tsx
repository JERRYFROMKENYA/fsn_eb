import { PrismaClient } from "@prisma/client";
import Card from "@/components/Card/Card";
import { title } from "../primitives";

const prisma= new PrismaClient();
export const Birthdays = async () => {
    const prisma = new PrismaClient();
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-based month, so we add 1
    const currentDay = today.getDate();

// Fetch all users and filter them in JavaScript
    const allUsers = await prisma.user.findMany();
    const birthdays = allUsers.filter(user => {
        const birthday = new Date(user.birthday);
        const birthMonth = birthday.getMonth() + 1;
        const birthDay = birthday.getDate();
        return birthMonth === currentMonth && birthDay === currentDay;
    });
    return (
        <div >
            <h1 className={title()}>Birthdays Today</h1>
            <ul style={{display: "flex", flexDirection:"row",padding:"20px", overflowX:"hidden", justifyContent:"center"}}>
                {birthdays.map(user => (
                    <li key={user.uid}>

                        <Card first_name={user.first_name} image={user?.photo_url||null} ></Card>
                    </li>
                ))}
            </ul>

        </div>
    );
};
