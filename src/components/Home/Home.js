import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

function Home({ userId }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [imageListRef, setImageListRef] = useState(null);

  const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${userId}/uploads/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapShot) => {
      getDownloadURL(snapShot.ref).then((url) => {
        setImageURL(url);
      });
    });
  };

  const handleDelete = () => {
    console.log('Delete Image')
  }

  useEffect(() => {
    if (!userId) return;
    setImageListRef(ref(storage, `${userId}/uploads/`));
  }, [userId, imageURL]);

  useEffect(() => {
    if (!imageListRef) return;
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((imageList) => [...imageList, url]);
        });
      });
    });
  }, [imageListRef]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.buttonsContainer}>
        <div className={styles.uploadsContainer}>
          <div className={styles.uploadsBtnContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUpload(e.target.files[0])}
            ></input>
            <button
              style={{ padding: "5px 25px", margin: 25 }}
              onClick={handleUpload}
              disabled={userId ? false : true}
            >
              Upload
            </button>
          </div>

          <div className={styles.uploadImageContainer}>
            {imageURL ? (
              <img src={imageURL} height={"100%"} />
            ) : userId ? (
              <h1>Upload an Image</h1>
            ) : (
              <h1>Login/SignUp to Upload an Image</h1>
            )}
          </div>
        </div>

        <button style={{ padding: "5px 25px", margin: 25, width: 250 }}>
          Generate
        </button>
      </div>

      <div>
        <h2>Uploads: </h2>
        {imageList.map((url, id) => {
          return (
            <div key={id}>
              <img src={url} height={"250px"} style={{ margin: 25 }} />
              <button onClick={handleDelete}>
                Delete image
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
