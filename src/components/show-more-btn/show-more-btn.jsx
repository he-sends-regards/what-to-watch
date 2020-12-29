import React from "react";
import PropTypes from "prop-types";
import {showMoreFilms} from "../../store/action/action";
import {connect} from "react-redux";
import {ALL_GENRE} from "../../const";

const ShowMoreBtn = ({showMoreFilmsAction, showFilmsCount, filmsLength}) => {
  return showFilmsCount < filmsLength && (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => showMoreFilmsAction()}>Show more</button>
    </div>
  );
};

ShowMoreBtn.propTypes = {
  showMoreFilmsAction: PropTypes.func.isRequired,
  filmsLength: PropTypes.number.isRequired,
  showFilmsCount: PropTypes.number.isRequired
};

const mapStateToProps = ({FILMS}) => ({
  showFilmsCount: FILMS.showFilmsCount,
  filmsLength: FILMS.films
    .filter((film) => FILMS.activeGenre === ALL_GENRE || FILMS.activeGenre === film.genre)
    .length
});

const mapDispatchToProps = (dispatch) => ({
  showMoreFilmsAction: () => {
    dispatch(showMoreFilms());
  }
});

export {ShowMoreBtn};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreBtn);
