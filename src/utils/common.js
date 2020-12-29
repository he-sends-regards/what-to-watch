export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (arr) => {
  return arr[Math.floor(Math.random() * Math.floor(arr.length - 1))];
};

export const extend = (a, b) => Object.assign({}, a, b);
