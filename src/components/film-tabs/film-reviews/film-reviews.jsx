import React from "react";
import PropTypes from "prop-types";
import {reviewValidator} from "../../../propsValidators/validators.prop";

const FilmReviews = ({reviews}) => {
  return (
    <React.Fragment>
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviews.slice(0, Math.floor(reviews.length / 2)).map((review, i) => {
            return (
              <div className="review" key={`review-${i}`}>
                <blockquote className="review__quote">
                  <p className="review__text">
                    {review.reviewText}
                  </p>

                  <footer className="review__details">
                    <cite className="review__author">
                      {review.reviewer}
                    </cite>
                    <span className="review__date">{review.date}</span>
                  </footer>
                </blockquote>

                <div className="review__rating">
                  {review.rate}
                </div>
              </div>
            );
          })}
        </div>
        <div className="movie-card__reviews-col">
          {reviews.slice(Math.floor(reviews.length / 2)).map((review, i) => {
            return (
              <div className="review" key={`review-${i}`}>
                <blockquote className="review__quote">
                  <p className="review__text">
                    {review.reviewText}
                  </p>

                  <footer className="review__details">
                    <cite className="review__author">
                      {review.reviewer}
                    </cite>
                    <span className="review__date">{review.date}</span>
                  </footer>
                </blockquote>

                <div className="review__rating">
                  {review.rate}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

FilmReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewValidator))
};

export default FilmReviews;
