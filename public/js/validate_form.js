/* global XMLHttpRequest axios */

// add a new place
document.getElementById('addPlaceIcon').addEventListener('click', function (e) {
  document.getElementById('addPlaceContainer').classList.toggle('hide');
  document.getElementById('selectAllPlaces').classList.toggle('hide');
});

function handleValidate (messageBox, message, input, childInputs) {
  window.location.href = input;
  if (childInputs) {
    var inputParent = document.querySelector(input).children;
    inputParent[0].style = 'border: 0.1rem red solid';
    inputParent[1].style = 'border: 0.1rem red solid';
  } else {
    var container = document.querySelector(input);
    container.style = 'border: 0.1rem red solid';
  }
  document.querySelector(messageBox).innerHTML = message;
}

function validated (input, messageBox, childInputs) {
  if (childInputs) {
    var inputParent = document.querySelector(input).children;
    inputParent[0].style = 'border: 0.1rem gray solid';
    inputParent[1].style = 'border: 0.1rem gray solid';
  } else {
    var container = document.querySelector(input);
    container.style = 'border: 0.1rem gray solid';
  }
  document.querySelector(messageBox).innerHTML = '';
}

function validatedLanguage (input, messageBox, lang) {
  window.location.href = '#eventName';
  document.querySelector('#eventName').children[input].style =
    'border: 0.1rem red solid';
  var messageBoxElement = document.querySelector(messageBox);
  messageBoxElement.innerHTML = 'Should contain ' + lang + ' characters only';
  messageBoxElement.style = 'margin-top: 0.5rem;';
}

// form event listener
document
  .querySelector('.add-event-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    var englishChars = /[a-zA-Z0-9]/;
    var arabicChars = /[ا-ي0-9]/;
    var elements = event.target.elements;
    var data = {
      nameEn: elements.name_english.value,
      nameAr: elements.name_arabic.value,
      descriptionEn: elements.description_en.value,
      descriptionAr: elements.description_ar.value,
      categories: elements.categories,
      placeId: elements.placeId.value,
      accessibilityOptions: elements.accessibilityOptions.value,
      startDate: elements.startDate.value,
      startTime: elements.startTime.value,
      endTime: elements.endTime.value,
      cost: elements.cost.value,
      imageUrl: elements.imageUrl.value,
      place_name_en: elements.place_name_en.value,
      place_name_ar: elements.place_name_ar.value
    };

    if (!data.nameEn && !data.nameAr) {
      return handleValidate(
        '.msg-box-input',
        'Please fill either English or Arabic',
        '#eventName',
        true
      );
    } else {
      validated('#eventName', '.msg-box-input', true);
    }

    if (!data.descriptionEn && !data.descriptionAr) {
      return handleValidate(
        '.msg-box-description',
        'Please fill either English or Arabic',
        '#eventDescription',
        true
      );
    } else {
      validated('#eventDescription', '.msg-box-description', true);
    }

    // check name inputs languages
    if (data.nameEn && !englishChars.test(data.nameEn)) {
      return validatedLanguage(0, '.msg-box-input', 'English');
    } else if (data.nameAr && !arabicChars.test(data.nameAr)) {
      return validatedLanguage(1, '.msg-box-input', 'Arabic');
    } else {
      validated('#eventName', '.msg-box-input', true);
    }

    if (data.descriptionEn && !englishChars.test(data.descriptionEn)) {
      return validatedLanguage(0, '.msg-box-description', 'English');
    } else if (data.descriptionAr && !arabicChars.test(data.descriptionAr)) {
    } else {
      validated('#eventDescription', '.msg-box-input', true);
    }
    var categoryChecks = 0;
    var checkedCategories = [];
    for (var i in data.categories) {
      if (data.categories[i].checked) {
        checkedCategories.push(data.categories[i].value);
        categoryChecks += 1;
      }
    }

    if (categoryChecks === 0) {
      return handleValidate(
        '.msg-box-categories',
        'Choose atleast 1 category from the list',
        '#categoriesBox',
        false
      );
    } else {
      data.categories = checkedCategories;
      validated('#categoriesBox', '.msg-box-categories', false);
    }

    if (!data.placeId) {
      if (!data.place_name_en && !data.place_name_ar) {
        handleValidate(
          '.msg-box-place',
          'Choose or create a place',
          '#placeName',
          true
        );
      } else {
        validated('#placeName', '.msg-box-place', true);
      }
    }

    if (data.accessibilityOptions) {
      var checkedAccessibility = [];
      for (i in data.accessibilityOptions) {
        if (data.accessibilityOptions[i].checked) {
          checkedAccessibility.push(data.accessibilityOptions[i].value);
        }
      }
      data.accessibilityOptions = checkedAccessibility;
    }

    axios.post('/add-event', data).then(function (res) {
      window.location = res.request.responseURL;
    });
  });
