let userConnection= function(event,rsvp)
{
  let userConnectionModel = {
    event : event,
    rsvp : rsvp
  }
  return userConnectionModel;
};

module.exports.userConnection=userConnection;
