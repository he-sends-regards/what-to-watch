import React from "react";
import PropTypes from "prop-types";
import {filmValidator} from "../../propsValidators/validators.prop";
import {useParams} from "react-router-dom";
import browserHistory from "../../browser-history";
import {AppRoute} from "../../const";

const Player = ({films, filmId}) => {
  const currentUrlFilmId = filmId || Number(useParams().id);
  const film = films.filter((filmEl) => filmEl.id === currentUrlFilmId)[0];

  return (
    <div className="player">
      <video src={`${film.video.src}`} className="player__video" autoPlay controls></video>
      <div id="countdown">Video ends after <span id="countdown">xx</span> seconds.</div>

      <button type="button" className="player__exit" onClick={() => browserHistory.push(`${AppRoute.FILM}/${film.id}`)}>Exit</button>
    </div>
  );
};

Player.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator)),
  filmId: PropTypes.number.isRequired
};

export default Player;
