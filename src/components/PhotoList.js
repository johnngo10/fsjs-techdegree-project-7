import React from "react";
import Photo from "./Photo";

const PhotoList = (props) => {
  const results = props.data;
  let photos = results.map((photo) => <Photo />);

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        <Photo />
      </ul>
    </div>
  );
};

export default PhotoList;
