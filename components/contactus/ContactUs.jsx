"use client"
import React, {useEffect, useRef, useState} from "react";
import * as emailjs from "@emailjs/browser";
import {ChatBubble, Close, CheckCircle} from "@mui/icons-material";

// Set in .env and passed to the browser by next.config.js
const mailJS = {
    sID: process.env.NEXT_EMAILJS_SERVICEID,
    tID: process.env.NEXT_EMAILJS_TEMPLATEID,
    pk: process.env.NEXT_EMAILJS_PUBLICKEY,
}

// Fixed colours instead of the site theme, whose white text vanishes on light panels.
// Every text/background pair here meets WCAG AA contrast (4.5:1) or better.
const fieldClass = "w-full rounded-xl border-2 border-zinc-500 bg-white px-4 py-3 text-[16px] text-zinc-900 " +
    "placeholder:text-zinc-500 focus:border-[#a3154b] focus:outline-none focus:ring-4 focus:ring-[#a3154b]/25 " +
    "dark:border-zinc-400 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400 " +
    "dark:focus:border-pink-300 dark:focus:ring-pink-300/30"
const labelClass = "text-[15px] font-semibold text-zinc-900 dark:text-zinc-50"

export default function ConatctUs() {
    const [isOpen, setIsOpen] = useState(false)
    // idle, sending, sent or error
    const [status, setStatus] = useState("idle")
    const contactForm = useRef(null)
    const firstField = useRef(null)

    useEffect(() => {
        if (!isOpen) return
        firstField.current?.focus()
        const closeOnEscape = (e) => e.key === "Escape" && setIsOpen(false)
        window.addEventListener("keydown", closeOnEscape)
        return () => window.removeEventListener("keydown", closeOnEscape)
    }, [isOpen])

    const toggle = () => {
        if (status === "sent") setStatus("idle")
        setIsOpen(open => !open)
    }

    const formHandle = async (e) => {
        e.preventDefault()
        setStatus("sending")
        try {
            await emailjs.sendForm(mailJS.sID, mailJS.tID, contactForm.current, mailJS.pk)
            contactForm.current.reset()
            setStatus("sent")
        } catch {
            setStatus("error")
        }
    }

    return (
        <>
            {isOpen && (
                <section role="dialog" aria-modal="false" aria-labelledby="contact-title"
                         className="fixed bottom-[88px] left-4 right-4 z-30 p-0 w-auto sm:left-auto sm:right-5 sm:w-[380px]
                                    flex flex-col overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl
                                    ring-1 ring-black/10 dark:bg-zinc-900 dark:text-zinc-50 dark:ring-white/15
                                    max-h-[calc(100dvh-110px)]">
                    <header className="flex items-start justify-between gap-3 bg-[#a3154b] px-5 py-4 text-white">
                        <div>
                            <h2 id="contact-title" className="text-[20px] font-bold leading-tight">Talk to us</h2>
                            <p className="text-[14px] text-white/90">We read every message and usually reply within a day.</p>
                        </div>
                        <button type="button" onClick={toggle} aria-label="Close chat"
                                className="rounded-full p-1.5 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                            <Close/>
                        </button>
                    </header>

                    {status === "sent" ? (
                        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center" role="status">
                            <CheckCircle className="text-green-700 dark:text-green-400" sx={{fontSize: 56}}/>
                            <p className="text-[18px] font-semibold">Message sent. Thank you!</p>
                            <p className="text-[15px] text-zinc-700 dark:text-zinc-300">We&apos;ll get back to you by email.</p>
                            <button type="button" onClick={() => setStatus("idle")}
                                    className="mt-2 text-[16px] font-semibold text-[#a3154b] underline underline-offset-4 dark:text-pink-300">
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form ref={contactForm} name="contactForm" onSubmit={formHandle}
                              className="flex flex-col gap-4 overflow-y-auto px-5 py-5">
                            <label className="flex flex-col gap-1.5">
                                <span className={labelClass}>Name</span>
                                <input ref={firstField} name="name" required autoComplete="name"
                                       placeholder="Your name" className={fieldClass}/>
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className={labelClass}>Email</span>
                                <input name="useremail" type="email" required autoComplete="email"
                                       placeholder="you@example.com" className={fieldClass}/>
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className={labelClass}>Message</span>
                                <textarea name="message" required rows={4} placeholder="How can we help?"
                                          className={`${fieldClass} resize-none`}/>
                            </label>
                            {status === "error" && (
                                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] font-medium text-red-800
                                                           dark:bg-red-950 dark:text-red-200">
                                    Your message couldn&apos;t be sent. Please check your connection and try again.
                                </p>
                            )}
                            <button type="submit" disabled={status === "sending"}
                                    className="rounded-xl bg-[#a3154b] px-5 py-3 text-[16px] font-semibold text-white
                                               hover:bg-[#8a1140] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#a3154b]/40
                                               disabled:cursor-wait disabled:opacity-80">
                                {status === "sending" ? "Sending…" : "Send message"}
                            </button>
                        </form>
                    )}
                </section>
            )}

            <button type="button" onClick={toggle} aria-expanded={isOpen}
                    aria-label={isOpen ? "Close chat" : "Talk to us"}
                    className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full
                               bg-white text-[#a3154b] shadow-xl ring-1 ring-black/10 transition-transform
                               hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70">
                {isOpen ? <Close/> : <ChatBubble/>}
            </button>
        </>
    );
}
