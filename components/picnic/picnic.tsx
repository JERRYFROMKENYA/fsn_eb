"use client"
import React, {useEffect} from "react";
import {Card, CardFooter, Image, Button,Link} from "@nextui-org/react";
import picnic from "@/assets/niskize match day.jpg"
import { siteConfig } from "@/config/site";
import AOS from "aos";

export default function Picnic() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div style={{
            display:"flex",
            alignItems:"center",
            justifyItems:"center",
            justifyContent:"center",
        }}>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none m-2.5"
                data-aos="fade-down"

            >
                <Image
                    alt="Picnic Poster"
                    className="object-cover object-center"
                    height={"100%"}
                    src={picnic.src}
                    width={"100%"}
                />
              <CardFooter className="justify-between bg-blue-200 before:bg-pink-600/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-medium text-blue/80">Available Today.</p>
                    <Button as={Link} href={siteConfig.links.sponsor}
                            className="text-tiny text-white bg-blue"
                            variant="shadow"
                            color="secondary" radius="lg" size="sm">
                        Buy Ticket
                    </Button>
                </CardFooter>
            </Card>
        </div>

    );
}

