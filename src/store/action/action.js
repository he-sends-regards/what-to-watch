export const ActionType = {
  TOGGLE_GENRE_FILTER: `TOGGLE_GENRE_FILTER`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_AUTH_INFO: `LOAD_AUTH_INFO`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  LOAD_FAVORITES: `LOAD_FAVORITES`
};

export const showMoreFilms = () => ({
  type: ActionType.SHOW_MORE_FILMS,
  payload: 8
});

export const toggleFilter = (choosedGenre) => ({
  type: ActionType.TOGGLE_GENRE_FILTER,
  payload: choosedGenre
});

export const loadFilms = (films) => ({
  type: ActionType.LOAD_FILMS,
  payload: films
});

export const loadFavorites = (films) => ({
  type: ActionType.LOAD_FAVORITES,
  payload: films
});

export const loadPromoFilm = (film) => ({
  type: ActionType.LOAD_PROMO_FILM,
  payload: film
});

export const loadReviews = (reviews, filmId) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: {reviews, filmId}
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const loadAuthInfo = (authInfo) => ({
  type: ActionType.LOAD_AUTH_INFO,
  payload: authInfo,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});
