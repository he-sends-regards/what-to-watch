import PropTypes from "prop-types";

export const filmValidator = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  ratings: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.string.isRequired,
  poster: PropTypes.objectOf(PropTypes.string),
  background: PropTypes.objectOf(PropTypes.string),
  video: PropTypes.objectOf(PropTypes.string),
};

export const reviewValidator = {
  reviewText: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  reviewer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
