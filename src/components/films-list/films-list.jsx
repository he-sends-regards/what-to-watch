import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FilmCard from "../film-card/film-card";
import {filmValidator} from "../../propsValidators/validators.prop";
import {withFilmsList} from "../../hocs/with-films-list/with-films-list";
import {ALL_GENRE} from "../../const";

const MORE_LIKE_THIS_FILMS_COUNT = 4;

const FilmsList = (props) => {
  const {activeFilmId, onMouseEnter, onMouseLeave, showFilmsCount, films, doesBelongMoreLikeThis} = props;

  return (
    <div className="catalog__movies-list">
      {
        (doesBelongMoreLikeThis
          ? films
            .filter((film) => {
              return film.id !== props.currentFilmId && film.genre === props.currentFilmGenre;
            })
            .slice(0, MORE_LIKE_THIS_FILMS_COUNT)
          : films
            .filter((film) => props.activeGenre === ALL_GENRE || props.activeGenre === film.genre)
            .slice(0, showFilmsCount)
        ).map((film) => {
          return (
            <FilmCard
              key={film.id}
              film={film}
              isActive={film.id === activeFilmId}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          );
        })
      }
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator)),
  showFilmsCount: PropTypes.number.isRequired,
  activeFilmId: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  doesBelongMoreLikeThis: PropTypes.bool.isRequired,
  currentFilmId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.oneOf([undefined]).isRequired]),
  currentFilmGenre: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([undefined]).isRequired]),
  activeGenre: PropTypes.string.isRequired
};

const mapStateToProps = ({FILMS}) => ({
  showFilmsCount: FILMS.showFilmsCount,
  activeGenre: FILMS.activeGenre
});

export {FilmsList};
export default connect(mapStateToProps)(withFilmsList(FilmsList));
