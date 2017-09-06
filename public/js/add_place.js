// add a new place
document.getElementById('addPlaceBtn').addEventListener('click', function (e) {
  document.getElementById('addPlaceContainer').classList.toggle('show');
  document.getElementById('selectAllPlaces').classList.toggle('hide');
  document.getElementById('searchPlace').classList.toggle('hide');
});
