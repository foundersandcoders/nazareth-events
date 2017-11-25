/* global dateArray */

const Cal = function(divId) {
  this.divId = divId;

  // Days of week, starting on Sunday
  this.DaysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Months, stating on January
  this.Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Set the current month, year
  const currentDate = new Date();

  this.currMonth = currentDate.getMonth();
  this.currYear = currentDate.getFullYear();
  this.currDay = currentDate.getDate();
};

// Goes to next month
Cal.prototype.nextMonth = function(res) {
  if (this.currMonth === 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.render(res);
};

// Goes to previous month
Cal.prototype.previousMonth = function(res) {
  if (this.currMonth === 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.render(res);
};

// Show current month
Cal.prototype.render = function(res) {
  return this.showMonth(this.currYear, this.currMonth, res);
};

// Show month (year, month)
Cal.prototype.showMonth = function(year, month, dateArray) {
  // First day of the week in the selected month
  this.firstDayOfMonth = new Date(year, month, 1).getDay();
  // Last day of the selected month
  this.lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  // Last day of the previous month
  this.lastDayOfLastMonth =
    month === 0
      ? new Date(year - 1, 11, 0).getDate()
      : new Date(year, month, 0).getDate();

  var html = '<table>';

  // Write selected month and year
  document.getElementById('cal-month').innerHTML = `${this.Months[month]} ${
    year
  }`;

  // Write the header of the days of the week
  html += '<tr>';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    html += '<th>' + this.DaysOfWeek[i] + '</th>';
  }
  html += '</tr>';

  // Write the days
  i = 1;
  do {
    const dateObj = new Date(year, month, i);

    let dow = dateObj.getDay();

    // deal with the 0 indexing of month here
    const dstring = `${year}-${month + 1}-${i}`;

    // If Sunday, start new row
    if (dow === 0) {
      html += '<tr>';

      // If not Sunday but first day of the month
      // it will write the last days from the previous month
    } else if (i === 1) {
      html += '<tr>';
      var k = this.lastDayOfLastMonth - this.firstDayOfMonth + 1;
      for (var j = 0; j < this.firstDayOfMonth; j++) {
        html += `<td data-date=
          ${dstring}
          class="day not-current-month">
          ${k}
          </td>`;
        k++;
      }
    }

    // Write the current day in the loop
    const chk = new Date();
    const chkY = chk.getFullYear();
    const chkM = chk.getMonth();
    if (
      chkY === this.currYear &&
      chkM === this.currMonth &&
      i === this.currDay
    ) {
      html += '<td data-date=' + dstring + ' class="day today">' + i + '</td>';
    } else {
      var currentDate = new Date(this.currYear, this.currMonth, i);
      for (var h = 0; h < dateArray.length; h++) {
        var check = false;

        if (
          new Date(dateArray[h]).setHours(0, 0, 0, 0) ===
          currentDate.setHours(0, 0, 0, 0)
        ) {
          check = true;
          html +=
            '<td data-date=' +
            dstring +
            ' class="day normal event-found">' +
            i +
            '</td>';
          break;
        } else if (h === dateArray.length - 1 && !check) {
          html +=
            '<td data-date=' + dstring + ' class="day normal">' + i + '</td>';
        }
      }
    }
    // If Saturday, closes the row
    if (dow === 6) {
      html += '</tr>';
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
    } else if (i === this.lastDateOfMonth) {
      k = 1;
      for (dow; dow < 6; dow++) {
        html +=
          '<td data-date=' +
          dstring +
          ' class="day not-current-month">' +
          k +
          '</td>';
        k++;
      }
    }

    i++;
  } while (i <= this.lastDateOfMonth);

  // Closes table
  html += '</table>';

  // Write HTML to the div
  document.getElementById(this.divId).innerHTML = html;
};

export default Cal;
