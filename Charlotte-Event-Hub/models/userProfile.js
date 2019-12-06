let allUserEvents=[];
let eventDB = require('../utility/connectionDB');

let userProfile= function(userId)
{

  let userProfileModel = {
    userId : userId,
    userEvents : allUserEvents
  }
  return userProfileModel;
};


let addEvent = function(event,rsvp)
{

   let event2add=getEvent(event);
   if(event2add==null)
   {
   userConnectionModel = require("../models/userConnection");
   let userEvents=userConnectionModel.userConnection(event , rsvp);
   allUserEvents.push(userEvents);
   }

}


let removeEvent = function(eventId)
{
  for(let i=0; i<allUserEvents.length; i++)
  {
      if(parseInt(allUserEvents[i].event.eventId) == eventId)
      {
        allUserEvents.splice(i, 1);
      }
  }
}


let emptyProfile = function()
{
  allUserEvents=[];
}


let updateEvent = function(event , rsvp)
{
  userEventModel = require("../models/userConnection");
  for(let i=0; i<allUserEvents.length; i++)
  {
      if(allUserEvents[i].event.eventId == event.eventId)
      {

        let userEvents=userEventModel.userConnection(event,rsvp);

        allUserEvents[i]= userEvents;

        break;
      }

  }
}

let getEvent = function(event)
{

  for(let i=0; i<allUserEvents.length; i++)
  {

      if(allUserEvents[i].event.eventId == event.eventId )
      {
        return allUserEvents[i];
      }
  }

}

let getEventValue = function(event, going)
{
  for(let i=0; i<allUserEvents.length; i++)
  {

      if(allUserEvents[i].event.eventId == event.eventId && allUserEvents[i].rsvp == going )
      {
        return allUserEvents[i];
      }
  }

}

let getEvents = function()
{
  return allUserEvents;
}


module.exports.addEvent=addEvent;
module.exports.removeEvent=removeEvent;
module.exports.updateEvent=updateEvent;
module.exports.getEvents=getEvents;
module.exports.getEvent=getEvent;
module.exports.emptyProfile=emptyProfile;
module.exports.allUserEvents=allUserEvents;
module.exports.userProfile=userProfile;
