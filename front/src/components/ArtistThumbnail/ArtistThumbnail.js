import React from 'react';

import {apiURL} from "../../constants";

const styles = {
  width: '150px',
  marginRight: '10px'
};

const ArtistThumbnail = props => {
  let image = null;

  if (props.image || props.image !== 'null') {
    image = apiURL + '/uploads/' + props.image;
  }

  return <img src={image} style={styles} className="img-thumbnail" alt="Artist" />;
};

export default ArtistThumbnail;
