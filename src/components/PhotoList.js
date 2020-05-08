import React from "react";
import Photo from "./Photo";
import SearchForm from "./SearchForm";

const PhotoList = (props) => {
  const results = props.data;
  let photos = results.map((photo) => (
    <Photo
      url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
      key={photo.id}
    />
  ));

  return (
    <div className="photo-container">
      <h2>{props.title}</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
