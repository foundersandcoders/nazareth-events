/* global XMLHttpRequest axios */

import axios from 'axios';

if (document.querySelector('.add-event-form')) {
  // add a new place
  document.getElementById('addPlaceIcon').addEventListener('click', e => {
    document.getElementById('addPlaceContainer').classList.toggle('hide');
    document.getElementById('selectAllPlaces').classList.toggle('hide');
  });

  const handleValidate = (messageBox, message, input, childInputs) => {
    window.location.href = input;
    if (childInputs) {
      const inputParent = document.querySelector(input).children;
      inputParent[0].style = 'border: 0.1rem red solid';
      inputParent[1].style = 'border: 0.1rem red solid';
    } else {
      const container = document.querySelector(input);
      container.style = 'border: 0.1rem red solid';
    }
    document.querySelector(messageBox).textContent = message;
  };

  const validated = (input, messageBox, childInputs) => {
    if (childInputs) {
      const inputParent = document.querySelector(input).children;
      inputParent[0].style = 'border: 0.1rem gray solid';
      inputParent[1].style = 'border: 0.1rem gray solid';
    } else {
      var container = document.querySelector(input);
      container.style = 'border: 0.1rem gray solid';
    }
    document.querySelector(messageBox).textContent = '';
  };

  const validatedLanguage = (input, messageBox, lang) => {
    window.location.href = '#eventName';
    document.querySelector('#eventName').children[input].style =
      'border: 0.1rem red solid';
    const messageBoxElement = document.querySelector(messageBox);
    messageBoxElement.textContent = `Should contain ${lang} characters only`;
    messageBoxElement.style = 'margin-top: 0.5rem;';
  };

  // form event listener
  document
    .querySelector('.add-event-form')
    .addEventListener('submit', event => {
      event.preventDefault();

      const englishChars = /[a-zA-Z0-9]/;
      const arabicChars = /[ا-ي0-9]/;
      const { elements } = event.target;
      const data = {
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
        place_name_ar: elements.place_name_ar.value,
        placeAddressEn: elements.placeAddressEn.value,
        placeAddressAr: elements.placeAddressAr.value,
        placeWebsite: elements.placeWebsite.value,
        placeEmail: elements.placeEmail.value,
        placePhone: elements.placePhone.value
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
      let categoryChecks = 0;
      const checkedCategories = [];
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
        const checkedAccessibility = [];
        for (i in data.accessibilityOptions) {
          if (data.accessibilityOptions[i].checked) {
            checkedAccessibility.push(data.accessibilityOptions[i].value);
          }
        }
        data.accessibilityOptions = checkedAccessibility;
      }

      axios
        .post('/add-event', data)
        .then(res => {
          window.location = res.request.responseURL;
        })
        .catch(err => console.log('err', err));
    });
}
