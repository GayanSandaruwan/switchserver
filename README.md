# switchserver

# Registering A new User
//TODO send approvel link other than the key to the mail; Encrypt before Saving 

Method :  POST
http://localhost:3001/api/register

	{
		"first_name" : "Gayan",
		"last_name" : "Sandaruwan",
		"email" : "gayankavirathne@gmail.com",
		"key" : "sadfasd"
	}

# Sigining in as User

Method -POST
http://localhost:3001/api/SignIn

	{
		"email" : "gayankavirathne@gmail.com",
		"key" : "sadfasd"
	}


# Assigning a switch To the User

Method - POST
http://localhost:3001/api/user/switch

	{
		"email" : "gayankavirathne@gmail.com",
		"switch" : "1"
	}

# Getting The Buttons Assigned to a User


Method - POST
http://localhost:3001/api/user/getSwitches

	{
		"email" : "gayankavirathne@gmail.com"
	}


# Getting Bulbs belong to the Switch

Method - POST
http://localhost:3001/api/switch/bulbs

	{
		"switch" : "1"
	}


# Adding a New Switch With bulbs Group

Method - POST
http://localhost:3001/api/switch/new

	{
	
		"name": "switch 1",
		"bulbs" : "[1,2]",
	}


# Adding a New Bulb 

Method -POST
http://localhost:3001/api/bulb/new

	{
	    "name" : "House"
	}



# Changing the State

Method - POST
http://localhost:3001/api/bulb/state

	{
		"state" : true,
		"switch" : 1
	}
