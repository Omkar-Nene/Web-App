var EventModel = require('../models/connection');
listOfEvents = [
  {
  eventId:500,
  eventName:'Smokin Cue - APA 9-ball Tournament',
  eventType: 'Recreation Events',
  details: 'Visit the Smokin Cue pool parlour to witness the epic 9 ball pool tournament featuring Skylar Woodward, Joshua Filler, Jayson Shaw and many more top notch players of the pool world as they clash for the title and cash prize of 10000$',
  dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
  host: 'Jake Peralta',
  location: 'Smokin Cue University City Blvd',
  eventImage: '/assets/images/9_ball.png'
},
  {
    eventId:501,
    eventName:'Top Golf 25th Anniversary Event',
    eventType: 'Recreation Events',
    details: 'Celebrating the 25th Anniversary of TopGolf with a Bang and lot of surprises',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Amy Santiago',
    location: 'Top Golf - South Charlotte',
    eventImage: '/assets/images/topgolf.png'
  },
  {
    eventId:502,
    eventName:'Get Some Guns - Shooting Range Special Event',
    eventType: 'Recreation Events',
    details: 'Learn to shoot from the pros as the US Army and Navy join us for a fun day',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Terrance Jeffords',
    location: 'GSG - Ballyntine',
    eventImage: '/assets/images/GSG.png'
  },
  {
    eventId:503,
    eventName:'NASCAR Champions',
    eventType: 'Informative Events',
    details: 'Know about the NASCAR history & NASCAR Champions share their stories of success - Dont miss it',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Charles Boyle',
    location: 'NASCAR Stadium Uptown Charlotte',
    eventImage: '/assets/images/NASCAR.png'
  },
  {
    eventId:504,
    eventName:'Hudson River Hero at Carolinas Aviation Museum',
    eventType: 'Informative Events',
    details: 'Join us to watch the Hudson River disaster hero share his story and also the aircraft of the Hudson River incident is on display',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Raymond Holt',
    location: 'Charlotte Museum - Uptwon Charlotte',
    eventImage: '/assets/images/sullySullenburger.jpg'
  },
  {
    eventId:505,
    eventName:'Sealife Center Charlotte - Special Event',
    eventType: 'Informative Events',
    details: 'Come visit us to watch the pride of antarctica - penguins, learn about them and their habitat',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Rosa Diaz',
    location: 'Sealife Center - Gastonia',
    eventImage: '/assets/images/SealifeCenter.jpg'
  },
  {
    eventId:506,
    eventName:'The Big Game',
    eventType: 'Volunteering Events',
    details: 'Volunteers needed for Management at Bank of America Stadium for Carolina Panthers game',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Scully',
    location: 'BofA Stadium - Uptown Charlotte',
    eventImage: '/assets/images/cp.jpg'
  },
  {
    eventId:507,
    eventName:'Atrium Health - Blood Drive',
    eventType: 'Volunteering Events',
    details: 'Volunteers needed for a huge blood drive at Atrium Health Hospital',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Gina Lennetti',
    location: 'Atrium Health - North Tryon Street',
    eventImage: '/assets/images/blood_drive.jpg'
  },
  {
    eventId:508,
    eventName:'Volunteers at the Niner Nation',
    eventType: 'Volunteering Events',
    details: 'Volunteers needed at UNC Charlotte for International Student Orientation',
    dateTime:'Saturday, 21st September, 2019 5:30 pm onwards',
    host: 'Hitchman',
    location: 'UNC Charlotte',
    eventImage: '/assets/images/NN.jpg'
  }
]


module.exports.eventTypes = function (){
  var eventTypes = ["Recreation Events", "Informative Events", "Volunteering Events"];
  return eventTypes;
};

module.exports.getAllEvents = function(){

  allEvents = [];
  for (let i = 0; i < listOfEvents.length; i++){
    eventDBList = EventModel.event(listOfEvents[i].eventId,
                              listOfEvents[i].eventName,
                              listOfEvents[i].eventType,
                              listOfEvents[i].details,
                              listOfEvents[i].dateTime,
                              listOfEvents[i].host,
                              listOfEvents[i].location,
                              listOfEvents[i].eventImage);
    allEvents.push(eventDBList);
  }
  return allEvents;
};

module.exports.getEventById = function(eventId){
  for (var i = 0; i < listOfEvents.length; i++){
     if (listOfEvents[i].eventId == eventId){
       eventDB = EventModel.event(listOfEvents[i].eventId,
                                 listOfEvents[i].eventName,
                                 listOfEvents[i].eventType,
                                 listOfEvents[i].details,
                                 listOfEvents[i].dateTime,
                                 listOfEvents[i].host,
                                 listOfEvents[i].location,
                                 listOfEvents[i].eventImage);
      return eventDB;
     };
  };
};
