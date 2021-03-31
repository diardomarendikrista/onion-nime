import React from 'react';
import * as Icon from 'react-bootstrap-icons';

export default function setStar (rating) {
    // const rating = JSON.stringify(anime.attributes.averageRating).split('"').join('');
    let color = [];
    let star = 0;
    if (rating === 'null') star = 0;
    else {
      star = Math.round(rating / 20);
      if ((rating >= 70) && (rating < 77)) star = 3 
    }

    for (let i = 0; i < 5; i++) {
      i < star ? color.push("orange") : color.push("black")
    }
    return (
      <>
        <Icon.StarFill className="star-rate" color={color[0]}/>
        <Icon.StarFill className="star-rate" color={color[1]}/>
        <Icon.StarFill className="star-rate" color={color[2]}/>
        <Icon.StarFill className="star-rate" color={color[3]}/>
        <Icon.StarFill className="star-rate" color={color[4]}/>
      </>
    )
}