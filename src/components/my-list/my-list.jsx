import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list";
import {filmValidator} from "../../propsValidators/validators.prop";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {connect} from "react-redux";
import store from "../../store/store";
import {getFavoriteFilms} from "../../store/api-actions";

const MyList = (props) => {
  React.useEffect(() => {
    store.dispatch(getFavoriteFilms());
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <Link to={AppRoute.MY_LIST}>
              <img src={props.authInfo.avatar_url} alt="User avatar" width="63" height="63" />
            </Link>
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={props.films} doesBelongMoreLikeThis={false} />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

MyList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator)),
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({FILMS, USER}) => ({
  films: FILMS.favoriteFilms,
  authInfo: USER.authInfo
});

export {MyList};
export default connect(mapStateToProps)(MyList);
