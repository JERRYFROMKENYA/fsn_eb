"use client"
import {InstagramEmbed, TikTokEmbed, XEmbed} from "react-social-media-embed";
import {Card, CardBody} from "@nextui-org/react";
import {title} from "@/components/primitives";
import React, {useEffect} from "react";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import AOS from "aos";
import ConatctUs from "@/components/contactus/ContactUs";

export const Socials = () => {
    const InstagramLink:string="https://www.instagram.com/p/C6k5IF3io0t/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    const TikTokLink:string="https://www.tiktok.com/@fanciedstorynetwork/video/7209886314169126150?is_from_webapp=1&sender_device=pc&web_id=7356211792701736453"
    const TwitterLink:string="https://x.com/Fanciedstory/status/1765386642896900505"
    const PicnicLink:string="https://x.com/Fanciedstory/status/1765386642896900505"
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <>
            <Card
                isBlurred
                className="border-none bg-background/60 light:bg-default-100/50 max-w-[100vw] m-8"
                shadow="sm"
                data-aos="fade-down"
            >
                <div className={"flex-1 content-center items-center justify-center m-8"}>
                    {/*<PeopleOutline className={title()} color="var(--color-white)" size={30}/>*/}
                    <h2 className={title()}> Social Wall</h2>
                </div>
                <CardBody>
                    <div style={{display: 'flex', flexWrap: "wrap", justifyContent: 'center'}}>


                        <div style={{display: 'flex', flexWrap: "wrap", justifyContent: 'center'}}>
                            <InstagramEmbed url={InstagramLink} width={328} captioned/>
                            <TikTokEmbed url={TikTokLink} width={325}/>

                        </div>

                        <br/>
                        <XEmbed url={TwitterLink} width={325} />
                    </div>

                        <Code>  New Gallery Coming Soon</Code>





                </CardBody>
            </Card>

        </>
    );
};
