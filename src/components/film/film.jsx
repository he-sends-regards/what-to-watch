import React from "react";
import {Link, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list";
import {filmValidator} from "../../propsValidators/validators.prop";
import Footer from "../footer/footer";
import FilmDescription from "../film-description/film-description";
import {AppRoute, AuthorizationStatus, FavoriteFlags} from "../../const";
import {connect} from "react-redux";
import {getFavoriteFilms, postFilmIsFavoriteFlag} from "../../store/api-actions";
import browserHistory from "../../browser-history";

const Film = (props) => {
  const currentUrlFilmId = props.filmId || Number(useParams().id);
  const film = props.films.filter((filmEl) => filmEl.id === currentUrlFilmId)[0];

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.background.src} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {
                props.authorizationStatus === AuthorizationStatus.AUTH
                  ? <div className="user-block__avatar">
                    <Link to={AppRoute.MY_LIST}>
                      <img src={props.authInfo.avatar_url} alt="User avatar" width="63" height="63" />
                    </Link>
                  </div>
                  : <Link className="user-block__link" style={{textDecoration: `none`, color: `inherit`, borderRadius: 0}} to={AppRoute.LOGIN}>Sign In</Link>
              }
            </div>

          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <Link to={`${AppRoute.PLAYER}/${film.id}`} style={{textDecoration: `none`, color: `inherit`}}>
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
                        if (props.favoriteFilmsIds.includes(film.id)) {
                          props.addFilmToFavoriteAction(film.id, FavoriteFlags.REMOVE_FROM_FAVORITE);
                        } else {
                          props.addFilmToFavoriteAction(film.id, FavoriteFlags.ADD_TO_FAVORITE);
                        }
                      } else {
                        browserHistory.push(AppRoute.LOGIN);
                      }
                    }
                  }
                >
                  {
                    props.favoriteFilmsIds.includes(film.id)
                      ? <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      : <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                  }
                  <span>My list</span>
                </button>
                {
                  props.authorizationStatus === AuthorizationStatus.AUTH && <Link to={`${AppRoute.FILM}/${currentUrlFilmId}/review`} className="btn movie-card__button">Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.poster.src} alt={`${film.title} poster`} width="218" height="327" />
            </div>

            <FilmDescription {...props} film={film} currentUrlFilmId={currentUrlFilmId} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList doesBelongMoreLikeThis={true} currentFilmGenre={film.genre} currentFilmId={currentUrlFilmId} films={props.films} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Film.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator)),
  addFilmToFavoriteAction: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  filmId: PropTypes.number.isRequired,
  favoriteFilmsIds: PropTypes.array.isRequired,
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({FILMS, USER}) => ({
  authorizationStatus: USER.authorizationStatus,
  favoriteFilmsIds: FILMS.favoriteFilms.reduce((acc, el) => [...acc, el.id], []),
  authInfo: USER.authInfo
});

const mapDispatchToProps = (dispatch) => ({
  addFilmToFavoriteAction: (filmId, flag) => {
    dispatch(postFilmIsFavoriteFlag(filmId, flag));
    dispatch(getFavoriteFilms());
  }
});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);
