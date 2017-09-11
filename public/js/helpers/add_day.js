var addDay = function (dataSet) {
  console.log(addDay);
  var plusDay = parseInt(dataSet.date.split('-')[2]) + 1;
  var plusDate = dataSet.date.split('-');
  plusDate.pop();
  plusDate.push(plusDay.toString());
  return plusDate;
};
