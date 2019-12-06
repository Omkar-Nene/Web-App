var event = function(eid, en, et,  d, dt, h, l, img){
  var eventModel = {eventId: eid, eventName: en, eventType:et, details:d, dateTime:dt, host:h, location:l, eventImage: img};
  return eventModel;
};

module.exports.event = event;
