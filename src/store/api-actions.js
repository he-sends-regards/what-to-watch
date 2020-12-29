import {loadFilms, requireAuthorization, redirectToRoute, loadPromoFilm, loadReviews, loadFavorites, loadAuthInfo} from "./action/action.js";
import {AuthorizationStatus, APIRoute, AppRoute} from "../const";
import {adaptFilmFromServer} from "../services/adapters/films-adapter";
import {adaptReviewFromServer} from "../services/adapters/review-adapter";
import {HttpCode} from "../const";

export const fetchFilmsList = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.FILMS)
    .then(({data}) => data.map(adaptFilmFromServer))
    .then((adaptedData) => loadFilms(adaptedData))
    .then((filmsAction) => dispatch(filmsAction))
    .catch((err) => {
      throw new Error(`Error ${err.response.status}`);
    });
};

export const fetchPromoFilm = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.PROMO_FILM)
    .then(({data}) => adaptFilmFromServer(data))
    .then((adaptedData) => loadPromoFilm(adaptedData))
    .then(dispatch)
    .catch((err) => {
      throw new Error(`Error ${err.response.status}`);
    });
};

export const fetchReviews = (id) => (dispatch, _getState, api) => {
  return api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => data.map(adaptReviewFromServer))
    .then((adaptedData) => loadReviews(adaptedData, id))
    .then((reviewsAction) => dispatch(reviewsAction))
    .catch((err) => {
      throw new Error(`Error ${err.response.status}`);
    });
};

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => {
      if (err.response.status === HttpCode.UNAUTHORIZED) {
        dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
      } else {
        throw new Error(`Error ${err.response.status}`);
      }
    });
};

export const loadAuthData = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN)
    .then(({data}) => dispatch(loadAuthInfo(data)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
    .catch((err) => {
      if (err.response.status === HttpCode.UNAUTHORIZED) {
        dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
      } else {
        throw new Error(`Error ${err.response.status}`);
      }
    });
};

export const postFilmIsFavoriteFlag = (filmId, flag) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.FAVORITE}/${filmId}/${flag}`)
    .catch((err) => {
      throw new Error(`Error ${err.response.status}`);
    });
};

export const getFavoriteFilms = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => data.map(adaptFilmFromServer))
    .then((adaptedData) => loadFavorites(adaptedData))
    .then((favoritesAction) => dispatch(favoritesAction));
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => {
  return api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => {
      throw new Error(`Error ${err.response.status}`);
    });
};

export const postReview = ({rating, comment, date}, id) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.REVIEWS}/${id}`, {rating, comment, date})
    .then(() => dispatch(redirectToRoute(`${AppRoute.FILM}/${id}`)))
    .catch((err) => {
      throw new Error(`Error ${err.response.status}`);
    });
};

