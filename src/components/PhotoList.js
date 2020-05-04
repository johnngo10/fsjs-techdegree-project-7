import React from "react";
import Photo from "./Photo";

const PhotoList = (props) => {
  const results = props.data;
  const farmId = props.data.farm;
  let photos = results.map((photo) => (
    <Photo
      url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
    />
  ));

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
