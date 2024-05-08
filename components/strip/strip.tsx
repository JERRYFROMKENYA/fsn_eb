"use client"
import  './strip.css'
import strip from '../../assets/print-strip.svg'
import {Image} from "@nextui-org/image"


const Strip = () => {
    return (
        <>
            <div className={'StripClass'}>
        <Image isBlurred src={strip.src} alt="Seperator Strip"/>

        </div></>
)
}

export default Strip