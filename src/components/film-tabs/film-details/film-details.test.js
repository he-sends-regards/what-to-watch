import React from "react";
import renderer from "react-test-renderer";
import mockPromoFilm from "../../../mocks/promoFilm";
import FilmDetails from "./film-details";

it(`Should FilmDetails render correctly`, () => {
  const tree = renderer
    .create(
        <FilmDetails promoFilm={mockPromoFilm} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
