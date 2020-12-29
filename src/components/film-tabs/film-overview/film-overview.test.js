import React from "react";
import renderer from "react-test-renderer";
import mockPromoFilm from "../../../mocks/promoFilm";
import FilmOverview from "./film-overview";

it(`Should FilmOverview render correctly`, () => {
  const tree = renderer
    .create(
        <FilmOverview promoFilm={mockPromoFilm} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
