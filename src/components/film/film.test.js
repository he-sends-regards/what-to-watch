import React from "react";
import renderer from "react-test-renderer";
import Film from "./film";
import mockFilms from "../../mocks/films";
import mockReviews from "../../mocks/reviews";
import {AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import mockAuthInfo from "../../mocks/authData";

describe(`Should Film render correctly`, () => {
  const noop = () => {};

  const mockStore = configureStore([]);

  const store = mockStore({
    FILMS: {
      showFilmsCount: 4,
      activeGenre: `Crime`,
      reviews: mockReviews,
      favoriteFilms: mockFilms
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: mockAuthInfo
    }
  });

  const filmsListComponent = renderer.create(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Film
            films={mockFilms}
            addFilmToFavoriteAction={noop}
            filmId={1}
            doesBelongMoreLikeThis={true}
            activeGenre={`Crime`}
            showFilmsCount={4}
          />
        </Router>
      </Provider>
  );
  it(`Should Film render correctly`, () => {
    expect(filmsListComponent.toJSON()).toMatchSnapshot();
  });
});
