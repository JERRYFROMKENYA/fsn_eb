"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { InstagramIcon } from "@/components/icons";
import { useTheme } from 'next-themes'
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {delay} from "framer-motion";
import {BsMouse} from "react-icons/bs";

export const Hero = () => {
    const { theme} = useTheme()
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" data-aos="fade-right">
                <div className="inline-block max-w-lg text-center justify-center" data-aos="fade-right">
                    <h1 className={title()}>You are&nbsp;</h1>
                    <h1 className={title({color: (theme === "light") ? "blue":"pink"})}>not alone&nbsp;</h1>
                    <br/>
                    <h1 className={title()}>You are&nbsp;</h1>
                    <h1 className={title({color: (theme === "light") ? "blue":"pink"})}>seen&nbsp;</h1>
                    <br/>
                    <h1 className={title()}>You are&nbsp;</h1>
                    <h1 className={title({color: (theme === "light") ? "blue":"pink"})}>loved&nbsp;</h1>
                    <br/>
                    <h1 className={title()}>You are&nbsp;</h1>
                    <h1 className={title({color: (theme === "light") ? "blue":"pink"})}>heard&nbsp;</h1>
                    <br/>
                </div>

                <div className="flex gap-3">
                    <Link
                        isExternal
                        href={siteConfig.links.linktoJoin}
                        className={buttonStyles({color: "primary", radius: "full", variant: "shadow"})}
                    >
                     Join Us
                    </Link>
                    <Link
                        isExternal
                        className={buttonStyles({variant: "bordered", radius: "full"})}
                        href={siteConfig.links.instagram}
                    >
                        <InstagramIcon size={15}/>
                    Learn More
                    </Link>
                </div>

                <div className="mt-8">

                        <div className="floating-icon">
                        <a href="#LearnMore">
                        <BsMouse color="#fff" size={25} className="mouse"/>
                        </a>
                        </div>

                </div>
            </section>
        </>
    );
};
