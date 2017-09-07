// add a new place
document.getElementById('addPlaceIcon').addEventListener('click', function (e) {
  document.getElementById('addPlaceContainer').classList.toggle('show');
  document.getElementById('selectAllPlaces').classList.toggle('hide');
  document.getElementById('searchPlace').classList.toggle('hide');
});

// search places
var input = document.getElementById('searchPlace');
input.addEventListener('keyup', function (e) {
  var inputVal = input.value.trim().toUpperCase();
  var list = document.querySelectorAll('.placesList');
  var listOptions = [].slice.call(list).map(option => {
    return option.textContent;
  });

  var copyOption = document.getElementById('option-list-container');
  copyOption.innerHTML = '';

  // create new ul
  var resultsList = document.createElement('ul');
  resultsList.id = 'word-list';

  // create elements and add words
  var arr = listOptions.filter(function (item) {
    if (inputVal === '') {
      return;
    }
    return item.startsWith(inputVal);
  });
  arr.forEach(function (item) {
    var listItem = document.createElement('li');
    listItem.innerHTML = item;
    resultsList.appendChild(listItem);
  });

  copyOption.appendChild(resultsList);
});
