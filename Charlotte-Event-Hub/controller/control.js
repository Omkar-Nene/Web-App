var express = require('express');
var router = express.Router();
var connectionDB = require('../utility/connectionDB');
var mdb = require('../utility/mdb');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended : false });

// for home page
router.get('/', function(req, res) {
  res.render('index',{user_loggedIn:req.session.theUser});
  });

router.post('/', urlencodedParser,  function (req, response) {

  mdb.getUserByIdDB(1).then(function(userReturned){
	  req.session.theUser = userReturned[0];
	 
	  //response.redirect('/');
  })

});


// for contact us page
  router.get('/contact', function(req, res) {
      res.render('contact',{user_loggedIn:req.session.theUser});
  });

//for about us page
  router.get('/about', function(req, res) {
    res.render('about',{user_loggedIn:req.session.theUser});
  });

// to list a new event
  router.get('/newConnection', function(req, res) {
    res.render('newConnection',{user_loggedIn:req.session.theUser,userEvents:req.session.userProfile});
});

// to display saved events of user
router.get('/savedConnections', function(req, res) {
  res.render('savedConnections',{user_loggedIn:req.session.theUser,userEvents:req.session.userProfile});
});

// to show all available events dynamically
router.get('/connections', function(req, res) {
	mdb.getConnections().then(function(allevents){
		mdb.getUniqueConnections().then(function(topic){
			 var data= {
				categories: topic,
				events: allevents
			}
			res.render('connections', { data: data, user_loggedIn:req.session.theUser,userEvents:req.session.userProfile});
		})
	});
    
});

// to view a selected event by id dynamically
router.get('/connections/:eventId', function(req, res) {
    var eventID = req.params.eventId;
	
    //var event = connectionDB.getEventById(eventID);
	mdb.getConnectionById(eventID).then(function(eventReturned){
    if(eventReturned==undefined)
  {
   	mdb.getConnections().then(function(allevents){
		mdb.getUniqueConnections().then(function(topic){
			 var data= {
				categories: topic,
				events: allevents
			}
			res.render('connections', { data: data, user_loggedIn:req.session.theUser,userEvents:req.session.userProfile});
		})
	});
  }
  else{
    var data= {
        event: eventReturned
    }
    res.render('connection', { data: eventReturned[0], user_loggedIn:req.session.theUser,userEvents:req.session.userProfile});
  }
	}
  );
});

router.post('/connections',urlencodedParser, async function(req,res){

	var newConnection = new mdb.connection({
		'userId':req.session.theUser.userId,
		'eventId':req.body.Event_Type.slice(0,2)+req.body.Event_Name.slice(0,2)+req.body.Date.slice(0,2),
		'eventName': req.body.Event_Name,
		'eventType':req.body.Event_Type,
		'details':req.body.Details,
		'dateTime':req.body.Date,
		'location':req.body.Address,
		'eventImage': "/assets/images/blood_drive.jpg"
		})
		
	await mdb.saveNewEvent(newConnection);
	
	mdb.getConnections().then(function(allevents){
		mdb.getUniqueConnections().then(function(topic){
			 var data= {
				categories: topic,
				events: allevents
			}
			res.render('connections', { data: data, user_loggedIn:req.session.theUser,userEvents:req.session.userProfile});
		})
	});
	
})

router.get('/myEvents',function(req,res){
	
	var cid = req.query.eventId;
	var rsvp = req.query.action;
	if(req.session.theUser){
		mdb.getConnectionById(cid).then(function(eventReturned){
				mdb.rsvpEvent(eventReturned,req.session.theUser.userId,rsvp).then(function(){
					mdb.getUserConnection(req.session.theUser.userId).then(function(data){
						res.render('savedConnections',{userEvents:data , user_loggedIn:req.session.theUser});
				})
			})
		})
	}
	else{
		mdb.getUserByIdDB(1).then(function(userReturned){
			req.session.theUser = userReturned[0];
			mdb.getConnectionById(cid).then(function(eventReturned){
				mdb.rsvpEvent(eventReturned,req.session.theUser.userId,rsvp).then(function(){
					mdb.getUserConnection(req.session.theUser.userId).then(function(data){
						res.render('savedConnections',{userEvents:data , user_loggedIn:req.session.theUser});
					})
				})
			})
		})
	}
		
})


router.get('/myEvents/delete/:id',function(req,res){
	var cid = req.params.id;
	if(req.session.theUser){
		mdb.deleteConnection(cid,req.session.theUser.userId).then(function(){
			mdb.getUserConnection(req.session.theUser.userId).then(function(data){
						res.render('savedConnections',{userEvents:data , user_loggedIn:req.session.theUser});
				})
		})
	}
	else{
		console.log("In else");
		mdb.getUserByIdDB(1).then(function(userReturned){
			req.session.theUser = userReturned[0];
			mdb.getUserConnection(req.session.theUser.userId).then(function(data){
						res.render('savedConnections',{userEvents:data , user_loggedIn:req.session.theUser});
				})
		})
	}
})


router.get('/login',function(req,res){
	if(req.session.theUser){
				mdb.getUserConnection(req.session.theUser.userId).then(function(data){
				res.render('savedConnections',{userEvents:data , user_loggedIn:req.session.theUser});
				})
	}
	else{
		mdb.getUserByIdDB(1).then(function(userReturned){
			req.session.theUser = userReturned[0];
			mdb.getUserConnection(req.session.theUser.userId).then(function(data){
						res.render('savedConnections',{userEvents:data , user_loggedIn:req.session.theUser});
				})
		})
	}
})

router.get('/signOut',function(req,res){
	req.session.destroy();
	res.redirect('/');
})


// to handle invalid url and route it to homepage.
router.get('/*', function(req, res) {
  res.render('index',{user_loggedIn:req.session.theUser});
  });


module.exports = router;
