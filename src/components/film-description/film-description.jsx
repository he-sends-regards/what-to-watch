import React from "react";
import PropTypes from "prop-types";
import {withFilmDesc} from "../../hocs/with-film-desc/with-film-desc";
import FilmOverview from "../film-tabs/film-overview/film-overview";
import FilmDetails from "../film-tabs/film-details/film-details";
import FilmReviews from "../film-tabs/film-reviews/film-reviews";
import {reviewValidator} from "../../propsValidators/validators.prop";
import {connect} from "react-redux";
import store from "../../store/store";
import {fetchReviews} from "../../store/api-actions";
import {FilmDescriptionTabsNames} from "../../const";

const FilmDescription = (props) => {
  React.useEffect(() => {
    store.dispatch(fetchReviews(props.currentUrlFilmId));
  }, []);

  const getCurrentFilmTab = () => {
    switch (props.activeSection) {
      case FilmDescriptionTabsNames.OVERVIEW:
        return <FilmOverview promoFilm={props.film} />;
      case FilmDescriptionTabsNames.DETAILS:
        return <FilmDetails promoFilm={props.film} />;
      case FilmDescriptionTabsNames.REVIEWS:
        return <FilmReviews reviews={props.reviews} />;
      default:
        return ``;
    }
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list" onClick={props.onActiveSectionChange}>
          <li className={`movie-nav__item${props.activeSection === FilmDescriptionTabsNames.OVERVIEW ? ` movie-nav__item--active` : ``}`}>
            <a href="#" className="movie-nav__link"
            >{FilmDescriptionTabsNames.OVERVIEW}</a>
          </li>
          <li className={`movie-nav__item${props.activeSection === FilmDescriptionTabsNames.DETAILS ? ` movie-nav__item--active` : ``}`}>
            <a href="#" className="movie-nav__link"
            >{FilmDescriptionTabsNames.DETAILS}</a>
          </li>
          <li className={`movie-nav__item${props.activeSection === FilmDescriptionTabsNames.REVIEWS ? ` movie-nav__item--active` : ``}`}>
            <a href="#" className="movie-nav__link"
            >{FilmDescriptionTabsNames.REVIEWS}</a>
          </li>
        </ul>
      </nav>

      {getCurrentFilmTab()}
    </div>
  );
};

FilmDescription.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewValidator)),
  activeSection: PropTypes.string.isRequired,
  onActiveSectionChange: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
  currentUrlFilmId: PropTypes.number.isRequired,
};

const mapStateToProps = ({FILMS}) => ({
  reviews: FILMS.reviews.reviews,
  filmId: FILMS.reviews.filmId
});

export {FilmDescription};
export default connect(mapStateToProps)(withFilmDesc(FilmDescription));
