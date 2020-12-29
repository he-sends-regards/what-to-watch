import {
  showMoreFilms,
  toggleFilter,
  loadFilms,
  loadFavorites,
  loadPromoFilm,
  loadReviews,
  requireAuthorization,
  redirectToRoute,
  loadAuthInfo,
  ActionType,
} from "./action";

import mockFilms from "../../mocks/films";
import mockReviews from "../../mocks/reviews";
import mockPromoFilm from "../../mocks/promoFilm";
import {ALL_GENRE, AppRoute, AuthorizationStatus} from "../../const";
import mockAuthData from "../../mocks/authData";

describe(`Action creators work correctly`, () => {
  it(`Action creator for showing more films by click on btn`, () => {
    expect(showMoreFilms()).toEqual({
      type: ActionType.SHOW_MORE_FILMS,
      payload: 8
    });
  });

  it(`Action creator for adding film to favorites`, () => {
    expect(loadFavorites(mockFilms)).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: mockFilms
    });
  });

  it(`Action creator for toggling genre filter`, () => {
    expect(toggleFilter(ALL_GENRE)).toEqual({
      type: ActionType.TOGGLE_GENRE_FILTER,
      payload: ALL_GENRE
    });
  });

  it(`Action creator for loading films`, () => {
    expect(loadFilms(mockFilms)).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: mockFilms
    });
  });

  it(`Action creator for loading promo film`, () => {
    expect(loadPromoFilm(mockPromoFilm)).toEqual({
      type: ActionType.LOAD_PROMO_FILM,
      payload: mockPromoFilm
    });
  });

  it(`Action creator for loading reviews`, () => {
    expect(loadReviews(mockReviews, 1)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: {reviews: mockReviews, filmId: 1}
    });
  });

  it(`Action creator for requiring authorization`, () => {
    expect(requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });

  it(`Action creator for redirecting to route`, () => {
    expect(redirectToRoute(AppRoute.ROOT)).toEqual({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: AppRoute.ROOT
    });
  });

  it(`Action creator for loading auth info`, () => {
    expect(loadAuthInfo(mockAuthData)).toEqual({
      type: ActionType.LOAD_AUTH_INFO,
      payload: mockAuthData
    });
  });
});
