const dateFormat = require('dateformat');

const helpers = module.exports = {};

const sortByStartTime = (event1, event2) => {
  const [t1, t2] = [event1.start_time, event2.start_time];
  return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
};

// converts events from array of event objs into array of objects of form { date, events array }
helpers.formatEvents = events => {
  // eventsObj is of the form {date: event, date: event, etc.}
  const eventsObj = events.reduce((eventsObj, event) => {
    const eventDateRep = dateFormat(event.date, 'yyyy-mm-dd');
    return Object.assign(eventsObj, {
      [eventDateRep]:
      eventsObj[eventDateRep]
        ? eventsObj[eventDateRep].concat(event)
        : [event]
    });
  }, {});

  return Object.keys(eventsObj).sort().map(date => ({
    date: date,
    events: eventsObj[date].sort(sortByStartTime)
  }));
};

// can take as input a date or a date string in certain formats (e.g. yyyy-mm-dd)
helpers.addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
