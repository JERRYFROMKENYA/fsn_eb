
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";

import React from "react";

function GalleryComponent({ images }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "20px",
            }}>
            {images.map((image, index) => (
                <div
                    key={index}
                >
                    <Link href={image.src}>
                        <Image
                            alt={image.alt}
                            height={image.height}
                            src={image.src}
                            width={image.width}
                        />


                    </Link>



                </div>
            ))}
        </div>
    );
}

export default GalleryComponent;

