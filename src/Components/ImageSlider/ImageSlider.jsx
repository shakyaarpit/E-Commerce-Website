import React, { useEffect, useState } from "react";
import img1 from "/img1.jpeg";
import img2 from "/img2.jpeg";
import img3 from "/img3.jpg";
import img4 from "/img4.jpg";
import { ImNext } from "react-icons/im";
import { ImBackward } from "react-icons/im";
const ImageSlider = () => {
  const [image, setImage] = useState(0);
  const [allImage, setAllImage] = useState([img1, img2, img3, img4]);

  useEffect(() => {
    setInterval(() => {
      setImage(image => image < 3 ? image + 1 : 0);
    }, 3000);
  }, []);

  return (
    <div >
      <img src={allImage[image]} className="w-full" alt="" />
      <div className=" flex justify-center items-center gap-3">
      <button className=" bg-red-500 p-1 px-4 mt-5 text-white rounded-md"
        onClick={() => {
          if (image > 0) setImage(image - 1);
        }}
      >
        <ImBackward/>
      </button>
      <button
      className="bg-red-500 p-1 px-4 mt-5 text-white rounded-md"
        onClick={() => {
          if (image < allImage.length - 1) setImage(image + 1);
        }}
      >
        {" "}
        <ImNext/>
      </button>
      </div>
    </div>
  );
};

export default ImageSlider;
