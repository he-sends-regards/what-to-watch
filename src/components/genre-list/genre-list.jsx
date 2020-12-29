import React from "react";
import PropTypes from "prop-types";
import {toggleFilter} from "../../store/action/action";
import {connect} from "react-redux";
import {ALL_GENRE} from "../../const";

const MAX_GENRES_COUNT_TO_SHOW = 9;

const GenreList = ({genres, toggleFilterAction, activeGenre}) => {
  return (
    <ul className="catalog__genres-list">
      {
        <li className={`catalog__genres-item ${activeGenre === ALL_GENRE ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link" onClick={() => toggleFilterAction(ALL_GENRE)}>ALL_GENRE</a>
        </li>
      }

      {
        genres
          .map((genre, i) => (
            <li className={`catalog__genres-item ${activeGenre === genre ? `catalog__genres-item--active` : ``}`} key={`catalog__genres-item-${i}`}>
              <a href="#" className="catalog__genres-link" onClick={() => toggleFilterAction(genre)}>{genre}</a>
            </li>
          ))
          .slice(0, MAX_GENRES_COUNT_TO_SHOW)
      }
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired),
  toggleFilterAction: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired
};

const mapStateToProps = ({FILMS}) => ({
  showFilmsCount: FILMS.showFilmsCount,
  genres: FILMS.films
    .reduce((acc, el) => [...acc, el.genre], [])
    .filter((value, index, self) => self.indexOf(value) === index),
  activeGenre: FILMS.activeGenre
});
const mapDispatchToProps = (dispatch) => ({
  toggleFilterAction: (newFilter) => {
    dispatch(toggleFilter(newFilter));
  }
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
