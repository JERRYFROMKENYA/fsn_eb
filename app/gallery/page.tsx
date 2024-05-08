import { title } from "@/components/primitives";
import {Albums} from "@/components/Albums";



export default async function Gallery() {

	// console.log(JSON.stringify(re, null, 2));

	return (
		<div>
			<h1 className={title()}>Gallery</h1>
			<Albums/>

		</div>
	);
}
