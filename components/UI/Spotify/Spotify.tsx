const Spotify = (props:{type:string,id:string}) => {
    var content= props.type+"/"+props.id

    return (
        <>
            <iframe
                title="Spotify Embed: Recommendation Playlist "
                src={`https://open.spotify.com/embed/`+content+`?utm_source=generator&theme=0`}
                width="100%"
                height="100%"
                style={{ minHeight: '100px',  }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </>
    )
}

export default Spotify