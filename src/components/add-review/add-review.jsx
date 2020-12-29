import React from "react";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";
import {filmValidator} from "../../propsValidators/validators.prop";
import {postReview} from "../../store/api-actions";
import {connect} from "react-redux";
import browserHistory from "../../browser-history";
import {AppRoute, AuthorizationStatus} from "../../const";

const AddReview = (props) => {
  const {films, onSubmitAction, filmId, authorizationStatus} = props;
  const id = filmId || useParams().id;

  const film = films.filter((el) => {
    return el.id === Number(id);
  })[0];

  const formRef = React.createRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(formRef.current);
    if (formData.get(`review-text`).length === 0) {
      return;
    }

    onSubmitAction({
      rating: Number(formData.get(`rating`)),
      comment: formData.get(`review-text`)
    }, id);
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
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

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a onClick={browserHistory.goBack} style={{cursor: `pointer`}} className="breadcrumbs__link">{film.title}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">

            {
              authorizationStatus === AuthorizationStatus.AUTH
                ? <div className="user-block__avatar">
                  <Link to={AppRoute.MY_LIST}>
                    <img src={props.authInfo.avatar_url} alt="User avatar" width="63" height="63" />
                  </Link>
                </div>
                : <Link className="user-block__link" style={{textDecoration: `none`, color: `inherit`, borderRadius: 0}} to={AppRoute.LOGIN}>Sign In</Link>
            }
          </div>

        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.poster.src} alt={`${film.title} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleSubmit} ref={formRef}>
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength="50"
              maxLength="400"
              required="required" />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReview.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator)),
  onSubmitAction: PropTypes.func.isRequired,
  filmId: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({FILMS, USER}) => ({
  films: FILMS.films,
  authorizationStatus: USER.authorizationStatus,
  authInfo: USER.authInfo
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitAction(reviewData, filmId) {
    dispatch(postReview(reviewData, filmId));
  }
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
