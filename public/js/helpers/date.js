const toDateString = date =>
  // + 1 on the month because month is zero-indexed
  `${date.getFullYear()}-${date.getMonth() + 1}- ${date.getDate()}`;

const formatDate = date => {
  const splitDate = date.split('-');
  const newDate = new Date(
    // year
    splitDate[0],
    // month (-1 because zero indexed)
    +splitDate[1] - 1,
    // day
    +splitDate[2] + 365
  );
  return toDateString(newDate);
};

export default formatDate;
