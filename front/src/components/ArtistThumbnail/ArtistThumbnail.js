import React from 'react';

import {apiURL} from "../../constants";

const styles = {
  width: '150px',
  marginRight: '10px'
};

const ArtistThumbnail = props => {
  if (props.image && props.image !== 'null') {
     return <img src={apiURL + '/uploads/' + props.image} style={styles} className="img-thumbnail" alt="Artist" />;
  }
  return null;
};

export default ArtistThumbnail;
