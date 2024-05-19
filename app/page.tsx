import {Hero} from "@/components/Home/hero";
import Strip from "@/components/strip/strip";
import Description from "@/components/description/description";
import {Socials} from "@/components/socials/Socials";
import Picnic from "@/components/picnic/picnic";
import React from "react";
import ConatctUs from "@/components/contactus/ContactUs";
import Faq from "@/components/FAQ/Faq";
import {Birthdays} from "@/components/Birthdays/Birthdays";


export default function Home() {
	return (
		<>
			<Strip/>
			<Hero/>
			<Strip/>
			<Picnic/>
			<Strip/>
			<Description/>
			<Strip/>
			<Birthdays/>
			<Strip/>
			<Socials/>
			<ConatctUs />
			<Faq/>
			<Strip/>
		</>
	);
}
