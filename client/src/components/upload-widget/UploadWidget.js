import React, { useEffect, useRef } from "react"
import uploadIcon from "../../images/upload.png";




const UploadWidget = ({setUrl})=>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dvn7vwhbw",
            uploadPreset:"dfl20ekd",
        }, function(error, result){
            // console.log(result.info?.files?.[0]?.uploadInfo?.secure_url);
            const images = result?.info?.files;
            if(images){
                console.log(images[0].uploadInfo?.secure_url);
                setUrl(images[0].uploadInfo?.secure_url);
            }
        })
    },[])


    return (
        <div onClick={()=>widgetRef.current.open()}>
            <img src={uploadIcon} alt=""></img>
            <div>UPLOAD IMAGE</div>
        </div>
    )
}

export default UploadWidget;