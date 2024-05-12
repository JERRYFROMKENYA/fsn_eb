"use client"
import {title} from "@/components/primitives";
import {setNeedNav} from "@/components/navbar";
import person from "./person.jpeg"
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Card, CardBody, DateInput, Image, Radio, RadioGroup} from "@nextui-org/react";
import {upload, put} from '@vercel/blob/client';
import {Input, Textarea} from "@nextui-org/input";
import bcrypt from 'bcryptjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/fbConfigSetter.jsx"
import {Backdrop} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const input_theme={
    label: "text-black/50 dark:text-white/90",
    input: [
        "bg-transparent",
        "text-black/90 dark:text-white/90",
        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
        "shadow-xl",
        "bg-default-200/50",
        "dark:bg-default/60",
        "backdrop-blur-xl",
        "backdrop-saturate-200",
        "hover:bg-default-200/70",
        "dark:hover:bg-default/70",
        "group-data-[focused=true]:bg-default-200/50",
        "dark:group-data-[focused=true]:bg-default/60",
        "!cursor-text",
    ],
}

export default function Register() {
    setNeedNav(false)
	return (
		<div style={{
            paddingTop:"30px"
        }}>
			<h1 className={title()}>Register</h1>
            <VerticalLinearStepper/>
		</div>
	);
}


function BioDataCard(props){
    const [preview, setPreview]=useState()
    const onImageSelect =(e)=>{
        if(e.target.files[0].type.includes("image"))
        {
            props.setImage(e.target.files[0]);
            props.setImageName(e.target.files[0].name)
            console.log(e.target.files[0])

        }
        else {
            props.setImage(e.target.files[1]);
            props.setImageName(e.target.files[1].name)
            console.log(e.target.files[1])
        }


    }
    const displayImage=()=>
    {

        const fileReader = new FileReader()
        fileReader.readAsDataURL(props.image);
        fileReader.addEventListener("load",function () {
            setPreview(this.result)

        });
        return(<><Image src={preview}  height={100} alt="" onClick={(e)=>{
            e.preventDefault()

            props.setImage(undefined)
            props.setImageName(undefined)}}/>
            <p>Tap Image to Remove</p></>)

    }

    return(
        <>
       <Card    isBlurred
                className="border-none light:bg-default-100/50 max-w-[100vw] m-8"
                shadow="sm"
                data-aos="fade-down">

           <CardBody>
               {
                   (!props.imageName === true) ? <><label htmlFor={"select-image"}><Image src={person.src}
                                                                                          alt={"person"}
                                                                                          height={"70px"}/><p>Tap to add a picture of yourself...</p></label></> : displayImage()
               }
               <br/>
               <input accept="image/*" type="file" id="select-image" style={{display: "none"}}
                      onChange={e => {
                          onImageSelect(e)
                      }}/>


               <Input type="text" label="First Name" variant={"bordered"} classNames={input_theme}
                      onChange={(e) => {
                          props.setFirstName(e.target.value)
                      }}/>
               <br/>
               <Input type="text" label="Middle Name" variant={"bordered"} classNames={input_theme}
                      onChange={(e) => {
                          props.setMiddleName(e.target.value)
                      }}
               />
               <br/>
               <Input type="text" label="Last Name" variant={"bordered"} classNames={input_theme}
                      onChange={(e) => {
                          props.setLastName(e.target.value)
                      }}
               />
               <br/>
               <Input type="email" label="Email" variant={"bordered"} classNames={input_theme}
                      onChange={(e) => {
                          props.setEmail(e.target.value)
                      }}
               />
               <br/>
               <Input type="number" label="Phone Number" variant={"bordered"} classNames={input_theme}
                      onChange={(e) => {
                          props.setPhone(e.target.value)
                      }}
               />
               <br/>

               <RadioGroup
                    label="Select your Gender"
                    onChange={(e) => {
        props.setGender(e.target.value) }}
                            >
      <Radio value="male">Male</Radio>
      <Radio value="female">Female</Radio>
      
    </RadioGroup>
               <br/>
               <DateInput label={"Birthday"} className={"max-w-screen-lg"} classNames={input_theme} onChange={(e) => {
                   console.log(`${e.year || 0}/${e.month || 0}/${e.day || 0}`)
                   props.setBirthday(`${e.year || 0}/${e.month || 0}/${e.day || 0}`)

               }}/>
               <br/>

           </CardBody>

       </Card>
        </>
    )
}

function ProfessionCard(props){
    const handleTextareaChange = (event) => {
        // Split the textarea value by newline characters
        const lines = event.target.value.split('\n');
        // Remove empty lines
        const filteredLines = lines.filter(line => line.trim() !== '');
        // Update the interests state with the array of lines
        props.setInterest(filteredLines);
    };
    return(<>
        <Card    isBlurred
                 className="border-none light:bg-default-100/50 max-w-[100vw] m-8"
                 shadow="sm"
                 data-aos="fade-down">

            <CardBody>
                <Input type="text" label="Profession" variant={"bordered"} classNames={input_theme}
                       onChange={(e) => {
                           props.setProfession(e.target.value)

                       }}
                />
                <br/>
                <Input type="text" label="University" variant={"bordered"} classNames={input_theme}
                       onChange={(e) => {
                            props.setUniversity(e.target.value)
                       }}
                />
                <br/>
                <Input type="text" label="Degree" variant={"bordered"} classNames={input_theme}
                       onChange={(e) => {
                                props.setDegree(e.target.value)
                       }}
                />
                <br/>
                <Textarea type="text" label="Reason for Joining Fancied Story Network" variant={"bordered"} classNames={input_theme}
                       onChange={(e) => {
                            props.setReason(e.target.value)
                       }}
                />
                <br/>
                <Textarea
                    label="Interests (Each of your interests should start on a new line)"
                    variant="bordered"
                    placeholder="Enter your Interests"
                    disableAnimation
                    disableAutosize
                    classNames={input_theme}
                    onChange={handleTextareaChange}
                />

            </CardBody>
        </Card>

    </>)

}

function FSNCard(props){
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const [message, setMessage]=useState("")

    return(
        <Card    isBlurred
                 className="border-none light:bg-default-100/50 max-w-[100vw] m-8"
                 shadow="sm"
                 data-aos="fade-down">

            <CardBody>
                <Input type="text" label="Username" variant={"bordered"} classNames={input_theme}
                       onChange={(e) => {
                           props.setUsername(e.target.value)

                       }}
                />
                <br/>
                <Input type="password" label="Password" variant={"bordered"} classNames={input_theme}
                       onValueChange={(e) => {
                           setPassword(e)
                           if(password.length<7)
                           {
                               setMessage("Password must be at least 8 characters")
                           }else
                            {
                                 setMessage("")
                            }

                       }}
                />
                <br/>
                  <Input type="password" label="Confirm Password" variant={"bordered"} classNames={input_theme}
                       onValueChange={(e) => {
                           setConfirmPassword(e)
                           props.setPassword(password)
                       }}
                />
                 <p className="text-default-500 text-small">{message}</p>
                <br/>
            </CardBody>
        </Card>
    )

}


function VerticalLinearStepper() {
    //card 1
    const [Email, setEmail] = useState()
    const [FirstName, setFirstName] = useState()
    const [LastName, setLastName] = useState()
    const [MiddleName, setMiddleName] = useState()
    const[Phone, setPhone] = useState()
    const[Birthday, setBirthday] = useState()
    const [image, setImage]=useState()
    const [imageName, setImageName]=useState('')
    const [gender, setGender]=useState()
    //card 2
    const [University, setUniversity]=useState();
    const [Profession, setProfession]=useState()
    const [Interest, setInterest]=useState()
    const [Degree, setDegree]=useState()
    const [Reason, setReason]=useState()
    //card 3
    const [Username, setUsername]=useState()
    const [Password, setPassword]=useState()


    
    const steps = [
        {
            label: 'Bio Data',
            description: `We need to know who our Fancied Friends Are to tailor custom experiences...😊`,
            component:<BioDataCard
                image={image}
                setImage={setImage}
                imageName={imageName}
                setImageName={setImageName}
                setBirthday={setBirthday}
                setEmail={setEmail}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setMiddleName={setMiddleName}
                setPhone={setPhone}
                setGender={setGender}
                />
            ,
        },
        {
            label: 'Profession, Education and Interests',
            description:
                'Mind Sharing what you do and what you enjoy?',
            component: <ProfessionCard
                setUniversity={setUniversity}
                setProfession={setProfession}
                setInterest={setInterest}
                setDegree={setDegree}
                setReason={setReason}
            />

        },
        {
            label: 'FSN',
            description: ``,
            component:<FSNCard
                setUsername={setUsername}
                setPassword={setPassword}/>
        },
    ];




    const handleImageUpload = async () => {
        if (image) {
            const file = image;
            const maxSize = 1 * 1024 * 1024; // 1MB
            if (file.size > maxSize) {
                // Compress the image if it's above 1MB
                const compressedImage = await compressImage(file);
                return await uploadImage(compressedImage);
            } else {
                await uploadImage(file);
            }
        }
    };

    const compressImage = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, file.type);
                };
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const uploadImage = async (file) => {
        try {
            const response = await upload("friends/profile_images",file);
            // Handle the response from the blob storage upload
            console.log("Image uploaded successfully:", response);
            return response.downloadUrl;
        } catch (error) {
            // Handle the error
            console.error("Error uploading image:", error);
        }
    };
 
    const [activeStep, setActiveStep] = React.useState(0);
  
    const hashPassword = () => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(Password, salt);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
        if (activeStep === steps.length - 1) {
            if(!Email||!FirstName||!LastName||!MiddleName||!Phone||!Birthday||!gender) {
                alert("Please update your contact information properly!")
            } else {
                if(!Username&&!Password) {
                    alert("Please create a proper user account")
                } else {
                    if (!image) {
                        alert("Please choose an a appropriate photo, first!")
                    } else {
                        const hashedPassword = hashPassword();
                        const storageRef = ref(storage, `/profile/images/${image.name}`)
                        const uploadTask = uploadBytesResumable(storageRef, image);
    
                        uploadTask.on("state_changed", (snapshot) => {
                            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            console.log(`Upload is ${percent}% done`);
                            handleOpen()
                        }, (err) => console.log(err), () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {
                                fetch('/api/user', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        action: "create",
                                        email: Email,
                                        first_name: FirstName,
                                        middle_name: MiddleName,
                                        last_name: LastName,
                                        phone_number: Phone,
                                        password: hashedPassword,
                                        birthday: Birthday,
                                        reason: Reason,
                                        profession: Profession,
                                        university: University,
                                        degree: Degree,
                                        interests: Interest,
                                        is_team: true,
                                        photo_url: imageUrl,
                                        gender: gender,
                                        user_name: Username,
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(

                                    ()=>{
                                        handleClose()
                                    }
                                )
                                .then(data => {
                                    // Handle response data
                                })
                                .catch(error => {
                                    // Handle error
                                });
                            });
                        });
                    }
                }
            }
        }
    }
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            <h2 className={title({color:"violet"})}> {step.label}</h2>

                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            {step.component}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you have successfully been on boarded</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
        </>

    );
  }