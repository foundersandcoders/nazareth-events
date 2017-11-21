var toDateString = function (date) {
  // + 1 on the month because month is zero-indexed
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};

var formatDate = function (date) {
  var splitDate = date.split('-');
  var newDate = new Date(
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
