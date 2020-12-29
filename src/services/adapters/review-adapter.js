import {extend} from "../../utils/common";

export const adaptReviewFromServer = (review) => extend(review, {
  id: review.id,
  reviewText: review.comment,
  rate: review.rating,
  reviewer: review.user.name,
  date: `${new Date(review.date).toLocaleString(`en`, {month: `long`})} ${new Date(review.date).getDate()}, ${new Date(review.date).getFullYear()}`
});
