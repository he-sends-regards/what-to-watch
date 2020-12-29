import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import browserHistory from "../../browser-history";
import {AuthorizationStatus} from "../../const";
import {Login} from "./login";

describe(`Should Login render correctly`, () => {
  it(`Should Login render correctly with no-auth status`, () => {
    const tree = renderer
      .create(
          <Router history={browserHistory}>
            <Login onSubmit={() => {}} authorizationStatus={AuthorizationStatus.NO_AUTH} />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should Login render correctly with auth status`, () => {
    const tree = renderer
    .create(
        <Router history={browserHistory}>
          <Login onSubmit={() => {}} authorizationStatus={AuthorizationStatus.AUTH} />
        </Router>
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
