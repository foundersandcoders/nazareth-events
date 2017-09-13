var addDay = function (dataSet) {
  console.log(addDay);
  var plusDay = parseInt(dataSet.date.split('-')[2]) + 1;
  var plusDate = dataSet.date.split('-');
  plusDate.pop();
  plusDate.push(plusDay.toString());
  const actualDateTo = new Date(plusDate[0], plusDate[1], plusDate[2]);
  return actualDateTo.getFullYear().toString() + '-' + actualDateTo.getMonth().toString() + '-' + actualDateTo.getDate().toString();
};
