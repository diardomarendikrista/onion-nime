import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AnimeCard, Loading, Error } from "../components";

import { Container } from "react-bootstrap";

import { setLoading, setError } from "../store/actions/favourite";

export default function Home() {
  const { baseURL } = useSelector((state) => state.anime);
  const { animeFavourite, loading, error } = useSelector(
    (state) => state.favourite
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect((_) => {
    document.title = "OnioNime - Favourite";
  }, []);

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setError(false));
    // eslint-disable-next-line
  }, [baseURL]);

  const goToHome = () => {
    history.push("/");
  };

  const EmptyFavourite = () => {
    return (
      <div className="favourite-empty text-center">
        <h2 className="text-secondary">Oh noo...</h2>
        <h3 className="text-secondary">your favourite list is still empty</h3>
        <button
          onClick={() => goToHome()}
          className="btn btn-outline-secondary"
        >
          get some favourite anime
        </button>
      </div>
    );
  };

  return (
    <Container className="text-center">
      <div>
        {loading ? <Loading /> : ""}
        {error ? <Error /> : ""}
      </div>
      <hr />
      <div>
        <p className="text-left favourite-title">Your Favourite Anime</p>
      </div>
      {animeFavourite.length < 1 ? <EmptyFavourite /> : ""}
      <div className="d-flex flex-wrap favourite-list">
        {animeFavourite.map((anime) => (
          <AnimeCard anime={anime} key={anime.id} isFavouritePage />
        ))}
      </div>
    </Container>
  );
}
