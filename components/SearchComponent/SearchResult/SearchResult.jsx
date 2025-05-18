import "./SearchResult.css";
import {Image} from "@nextui-org/react";

export const SearchResult = ( props ) => {
  return (
      <>

          <div
              className="search-result"
              onClick={()=>{props.setContent({type: props.type, url: props.id,image:props.image,name:props.name,artist:props.artist}) ;console.log({
                  type: props.type,
                  url: props.id
              })}}
          >
              <Image src={props.image} alt="" style={{maxWidth:"50px",height:"50px"}}/>
              <p>{props.name+"\t"} </p>
              <p>{props.artist}</p
              >
          </div>
      </>

  );
};
