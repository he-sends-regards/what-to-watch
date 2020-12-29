import React from "react";
import PropTypes from "prop-types";
import countRateDescription from "../../../utils/film";
import {filmValidator} from "../../../propsValidators/validators.prop";

const FilmOverview = (props) => {
  const {promoFilm} = props;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{promoFilm.rate}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{countRateDescription(promoFilm.rate)}</span>
          <span className="movie-rating__count">{promoFilm.ratings} ratings</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{promoFilm.description}</p>

        <p className="movie-card__director"><strong>Director: {promoFilm.director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {promoFilm.starring}</strong></p>
      </div>
    </React.Fragment>
  );
};

FilmOverview.propTypes = {
  promoFilm: PropTypes.shape(filmValidator)
};

export default FilmOverview;
