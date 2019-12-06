var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ceh', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var connectionSchema = new Schema({
  userId: Number,
  eventId:String,
  eventName:{type:String,required:true},
  eventType: {type:String,enum:['Recreation Events','Informative Events','Volunteering Events'], required:true},
  details: {type:String, required:true},
  dateTime:{type:String,required:true},
  host: String,
  location: {type:String,required:true},
  eventImage: String
})
  
var connection = mongoose.model('Events',connectionSchema,'Events');

var getConnections = function(){ return connection.find().exec()}

var getUniqueConnections = function(){return connection.find().distinct('eventType').exec()};

var getConnectionById = function(eventIdIn){return connection.find({'eventId':eventIdIn}).exec()};

var saveNewEvent = function(newEvent){
	newEvent.save(function(err,newEventAdded){
		if(err) return console.log(err);
		console.log(newEventAdded.eventName+"data saved successfully");
		})
	};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var userSchema = new Schema({
	userId: Number,
	firstName: String,
	lastName: String,
	email: String,
	contact: String,
	street: String,
	apartment: String,
	city: String,
	state: String,
	zipcode: Number,
	country: String
});

var user = mongoose.model('Users',userSchema,'Users');

var getAllUsersDB = function(){return user.find().exec()}
	
var getUserByIdDB = function (id) {return user.find({'userId':id}).exec()};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
var userProfileSchema = new Schema({
	userId:Number,
	event:{
		userId: Number,
		eventId:String,
		eventName:{type:String,required:true},
		eventType: {type:String,enum:['Recreation Events','Informative Events','Volunteering Events'], required:true},
		details: {type:String, required:true},
		dateTime:{type:String,required:true},
		host: String,
		location: {type:String,required:true},
		eventImage: String
	} ,
	rsvp: String
});

var userProfile = mongoose.model('UserProfile',userProfileSchema,'UserProfile');

var rsvpEvent = function(events,uid,rsvp){
	var AddRsvp = {
		userId: uid,
		event:{
			userId: events[0].userId,
			eventId:events[0].eventId,	
			eventName:events[0].eventName,
			eventType: events[0].eventType,
			details: events[0].details,
			dateTime:events[0].dateTime,
			host: events[0].host,
			location: events[0].location,
			eventImage: events[0].eventImage
		},
		rsvp:rsvp
		
	}
	
	return userProfile.findOneAndUpdate(
    {'userId':uid,'event.eventId': events[0].eventId}, 
    AddRsvp,
    {upsert: true, new: true, runValidators: true},
    function (err, existingEvent) {
        if (err) {
            console.log(err)
        } else {
			existingEvent.rsvp = rsvp;
			existingEvent.save();
        }
    }
	)
}

var getUserConnection = function(userId){
	return userProfile.find({'userId':userId}).exec();
}

var deleteConnection = function(connectionId,userId){
	return userProfile.deleteOne({'event.eventId':connectionId,'userId':userId}).exec();
}










module.exports.connection = connection;
module.exports.getConnections = getConnections;
module.exports.getUniqueConnections = getUniqueConnections;
module.exports.getConnectionById = getConnectionById;
module.exports.saveNewEvent = saveNewEvent;
module.exports.user = user;
module.exports.getAllUsersDB = getAllUsersDB;
module.exports.getUserByIdDB = getUserByIdDB;
module.exports.userProfile = userProfile;
module.exports.rsvpEvent = rsvpEvent;
module.exports.getUserConnection = getUserConnection;
module.exports.deleteConnection = deleteConnection;
