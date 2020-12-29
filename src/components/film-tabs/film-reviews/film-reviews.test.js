import React from "react";
import renderer from "react-test-renderer";
import mockReviews from "../../../mocks/reviews";
import FilmReviews from "./film-reviews";

it(`Should FilmReviews render correctly`, () => {
  const tree = renderer
    .create(
        <FilmReviews reviews={mockReviews} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
