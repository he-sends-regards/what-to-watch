import React from "react";
import PropTypes from "prop-types";
import {filmValidator} from "../../../propsValidators/validators.prop";

const FilmDetails = (props) => {
  const {promoFilm} = props;

  return (
    <React.Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{promoFilm.director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {promoFilm.starring}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{`${Math.round(promoFilm.duration / 60)}h ${promoFilm.duration % 60}m`}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{promoFilm.genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{promoFilm.year}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

FilmDetails.propTypes = {
  promoFilm: PropTypes.shape(filmValidator)
};

export default FilmDetails;
