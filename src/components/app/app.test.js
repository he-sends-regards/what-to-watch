import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import configureStore from "redux-mock-store";
import mockAuthInfo from "../../mocks/authData";
import {ALL_GENRE} from "../../const";

import mockFilms from "../../mocks/films";
import mockPromoFilm from "../../mocks/promoFilm";
import mockReviews from "../../mocks/reviews";

import {AuthorizationStatus} from "../../const";
import {Provider} from "react-redux";

describe(`Should App render correctly`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    FILMS: {
      films: mockFilms,
      promoFilm: mockPromoFilm,
      activeGenre: ALL_GENRE,
      favoriteFilms: mockFilms,
      reviews: mockReviews,
      showFilmsCount: 4
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: mockAuthInfo
    }
  });

  const appComponent = renderer.create(
      <Provider store={store}>
        <App/>
      </Provider>
  );
  it(`Should App render correctly`, () => {
    expect(appComponent.toJSON()).toMatchSnapshot();
  });
});
