import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list";
import mockFilms from "../../mocks/films";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import mockAuthInfo from "../../mocks/authData";
import {ALL_GENRE} from "../../const";

describe(`Should MyList render correctly`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    FILMS: {
      favoriteFilms: mockFilms,
      showFilmsCount: 2,
      activeGenre: ALL_GENRE
    },
    USER: {
      authInfo: mockAuthInfo
    }
  });

  const myListComponent = renderer.create(
      <Router history={browserHistory}>
        <Provider store={store}>
          <MyList films={mockFilms} />
        </Provider>
      </Router>
  );
  it(`Should myListComponent render correctly`, () => {
    expect(myListComponent.toJSON()).toMatchSnapshot();
  });
});

