import { useParams, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import setStar from "../helpers/hooks/setStar";
import { Loading, NotFound } from "../components";
import Swal from "sweetalert2";

import { addFavourite, deleteFavourite } from "../store/actions/favourite";
import { setAnimeAsync } from "../store/actions/anime";

export default function AnimeDetail() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { detailURL, anime, loading, error } = useSelector(
    (state) => state.anime
  );
  const animeFavourite = useSelector((state) => state.favourite.animeFavourite);

  useEffect((_) => {
    document.title = "OnioNime - Detail";
  }, []);

  useEffect(() => {
    dispatch(setAnimeAsync(detailURL + id));
    // eslint-disable-next-line
  }, [id]);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let format = new Date(date);
    return format.toLocaleString("en", options);
  };

  const checkCoverImage = () => {
    const url = anime.attributes.coverImage;
    if (url) {
      return (
        <img
          className="img-cover"
          src={JSON.stringify(url.large).split('"').join("")}
          alt="gambar"
        />
      );
    } else {
      return (
        <img
          className="img-cover"
          src="http://www.excavationsqueensland.com.au/wp-content/themes/excavation_queensland/img/no-banner.jpg"
          alt="gambar"
        />
      );
    }
  };

  const goToHome = () => {
    history.goBack();
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
        title: "Already Favourited",
        text: `${anime?.attributes?.canonicalTitle} already on Favourite, what do you want?`,
        icon: "info",
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

  const setButton = () => {
    const alreadyFavourited = animeFavourite.find(
      (favourite) => favourite.id === anime.id
    );

    return (
      <button
        onClick={() => setFavourite(anime)}
        className={`btn ${alreadyFavourited ? "btn-danger" : "btn-primary"}`}
      >
        {alreadyFavourited ? <>Favourited &#10003;</> : "Add to Favourite"}
      </button>
    );
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <NotFound />;
  }
  return (
    <Container>
      <div className="anime-detail">
        <div className="row">
          <div className="col">
            <center>
              <div className="">
                {checkCoverImage()}
                <div className="btn-detail">
                  {setButton(anime.id)}
                  <button onClick={() => goToHome()} className="btn btn-info">
                    Back to list
                  </button>
                </div>
              </div>
            </center>
          </div>
        </div>
        <hr />
        <div className="detail-info">
          <div className="col img-detail-container text-center">
            <img
              className="img-detail"
              src={JSON.stringify(anime.attributes.posterImage.large)
                .split('"')
                .join("")}
              alt="gambar"
            />
          </div>
          <div className="col">
            <h1 className="text-center font-weight-bold mb-4">
              {JSON.stringify(anime.attributes.canonicalTitle)
                .split('"')
                .join("")}
            </h1>
            <p>
              Release date :{" "}
              {formatDate(
                JSON.stringify(anime.attributes.startDate).split('"').join("")
              )}
            </p>
            <p>
              Rating :{" "}
              {JSON.stringify(anime.attributes.averageRating)
                .split('"')
                .join("")}{" "}
              {setStar(
                JSON.stringify(anime.attributes.averageRating)
                  .split('"')
                  .join("")
              )}
            </p>
            <p>Synopsis : {JSON.stringify(anime.attributes.synopsis)}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
