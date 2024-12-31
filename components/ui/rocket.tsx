import React from "react";

const Rocket: React.FC = () => {
  const videoUrl: string = "public/images/rocker"; // Replace with your video file path

  return (
    <div>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "auto" }}
      >
        <source src={videoUrl} type="video/mp4"/>
      </video>
    </div>
  );
};

export default Rocket;
