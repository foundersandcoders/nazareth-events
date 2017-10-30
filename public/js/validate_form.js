/* global XMLHttpRequest axios */

function handleValidate (messageBox, message, input) {
  var inputParent = document.querySelector(input).children;
  window.location.href = input;
  inputParent[0].style = 'border: 0.1rem red solid';
  inputParent[1].style = 'border: 0.1rem red solid';
  document.querySelector(messageBox).innerHTML = message;
}

function validated (input, messageBox) {
  var inputParent = document.querySelector(input).children;
  inputParent[0].style = 'border: 0.1rem gray solid';
  inputParent[1].style = 'border: 0.1rem gray solid';
  document.querySelector(messageBox).innerHTML = '';
}

function validatedLanguage (input, messageBox, lang) {
  window.location.href = '#eventName';
  document.querySelector('#eventName').children[input].style = 'border: 0.1rem red solid';
  var messageBoxElement = document.querySelector(messageBox);
  messageBoxElement.innerHTML = 'Should contain ' + lang + ' characters only';
  messageBoxElement.style = 'margin-top: 0.5rem;';
}

// form event listener
document.querySelector('.add-event-form').addEventListener('submit', function (event) {
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
    placeId: elements.placeId,
    accessibilityOptions: elements.accessibilityOptions,
    startDate: elements.startDate,
    startTime: elements.startTime,
    endTime: elements.endTime,
    cost: elements.cost,
    imageUrl: elements.imageUrl
  };

  if (!data.nameEn && !data.nameAr) {
    return handleValidate('.msg-box-input', 'Please fill either English or Arabic', '#eventName');
  } else {
    validated('#eventName', '.msg-box-input');
  }

  if (!data.descriptionEn && !data.descriptionAr) {
    return handleValidate('.msg-box-description', 'Please fill either English or Arabic', '#eventDescription');
  } else {
    validated('#eventDescription', '.msg-box-description');
  }

  // check name inputs languages
  if (data.nameEn && !englishChars.test(data.nameEn)) {
    return validatedLanguage(0, '.msg-box-input', 'English');
  } else if (data.nameAr && !arabicChars.test(data.nameAr)) {
    return validatedLanguage(1, '.msg-box-input', 'Arabic');
  } else {
    validated('#eventName', '.msg-box-input');
  }

  if (data.descriptionEn && !englishChars.test(data.descriptionEn)) {
    return validatedLanguage(0, '.msg-box-description', 'English');
  } else if (data.descriptionAr && !arabicChars.test(data.descriptionAr)) {
    return validatedLanguage(1, '.msg-box-description', 'Arabic');
  } else {
    validated('#eventName', '.msg-box-input');
  }

  axios.post('/add-event', data);
});
