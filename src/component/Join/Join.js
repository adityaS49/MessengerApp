import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";
let user;
let  a;
const Join = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
    a = imagePreview;
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const previewURL = URL.createObjectURL(selectedImage);
    setImagePreview(previewURL);
  };
  const sendUser = () => {
    // Get user name from the input
     user = document.getElementById("joinInput").value;
    const userImage = document.getElementById("imageInput").value;

    if (user && userImage) {
      document.getElementById("joinInput").value = "";
      document.getElementById("imageInput").value = "";
      setName("");
      setImage(null);
    }
  };

  return (
    <div className="join-page-container">
      <div className="JoinPage">
        <div className="JoinContainer">
          <h1>MessengerApp</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            type="text"
            id="joinInput"
          />
          <div>
            <div className="flex items-center justify-center">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="imageInput"
                />
              </div>
              <div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="image-preview"
                  />
                )}
              </div>
            </div>
            <h3 className={image ? "uploaded-text" : "upload-text"}>
              {image ? "Uploaded!!" : "Upload Profile Picture"}
            </h3>
          </div>

          <Link
            onClick={(event) =>
              !name || !image ? event.preventDefault() : null
            }
            to="/chat"
          >
            <button onClick={sendUser} className="join-btn">
              Login In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
export { user};
export { a};
