import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Group } from "@mantine/core";

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    const loadCloudinaryScript = () => {
      if (!window.cloudinary) {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
        script.onload = () => {
          cloudinaryRef.current = window.cloudinary;
          initializeWidget();
        };
        document.body.appendChild(script);
      } else {
        cloudinaryRef.current = window.cloudinary;
        initializeWidget();
      }
    };

    const initializeWidget = () => {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dohk8ugal",
          uploadPreset: "brick_byte",
          maxFiles: 1,
        },
        (err, result) => {
          if (result.event === "success") {
            setImageURL(result.info.secure_url);
          }
        }
      );
    };

    loadCloudinaryScript();  // Call the function to load the Cloudinary script
  }, []);

  return (
    <div className="flex flex-col items-center mt-12 gap-8">
      {!imageURL ? (
        <div
          className="flex flex-col items-center justify-center w-4/5 h-80 border-2 border-dashed border-gray-500 cursor-pointer"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="w-4/5 h-80 rounded-xl cursor-pointer overflow-hidden"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="Uploaded" className="w-full h-full object-cover" />
        </div>
      )}

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
