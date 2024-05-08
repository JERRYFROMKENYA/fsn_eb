"use client"
import React, {useEffect} from "react";
import {Card, CardBody} from "@nextui-org/react";
import "./description.css"
import {BsFillBookmarkStarFill, BsHexagon} from "react-icons/bs";
import Item from "./item";
import {ItemList} from "@/components/description/ItemList";
import {Image} from "@nextui-org/react"
import ofImportanceNiWewe from "../../assets/ofImportanceNiWewe.png"
import AOS from "aos"
import {title} from "@/components/primitives";


export default function Description() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return <Card
        isBlurred
        className="border-none bg-background/60 light:bg-default-100/50 max-w-[80vw] m-8"
        shadow="sm"
    >
        <CardBody>
            <section id="LearnMore" data-aos="fade-up">
                <div className="container  features">
                    <div className={"flex-1 content-center items-center justify-center m-8"}>
                        <BsFillBookmarkStarFill className={title()} color="var(--color-white)" size={30}/>
                        <h2 className={title()}> Lets tell you more about us...</h2>
                    </div>
                    <br/>
                    <div className="features-content">
                        <div className="features-left" data-aos="fade-right">
                            <Image src={ofImportanceNiWewe.src} alt="Of Importance ni Wewe!"/>
                        </div>
                        <div className="features-right" data-aos="fade-left">
                            {ItemList.map((feature) => <Item
                                    key={feature.id}
                                    icon={feature.icon}
                                    heading={feature.heading}
                                    text={feature.text}
                                />)}
                        </div>
                    </div>
                </div>
            </section>
        </CardBody>
    </Card>;
            }
