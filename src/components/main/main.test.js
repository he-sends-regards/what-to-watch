import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import configureStore from "redux-mock-store";
import mockAuthInfo from "../../mocks/authData";

import mockFilms from "../../mocks/films";
import mockPromoFilm from "../../mocks/promoFilm";
import {Provider} from "react-redux";
import {ALL_GENRE, AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";

describe(``, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    FILMS: {
      films: mockFilms,
      promoFilm: mockPromoFilm,
      activeGenre: ALL_GENRE,
      favoriteFilms: mockFilms,
      showFilmsCount: 0
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: mockAuthInfo
    }
  });

  const mainComponent = renderer.create(
      <Router history={browserHistory}>
        <Provider store={store}>

          <Main/>
        </Provider>
      </Router>
  );

  it(`Should Main render correctly`, () => {
    expect(mainComponent.toJSON()).toMatchSnapshot();
  });
});
