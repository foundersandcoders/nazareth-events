var addDay = function (dataSet) {
  var plusDay = parseInt(dataSet.date.split('-')[2]) + 1;
  var plusDate = dataSet.date.split('-');
  const actualDateTo = new Date(plusDate[0], plusDate[1], +plusDate[2] + 1);
  return actualDateTo.getFullYear().toString() + '-' + actualDateTo.getMonth().toString() + '-' + actualDateTo.getDate().toString();
};
