export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  ADD_REVIEW: `/films/:id/review`,
  FILM: `/films`,
  PLAYER: `/player`
};

export const APIRoute = {
  FILMS: `/films`,
  LOGIN: `/login`,
  PROMO_FILM: `/films/promo`,
  REVIEWS: `/comments`,
  FAVORITE: `/favorite`
};

export const HttpCode = {
  UNAUTHORIZED: 401
};

export const FilmRateDescriptions = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
  UNEXPECTED_RATE: `Unexpected rate`
};

export const FilmDescriptionTabsNames = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

export const ALL_GENRE = `All genres`;

export const FavoriteFlags = {
  ADD_TO_FAVORITE: 1,
  REMOVE_FROM_FAVORITE: 0
};
