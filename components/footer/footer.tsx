"use client"
import "./Footer.css";
import logo from"../../assets/logo.png";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaFax,
    FaEnvelope,
    FaGlobe,
} from "react-icons/fa";
import Link from 'next/link'
import {Image} from "@nextui-org/react"
import {DarkLogo, Logo} from "@/components/icons";
import { useTheme } from 'next-themes'
export const Footer = () => {
    const { theme} = useTheme()
    return (
        <section id="footer">
            <div className="container footer">
                <div className="footer-box">
                    <h4>Useful Links</h4>
                    <div className="footer-links">
                        <Link href="/campaign/Uploads">&bull; Write A letter To your Younger Self</Link>
                        <Link href="/anniversary/story">&bull; Write your Fancied Story</Link>
                        {/*<a href="#">&bull; About</a>*/}
                        {/*<a href="#">&bull; Learn</a>*/}
                        {/*<a href="#">&bull; Hosting</a>*/}
                        {/*<a href="#">&bull; Messenger</a>*/}
                        {/*<p>Coming Soon...</p>*/}
                    </div>
                </div>
                <div className="footer-box">
                    <h4>Support</h4>
                    <div className="footer-links">
                        <a href="https://families.fanciedstory.network">&bull; Fancied Families</a>
                        <a href="#">&bull; About</a>
                        <a href="#">&bull; Fancied Gallery</a>
                    </div>
                </div>
                <div className="footer-box">
                    <h4>Contact Us</h4>
                    <div className="footer-contact u-text-small">
                        <p>
                            <FaMapMarkerAlt /> &nbsp; Nairobi, Kenya.
                        </p>
                        {/*<p>*/}
                        {/*  <FaPhoneAlt /> &nbsp; Phone: +254 ...*/}
                        {/*</p>*/}
                        <p>
                            <FaEnvelope /> &nbsp; Email: fanciedstory1@gmail.com
                        </p>
                        <p>
                            <FaGlobe /> &nbsp; <a style={{fontSize: "inherit" ,textDecoration:"none"}}
                                                  href="https://fanciedstory.network">fanciedstory.network</a>
                        </p>
                    </div>
                </div>

                <div className="footer-box">
                    {theme=="dark"?<DarkLogo/>:<Logo/>}
                    <p className="u-text-small">&copy; Copyright {new Date(Date()).getFullYear()}. Fancied Story Network </p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
