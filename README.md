# Nazareth Events
A web app for viewing events in Nazareth,
 it's built on top of the [Nazareth Open Tourism Platform](https://nazareth-open-tourism-platform.herokuapp.com/events)

This app's purpose is to help users find what events are happening in Nazareth, where and when.

The app is hosted on heroku, you can view it [here](http://nazareth-events.herokuapp.com/). See the initial prototype [here](http://nav-events.herokuapp.com/home).

## User Stories

- As someone interested in the events happening in Nazareth I would like to able to view these events in a chronological order so I can view them easily.
- As a person visiting Nazareth I would like, to see what events are happening while I'm visiting so I can know which events to attend.
- As an owner of place that hosts events, I would like an efficient way to add my events so people would know about it.

### Outline

#### 2 types of users
  1. Someone looking for events

    * home(/list) page displays a list of all events starting on today.
    * a calendar view would allow the user to select the date from which the calendar view would start.
    * clicking on an event and show details on a new page.

  2. Someone/Some venue hosting an event
    * requires a login.
    * a 'my events' page.
    * a form to add a new event.

### Team
  * Product owner - Liwan restaurant
  * Developer - Mohamed Omari
  * QA - Matt Lubel
  * Scrum master - Shireen Zoaby

### Sprint I goals
  * getting the events into the first page and viewing in a list  
  * clicking on an event would take you to a new page with the event's details
  * a page specific to one place's events, this will be followed by the login

### Sprint II goals
  * calendar view, clicking on the calendar would allow choosing a date to start from
  * add an event to the calendar

### Stack
  * Server side: Express
  * Client side: Vanilla JS
  * DataBase: platform
  * Views engine: Handlebars
  * CSS library: bootstrap
  * Testing: tape, travis CI

### File Structure
* public/
  * css/
    * main.CSS
  * images/  
  * js/
    * main.js
    * list.js
    * calendar.js
* helpers/
    * helpers.js
* routes/
  * home.js
  * event_details.js
  * index.js
* views/
  * layouts/
    * main.hbs
  * partials/
    * header.hbs
    * calendar.hbs
  * home.hbs
  * event_details.hbs  
* server.js
* start.js  
