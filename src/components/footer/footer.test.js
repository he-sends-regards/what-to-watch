import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import browserHistory from "../../browser-history";
import Footer from "./footer";

it(`Should Footer render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={browserHistory}>
          <Footer />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
