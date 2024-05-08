"use client"
import React, {useEffect, useState} from 'react';
// import { Slide } from 'react-slideshow-image';
import './slideshow.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/fbConfigSetter";

import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import dynamic from 'next/dynamic';

import CircularProgress from "@mui/material/CircularProgress";
import {Avatar, CardActions, CardHeader, CardMedia, Chip, Collapse, IconButton} from "@mui/material";
import {red} from "@mui/material/colors";

// import ReactQuill from "react-quill";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Spotify from "../UI/Spotify/Spotify";
import {ExpandMore} from "@mui/icons-material";
import {title} from "@/components/primitives"
import {Card as UICard, CardBody} from "@nextui-org/react";

const ReactQuill = dynamic(() => import("react-quill"), {loading: () => <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "var(--old-pink)",
                }}
            >
                <CircularProgress variant="indeterminate"/>
                <p style={{color: "#ffff", fontSize: "4vh", marginLeft: "8px"}}>
                    Loading ... ☺️
                </p>
            </div>
        </>,
    ssr: false
    }
);


const Stories = () => {
    const [nowPlaying, setNowPlaying] = useState({})
    const [expanded, setExpanded] = useState(false);
    const [slideImages, setSlideImages] = useState([]);
    const [loading, setLoading] = useState(true)
    const [nowShowing, setNowShowing] = useState(0)
    const [open, setOpen] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const readRecord = async (colName) => {
        try {
            const q = query(collection(db, colName), where("approved", "==", false));
            var newdata = []
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                newdata.push({id: doc.id, ...doc.data()})
            });
            return newdata

        } catch (e) {
        }


    }

    function fet() {
        readRecord('stories').then(r => {
            setSlideImages(r)
            setLoading(false)
        })

    }

    useEffect(() => {
        fet()

    }, []);

    return (
        loading ? (<UICard
                    isBlurred
                    className="border-none bg-background/60 light:bg-default-100/50 max-w-[80vw] m-8"
                    shadow="sm"
                >
                    <CardBody>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "var(--old-pink)",
                            }}
                        >
                            <CircularProgress variant="indeterminate"/>
                            <p style={{color: "#ffff", fontSize: "4vh", marginLeft: "8px"}}>
                                Loading ... ☺️
                            </p>
                        </div>
                    </CardBody>
                </UICard>
            ) :
            <UICard
                isBlurred
                className="border-none bg-background/60 light:bg-default-100/50 max-w-[80vw] m-8"
                shadow="sm"
            >
                <CardBody>
                    <section style={{
                        padding: "10%",
                    }} id={'current-campaign'}>
                        <h1 className={title({color: "violet"})} style={{
                            fontSize: "18pt",
                            fontWeight: "unset",
                            marginBottom: "5%"
                        }}>Our Stories</h1>
                        <div className="" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "10px",
                            maxHeight: "300px",
                            overflow: "auto"
                        }}>
                            {/*<Slide>*/}
                            {slideImages.map((slideImage, index) => (
                                <div key={index} onClick={() => {
                                    setNowShowing(index)
                                    setOpen(true)
                                    console.log(nowShowing)
                                }}>

                                    <Card component="li" sx={{maxWidth: 300, flexGrow: 1}}>
                                        <CardCover>
                                            <img
                                                src={slideImage.userPicPath}
                                                loading="lazy"
                                                alt=""

                                            />
                                        </CardCover>
                                        <CardContent>
                                            <Typography
                                                level="body-lg"
                                                fontWeight="lg"
                                                textColor="var(--cop-pink)"
                                                mt={{xs: 12, sm: 18}}
                                                style={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                    padding: '8px',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                {slideImage.name}
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </div>

                            ))}
                            {/*</Slide>*/}
                        </div>
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={open}
                            onClose={() => setOpen(false)}
                            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            <Card sx={{maxWidth: "80vw", maxHeight: "80vh"}} style={{background: "whitesmoke"}}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{bgcolor: red[500]}} aria-label="..."
                                                src={slideImages[nowShowing].userPicPath}>

                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">


                                            <Button variant={"text"} style={{color: "red", fontSize: "15px"}}
                                                    onClick={() => {
                                                        setOpen(false)
                                                        setExpanded(false)
                                                        setNowPlaying("")
                                                        setNowShowing(0)
                                                    }}>Dismiss</Button>

                                        </IconButton>
                                    }
                                    title={slideImages[nowShowing].name}
                                    subheader={"On Our Anniversary Said"}
                                />
                                {
                                    (slideImages[nowShowing].letterPath) ? <CardMedia component="img"
                                                                                      height="194"
                                                                                      image={slideImages[nowShowing].letterPath}
                                                                                      alt="Letter"
                                        />
                                        :
                                        ""


                                }

                                <CardContent>
                                    {
                                        (slideImages[nowShowing].letter.trim() === "" || slideImages[nowShowing].letter === undefined) ?
                                            (<div className="" style={{
                                                maxHeight: "30vh",
                                                overflow: "auto"
                                            }}>
                                                <ReactQuill
                                                    style={{fontSize: "13px"}}
                                                    value={"<p>You are not alone, you are loved, you are seen, you are heard...</p>"}
                                                    readOnly={true}
                                                    theme={"bubble"}
                                                />
                                            </div>) :
                                            <Typography variant="body2" color="text.secondary">
                                                <div className="" style={{
                                                    maxHeight: "30vh",
                                                    overflow: "auto"
                                                }}>
                                                    <ReactQuill
                                                        style={{fontSize: "13px"}}
                                                        value={slideImages[nowShowing].letter}
                                                        readOnly={true}
                                                        theme={"bubble"}
                                                    />
                                                </div>

                                            </Typography>


                                    }

                                </CardContent>
                                <CardActions style={{display: "block"}} disableSpacing>
                                    {<p>Tap to play</p>}
                                    {
                                        (!slideImages[nowShowing].music) ? "" : (slideImages[nowShowing].music.map((music, i) => {
                                            var m = music
                                            return (<div key={i} className="musicItem" style={{marginTop: "3px"}}>
                                                <Chip color="success"
                                                      label={music.name + " by " + music.artist}
                                                      onClick={(music) => {
                                                          handleExpandClick()
                                                          setNowPlaying(m)
                                                          console.log(nowPlaying.type, nowPlaying.url)
                                                      }}
                                                      avatar={<Avatar src={music.image}/>}/>
                                            </div>)
                                        }))
                                    }


                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon/>
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        {

                                            (!nowPlaying.type) ? "" :
                                                <Spotify type={nowPlaying.type} id={nowPlaying.url}/>
                                        }
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Modal>
                    </section>
                </CardBody>
            </UICard>


    )
}


export default Stories