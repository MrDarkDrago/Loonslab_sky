import React from "react";
import { Image } from "react-bootstrap";
import background from "../Images/Back_img.jpg";
import "../CSS/background.css"

function BackgroundImage() {
  return (
    <div className="image-container">
        <Image className="responsive-image"
          src={background}
          alt="top_image"
        
        />
    </div>
  );
}

export default BackgroundImage;
