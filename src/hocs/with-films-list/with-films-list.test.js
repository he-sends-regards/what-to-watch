import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withFilmsList} from "./with-films-list";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withFilmsList(MockComponent);

it(`WithFilmsList is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped>
      <React.Fragment/>
    </MockComponentWrapped>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
