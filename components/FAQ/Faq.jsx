"use client"
import React, { useEffect } from "react";
import { questions } from "./data.jsx";
import Question from "./Question.jsx";
import {title} from "@/components/primitives"
import { MdOutlineLibraryBooks } from "react-icons/md";

import AOS from "aos";
import "aos/dist/aos.css";

const Faq = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    //   react-scripts
    <section id="faq">
      <div className="container faq">
        <div className="u-title" data-aos="fade-up">
          {/*<MdOutlineLibraryBooks color="orangered" size={30} />*/}
          <h2 className={"text-default"}>FAQs</h2>
          {/*<p className="u-text-small">*/}
          {/*  What about...*/}
          {/*</p>*/}
        </div>
        <div className="questions">
          {questions.map((question) => (
            <Question
              key={question.id}
              title={question.title}
              answer={question.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
