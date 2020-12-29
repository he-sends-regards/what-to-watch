import React from "react";
import renderer from "react-test-renderer";
import Player from "./player";

import mockFilms from "../../mocks/films";

it(`Player snapshot test`, () => {
  const tree = renderer
    .create(<Player films={mockFilms} filmId={1} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
