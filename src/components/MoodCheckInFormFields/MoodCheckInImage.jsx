import axios from "axios";
import React from "react";
import { useState } from "react";

function MoodCheckInImage({
  form,
  setForm,
  handleChange,
  isUploading,
  setIsUploading,
}) {
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      const image = e.target.files[0];
      const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`;

      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_URL}`);
      setMessage("Image is being uploaded.");

      const config = {
        onUploadProgress: (progressEvent) =>
          setUploadProgress(
            Math.round((progressEvent.loaded / image.size) * 100)
          ),
      };

      const uploader = await axios.post(url, data, config);
      const response = await uploader.data;
      const { secure_url } = await response;
      setForm({ ...form, image: secure_url });
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    } finally {
      setMessage("Image uploaded.");
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  return (
    <label className="mood-check-in__form-image mood-check-in__form-flex">
      <div className={`submits ${isUploading && "loading"}`}>
        {!message && !form.image && "Upload Image"}
        {message && uploadProgress > 0 && (
          <p>
            {message} {uploadProgress}%
          </p>
        )}
        {message && uploadProgress === 0 && <p>{message}</p>}
      </div>

      <input
        type="file"
        name="image"
        onChange={uploadImage}
        // value={form.image}
      ></input>
    </label>
  );
}

export default MoodCheckInImage;
