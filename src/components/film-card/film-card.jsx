import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {filmValidator} from "../../propsValidators/validators.prop";

const FilmCard = (props) => {
  const {id, title, preview, trailer} = props.film;
  const {onMouseEnter, onMouseLeave, isActive} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-id={id}
    >
      <Link to={`${AppRoute.FILM}/${id}`}>
        {isActive
          ? <video src={trailer.src} autoPlay width="280" height="175">Something goes wrong {`:(`}</video>
          : <div className="small-movie-card__image">
            <img src={preview.src} alt={title} width="280" height="175" />
          </div>}
      </Link>

      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILM}/${id}`} className="small-movie-card__link">{title}</Link>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape(filmValidator),
  isActive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default FilmCard;
