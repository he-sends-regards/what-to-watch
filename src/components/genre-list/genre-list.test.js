import React from "react";
import renderer from "react-test-renderer";
import {GenreList} from "./genre-list";
import mockFilms from "../../mocks/films";
import {ALL_GENRE} from "../../const";

it(`Should GenreList render correctly`, () => {
  expect(renderer
    .create(
        <GenreList
          toggleFilterAction={() => {}}
          genres={
            mockFilms
              .reduce((acc, el) => [...acc, el.genre], [])
              .filter((value, index, self) => self.indexOf(value) === index)
          }
          activeGenre={ALL_GENRE}
        />
    )
    .toJSON()
  ).toMatchSnapshot();
});
