import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list";
import Header from "../header/header";
import Footer from "../footer/footer";
import GenreList from "../genre-list/genre-list";
import ShowMoreBtn from "../show-more-btn/show-more-btn";
import {filmValidator} from "../../propsValidators/validators.prop";
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus, FavoriteFlags} from "../../const";
import {connect} from "react-redux";
import {getFavoriteFilms, postFilmIsFavoriteFlag} from "../../store/api-actions";
import browserHistory from "../../browser-history";

const Main = (props) => {
  const {promoFilm} = props;
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm.background.src} alt={promoFilm.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.poster.src} alt={`${promoFilm.title} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <Link to={`${AppRoute.PLAYER}/${promoFilm.id}`} style={{textDecoration: `none`, color: `inherit`}}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                </button>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={
                    () => {
                      if (props.authorizationStatus === AuthorizationStatus.AUTH) {
                        if (props.favoriteFilmsIds.includes(promoFilm.id)) {
                          props.addFilmToFavoriteAction(promoFilm.id, FavoriteFlags.REMOVE_FROM_FAVORITE);
                        } else {
                          props.addFilmToFavoriteAction(promoFilm.id, FavoriteFlags.ADD_TO_FAVORITE);
                        }
                      } else {
                        browserHistory.push(AppRoute.LOGIN);
                      }
                    }
                  }
                >
                  {
                    props.favoriteFilmsIds.includes(promoFilm.id)
                      ? <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      : <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                  }
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <FilmsList films={props.films} doesBelongMoreLikeThis={false} />

          <ShowMoreBtn />
        </section>

        <Footer />
      </div>
    </React.Fragment>

  );
};

Main.propTypes = {
  promoFilm: PropTypes.shape(filmValidator),
  addFilmToFavoriteAction: PropTypes.func.isRequired,
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator)),
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  favoriteFilmsIds: PropTypes.array.isRequired,
};

const mapStateToProps = ({FILMS, USER}) => ({
  promoFilm: FILMS.promoFilm,
  films: FILMS.films,
  authorizationStatus: USER.authorizationStatus,
  favoriteFilmsIds: FILMS.favoriteFilms.reduce((acc, el) => [...acc, el.id], [])
});

const mapDispatchToProps = (dispatch) => ({
  addFilmToFavoriteAction: (filmId, flag) => {
    dispatch(postFilmIsFavoriteFlag(filmId, flag));
    dispatch(getFavoriteFilms());
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
