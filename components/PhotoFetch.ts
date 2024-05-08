import axios from "axios";

export async function getData() {
    const response = await axios.get('https://photos.app.goo.gl/CiuRUNXK3KMVB8FW8', {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
    if (!response.status) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return extractPhotos(response.data)

}
const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9\-_]*)"/g // the only difference is the [ at the beginning
function extractPhotos(content:string[]|string) {
    const links = new Set()
    let match
    while (match = regex.exec(content as string)) {
        links.add(match[1])
    }
    return Array.from(links)
}