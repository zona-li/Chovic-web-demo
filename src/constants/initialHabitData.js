const date = new Date();
const year = date.getFullYear();
export const yearlyTrackingData = {
  0: Array(new Date(year, 1, 0).getDate())
    .fill()
    .map(() => 0),
  1: Array(new Date(year, 2, 0).getDate())
    .fill()
    .map(() => 0),
  2: Array(new Date(year, 3, 0).getDate())
    .fill()
    .map(() => 0),
  3: Array(new Date(year, 4, 0).getDate())
    .fill()
    .map(() => 0),
  4: Array(new Date(year, 5, 0).getDate())
    .fill()
    .map(() => 0),
  5: Array(new Date(year, 6, 0).getDate())
    .fill()
    .map(() => 0),
  6: Array(new Date(year, 7, 0).getDate())
    .fill()
    .map(() => 0),
  7: Array(new Date(year, 8, 0).getDate())
    .fill()
    .map(() => 0),
  8: Array(new Date(year, 9, 0).getDate())
    .fill()
    .map(() => 0),
  9: Array(new Date(year, 10, 0).getDate())
    .fill()
    .map(() => 0),
  10: Array(new Date(year, 11, 0).getDate())
    .fill()
    .map(() => 0),
  11: Array(new Date(year, 12, 0).getDate())
    .fill()
    .map(() => 0),
};
