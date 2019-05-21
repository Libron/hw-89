import React from 'react';

import {apiURL} from "../../constants";

const styles = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
  marginLeft: '15px',
    borderRadius: '15px'
};

const AvatarThumbnail = props => {
  let image = null;

  if (props.image || props.image !== 'null') {
      if (props.fb) {
        image = props.image;
      } else {
        image = apiURL + '/uploads/' + props.image;
      }
  }

  return <img src={image} style={styles} className="img-avatar" alt="Artist" />;
};

export default AvatarThumbnail;
