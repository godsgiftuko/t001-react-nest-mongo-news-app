import React, { useState } from "react";
import axios from "axios";

const CloudinaryUploadManual = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "zfrivduh"); // Set this in Cloudinary settings

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddeh31zhy/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
      console.log("Uploaded image URL:", response.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />}
    </div>
  );
};

export default CloudinaryUploadManual;
