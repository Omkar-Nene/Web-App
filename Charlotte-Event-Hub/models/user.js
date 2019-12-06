let user = function( userid,firstName,lastName,email,contact,street,apartment,city,state,zipCode,country) {
  let userdetails ={
    userID:userID,
    password:password,
    firstName:firstName,
    lastName:lastName,
    email:email,
	contact:contact,
    street:street,
    apartment:apartment,
    state:state,
    zipCode:zipCode,
    country:country
  }
  return userdetails;
};


module.exports.user=user;
