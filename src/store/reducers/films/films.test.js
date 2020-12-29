import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../../services/api";
import {filmsReducer, initialState as filmsReducerInitialState} from "./films";
import {ActionType} from "../../action/action";
import {fetchFilmsList, fetchPromoFilm, fetchReviews, getFavoriteFilms, login, postReview, postFilmIsFavoriteFlag} from "../../api-actions";
import {ALL_GENRE, APIRoute, AppRoute, AuthorizationStatus} from "../../../const";
import mockFilms from "../../../mocks/films";
import mockReviews from "../../../mocks/reviews";
import mockFilmsFromServer from "../../../mocks/filmsFromServer";
import mockPromoFilm from "../../../mocks/promoFilm";
import promoFilm from "../../../mocks/promoFilm";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(filmsReducer(void 0, {})).toEqual(filmsReducerInitialState);
});

describe(`Reducer should update when films/film/reviews have been loaded`, () => {
  it(`Reducer should update films by load films`, () => {
    expect(filmsReducer({
      films: [],
      showFilmsCount: 0
    }, {
      type: ActionType.LOAD_FILMS,
      payload: mockFilms,
    })).toEqual({
      films: mockFilms,
      showFilmsCount: mockFilms.length
    });
  });

  it(`Reducer should update promoFilm by load promo film`, () => {
    expect(filmsReducer({
      promoFilm: null
    }, {
      type: ActionType.LOAD_PROMO_FILM,
      payload: mockPromoFilm,
    })).toEqual({
      promoFilm: mockPromoFilm,
    });
  });

  it(`Reducer should update favoriteFilms by load favorite films`, () => {
    expect(filmsReducer({
      favoriteFilms: []
    }, {
      type: ActionType.LOAD_FAVORITES,
      payload: mockFilms
    })).toEqual({
      favoriteFilms: mockFilms
    });
  });

  it(`Reducer should update showFilmsCount by showMoreBtn click`, () => {
    expect(filmsReducer({
      showFilmsCount: 0,
      films: mockFilms
    }, {
      type: ActionType.SHOW_MORE_FILMS,
      payload: 8
    })).toEqual({
      showFilmsCount: mockFilms.length < 8 ? mockFilms.length : 8,
      films: mockFilms
    });
  });

  const genreToFilterByIt = `Crime`;
  const filteredMockFilms = mockFilms.filter((film) => film.genre === genreToFilterByIt);

  it(`Reducer should update films, activeGenre, and showFilmsCount when genre filter has been toggled`, () => {
    expect(filmsReducer({
      showFilmsCount: 8,
      activeGenre: ALL_GENRE,
      films: mockFilms
    }, {
      type: ActionType.TOGGLE_GENRE_FILTER,
      payload: genreToFilterByIt
    })).toEqual({
      activeGenre: genreToFilterByIt,
      showFilmsCount: filteredMockFilms.length < 8 ? filteredMockFilms.length : 8,
      films: mockFilms
    });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = fetchFilmsList();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, mockFilmsFromServer);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: mockFilms,
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = fetchPromoFilm();

    apiMock
      .onGet(APIRoute.PROMO_FILM)
      .reply(200, mockFilmsFromServer[0]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: promoFilm,
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteFilmsLoader = getFavoriteFilms();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, mockFilmsFromServer);

    return favoriteFilmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: mockFilms,
        });
      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {login: `test@test.ru`, password: `123456`};
    const loginPostLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return loginPostLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeComment = {
      rating: 8,
      comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`
    };
    const reviewPostLoader = postReview(fakeComment, 1);

    apiMock
      .onPost(`${APIRoute.REVIEWS}/1`)
      .reply(200, [{fake: true}]);

    return reviewPostLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `${AppRoute.FILM}/${1}`,
        });
      });
  });

  it(`Should make a correct API post to /favorite/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritePostLoader = postFilmIsFavoriteFlag(1, 1);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${1}/1`)
      .reply(200, mockPromoFilm);

    return favoritePostLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
      });
  });

  it(`Should make a correct API call to /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = fetchReviews(2);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/2`)
      .reply(200, [mockReviews[1]]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: {reviews: [mockReviews[1]], filmId: 2},
        });
      });
  });
});
