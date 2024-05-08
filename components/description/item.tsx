"use client"
import React from "react";
import "./description.css";

import { BsHexagon } from "react-icons/bs";
import {title} from "@/components/primitives";

interface Props {
    icon: React.ReactNode;
    heading: string;
    text: string;
}

const Item = ({icon,heading,text}:Props) => {
    return (
        <div className="feature">
            <br/>

            <div className="feature-text">
                <h3 className={title()}>{heading}</h3>
                <br/>
                <p className="text">{text}</p>
            </div>
            <br/>
        </div>
    );
};

export default Item;