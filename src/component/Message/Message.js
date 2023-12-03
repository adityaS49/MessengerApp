import React from 'react'
import "./Message.css";


const Message = ({ user, message, classs, image }) => {
    console.log(image);
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
            <img class="logo" src={image} alt=""/>

			<p>{message}</p>
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
