"use client"
import React, {useRef, useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import * as emailjs from "@emailjs/browser";
import {ChatBubble} from "@mui/icons-material";
import {title} from "@/components/primitives";

const mailJS = {
    sID: "service_19919dy",
    tID: "template_i762sic",
    pk: "6MBro6u0uI4QJEkUN",
}



export default function ConatctUs() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username,setUsername]=useState("")
    const [useremail,setUseremail]= useState("")
    const [usermessage,setUsermessage]= useState("")
    const contactForm = useRef();
    console.log(mailJS.sID)

    // @ts-ignore
    // @ts-ignore
    const  formHandle=(e)=>
    {
        e.preventDefault()
        emailjs.sendForm(
            mailJS.sID,
            mailJS.tID, contactForm.current,
           mailJS.pk)
            .then((result) => {
                setUsername('')
                setUseremail('')
                setUsermessage('')
                alert("Message Sent!")
            }, (error) => {
                alert("Oops! error sending your message!")
            });
    }
    return (
        <>
            <Button isIconOnly onPress={onOpen} style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                height:"50px",
                width: '50px',
                borderRadius: '50%',
                zIndex:"20"
            }}
                    className={"bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"} color="primary">
                <ChatBubble/>
               </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <form ref={contactForm || null} name={"contactForm"}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className={title({color: "violet"})}>Talk To Us</ModalHeader>
                                <ModalBody>

                                    <Input
                                        autoFocus
                                        label="Email"
                                        placeholder="Enter your email"
                                        variant="bordered"
                                        name={"useremail"} id="useremail"
                                        className={"email"} required={true} value={useremail}
                                        onChange={(e) => setUseremail(e.target.value)}

                                    />
                                    <Input
                                        autoFocus
                                        label="Name"
                                        placeholder="Enter your Name"
                                        variant="bordered"
                                        name={"name"}
                                        id="name"
                                        required={true}
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                    <Textarea
                                        label="Message"
                                        placeholder="Enter your message"
                                        className="max-w-xs"
                                        name={"message"} type="text" id="message"
                                        required={true} value={usermessage}
                                        onChange={(e) => setUsermessage(e.target.value)}
                                    />
                                    <div className="flex py-2 px-1 justify-between">
                                    </div>


                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onClick={(e)=>formHandle(e)}>
                                        Send
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}
