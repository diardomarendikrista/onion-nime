import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import setStar from "../helpers/hooks/setStar";
import Swal from "sweetalert2";

import { addFavourite, deleteFavourite } from "../store/actions/favourite";

export default function AnimeDetail(props) {
  const animeFavourite = useSelector((state) => state.favourite.animeFavourite);
  const { anime, isFavouritePage } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let format = new Date(date);
    return format.toLocaleString("en", options);
  };

  const toDetail = (id) => {
    history.push(`/anime/${id}`);
  };

  const setButton = (id) => {
    const alreadyFavourited = animeFavourite?.find(
      (favourite) => favourite.id === anime.id
    );
    return (
      <Button
        onClick={() => setFavourite(anime)}
        className="btn-favourite"
        variant={alreadyFavourited ? "danger" : "primary"}
      >
        {alreadyFavourited ? (
          <>{isFavouritePage ? "Unfavourite" : <>Favourited &#10003;</>}</>
        ) : (
          "Add to Favourite"
        )}
      </Button>
    );
  };

  const setFavourite = (anime) => {
    let alreadyFavourited = animeFavourite.find(
      (favourite) => favourite.id === anime.id
    );
    if (!alreadyFavourited) {
      dispatch(addFavourite(anime));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `"${anime.attributes.canonicalTitle}" added to your favourites!`,
      });
    } else {
      Swal.fire({
        title: isFavouritePage ? "Unfavourite?" : "Already Favourited",
        text: isFavouritePage
          ? `Sure to remove ${anime?.attributes?.canonicalTitle} from your Favourite?`
          : `${anime?.attributes?.canonicalTitle} already on Favourite, what do you want?`,
        icon: "info",
        showConfirmButton: isFavouritePage ? false : true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#00a4b6",
        // denyButtonColor: "#b63131",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Go to Favourite",
        denyButtonText: `Unfavourite`,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/favourites");
        } else if (result.isDenied) {
          dispatch(deleteFavourite(anime));
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `"${anime.attributes.canonicalTitle}" removed from your favourites!`,
          });
        }
      });
    }
  };

  return (
    <>
      <Card className="card m-1" style={{ width: "16rem" }}>
        <div className="card-img-zoom">
          <Card.Img
            onClick={() => toDetail(anime.id)}
            className="card-img"
            variant="top"
            src={anime.attributes.posterImage.medium}
          />
        </div>
        <Card.Body>
          <Card.Title onClick={() => toDetail(anime.id)} className="card-title">
            {anime.attributes.canonicalTitle}
          </Card.Title>
          <Card.Text className="card-text">
            Release Date : {formatDate(anime.attributes.startDate)} <br />
            Status : {anime.attributes.status} <br />
            Rating :{" "}
            {!anime.attributes.averageRating
              ? "-"
              : anime.attributes.averageRating}{" "}
            {setStar(anime.attributes.averageRating)}
          </Card.Text>
          {setButton(anime.id)}
        </Card.Body>
      </Card>
    </>
  );
}
