# nazareth-events
A web app for viewing events in Nazareth,
 it's built on top of the Nazareth Open Tourism Platform

An open platform to facilitate the creation of apps to promote local tourism and business [Nazareth open platform](https://nazareth-open-tourism-platform.herokuapp.com/events)

See the initial [prototype](http://nav-events.herokuapp.com/home).

## outline
 ##### The site will have 2 users(and 2 separate branches).
  1. Someone looking for events

    * home(/list) page displays a list of all events starting on today.
    * a calendar view would allow the user to select the date from which the calendar view would start.
    * clicking on an event and show details on a new page.

  2. Someone/Some venue hosting an event
    * requires a login.
    * a 'my events' page.
    * a form to add a new event.

### Team
  * Product owner - liwan restaurant
  * Developer - Mohamed omari
  * QA - Matt lubes
  * Scrum master - Shireen zoaby

### Sprint goals
  * getting the events into the first page and viewing in a list  
  * clicking on the calendar would allow choosing a date to start from
  * clicking on an event would take you to a new page with the event's details
  * a page specific to one place's events, this will be followed by the login
  * adding an event(only users with a login can do so)

### Stack
  * Server side: Express
  * Client side: Vanilla JS
  * DataBase: platform
  * Views engine: Handlebars
  * CSS library: bootstrap
  * Testing: Tap, travis CI

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
