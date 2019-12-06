let getUsers=function()
{
return user_data;
};

module.exports.getUsers=getUsers;

let user_data = [
  {
      userId : 1,
      firstName : "Omkar",
      lastName : "Nene",
      email : "onene@uncc.edu",
	  contact: "+1-704-569-4277",
      street : "9544 UT Drive",
      apartment :  "L",
      city: "Charlotte",
      state: "NC",
      zipcode : "28262",
      country : "USA"

    },
    {
      userId : 2,
      firstName : "Pritam",
      lastName : "Borate",
      email : "pborate@uncc.edu",
	  contact : "+1-704-869-2456",
      street : "508 Barton Creek Drive",
      apartment : "H",
      city: "Charlotte",
      state: "NC",
      zipcode : "28262",
      country : "USA"

    }
];