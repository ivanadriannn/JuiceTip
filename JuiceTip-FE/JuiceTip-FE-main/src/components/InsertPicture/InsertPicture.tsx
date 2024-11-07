import React, { useEffect, useState } from 'react'
import addImgLogo from '../../assets/images/add-image-logo.png'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../Services/firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { IInsertPicture } from './InsertPicture.interfaces';

const InsertPicture = (props: IInsertPicture) => {
  const { productId, index, preview } = props;
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState<any | null>(null);

  useEffect(() => {
    if (img) {
      uploudPicture();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      if (preview) {
        setImgPreview(preview);
      } else {
        setImgPreview(null);
      }
    }
  }, [img]);

  const uploudPicture = async () => {
    if (img) {
      const id = `${productId}_${props.index}`;
      const storageRef = ref(storage, `products/${id}`);
      const snapshot = await uploadBytesResumable(storageRef, img);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await setDoc(doc(db, "products", id), { image: downloadURL })
    }
  }

  return (
    <div className="relative cursor-pointer w-56 h-56 flex items-center justify-center bg-[#d9d9d9] rounded-xl max-2xl:w-40 max-2xl:h-40 max-xl:w-32 max-xl:h-32">
      {imgPreview ? (
        <img
          src={imgPreview}
          alt="preview"
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <img src={addImgLogo} alt="" />
      )}
      <input
        type="file"
        id="file"
        className="cursor-pointer absolute z-10 inset-0 opacity-0 w-full h-full"
        onChange={(e: any) => setImg(e.target.files[0])}
      />
    </div>
  );
};

export default InsertPicture;
