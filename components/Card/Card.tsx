import "./card.css";
import Header from "@/assets/HeaderHero.png"
import {Image} from "@nextui-org/react";

export default function Card (CardProps:{first_name?: string, message?: string, image?: string|null}){
    return(
        <div className="birthdayCard">
            <div className="cardFront">
                <h3 className="happy">HAPPY BIRTHDAY {CardProps.first_name|| "LOVE"}!</h3>
                <div className="balloons" >
                    <div className="balloonOne"/>
                    <div className="balloonTwo"/>
                    <div className="balloonThree"/>
                    <div className="balloonFour"/>

                </div>
                <Image src={CardProps.image||Header.src} alt="Header" />
            </div>
            <div className="cardInside">
                <h3 className="back">HAPPY BIRTHDAY  {CardProps.first_name?.toUpperCase()|| "LOVE"}!</h3>
                <p>Dear  {CardProps.first_name|| "LOVE"},</p>
                <p>
                    Happy birthday!! I hope your day is filled with lots of love and
                    laughter! May all of your birthday wishes come true.
                </p>
                <p className="name">All your Friends at Fancied Story Network...</p>
            </div>
        </div>
    )
};