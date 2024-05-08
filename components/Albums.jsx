import {Card, CardBody} from "@nextui-org/react";
import {subtitle, title} from "@/components/primitives";

import React from "react";
// import {Gallery} from "react-grid-gallery"
import dynamic from 'next/dynamic'
// @ts-ignore
const GalleryComponent = dynamic(()=>import("./GalleryComponent"),{ssr:false})
import {getData} from "@/components/PhotoFetch";

export const Albums = async () => {
    const Images = await getData()
    console.log(Images)
    const images = Images.map((src, index) => ({
        src,
        width: "100%", // Assuming a default width for all images
        height: "100%", // Assuming a default height for all images
        isSelected: false,
        caption:"You are seen ❤️"// Assuming none of the images are initially selected

    }));

    return (
        <>
            <div

            >

                    <h2 className={subtitle()}>FSN Picnic March 2024</h2>
                    <GalleryComponent images={images}/>

            </div>
        </>
    );
};

