import React from "react";
import renderer from "react-test-renderer";
import FilmDescription from "./film-description";
import mockPromoFilm from "../../mocks/promoFilm";
import mockReviews from "../../mocks/reviews";
import {AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

describe(`Should FilmDescription render correctly`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    FILMS: {
      showFilmsCount: 4,
      reviews: mockReviews
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }
  });

  const filmsListComponent = renderer.create(
      <Provider store={store}>
        <Router history={browserHistory}>
          <FilmDescription
            currentUrlFilmId={1}
            activeGenre={`Crime`}
            showFilmsCount={4}
            film={mockPromoFilm}
          />
        </Router>
      </Provider>
  );
  it(`Should FilmDescriptionComponent render correctly`, () => {
    expect(filmsListComponent.toJSON()).toMatchSnapshot();
  });
});
