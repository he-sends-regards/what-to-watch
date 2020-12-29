import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card";
import mockPromoFilm from "../../mocks/promoFilm";
import browserHistory from "../../browser-history";
import {Router} from "react-router-dom";

const noop = () => {};

it(`Should FilmCard render correctly`, () => {
  expect(renderer.create(
      <Router history={browserHistory}>
        <FilmCard
          onMouseEnter={noop}
          onMouseLeave={noop}
          isActive={false}
          film={mockPromoFilm}
        />
      </Router>
  ).toJSON()).toMatchSnapshot();
});
