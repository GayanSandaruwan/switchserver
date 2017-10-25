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

# Adding a New Bulb 

Method -POST
http://localhost:3001/api/bulb/new

	{
	    
		"name" : "House",
		"user" : "gayankavirathne@gmail.com"

	}

#Getting all the bulbs Owned by the user

Method - POST
http://localhost:3001/api/user/bulbs

	{
		
		"user" : "gayankavirathne@gmail.com"
	
	}


# Adding a New Switch With bulbs Group

Method - POST
http://localhost:3001/api/switch/new

	{
	
		"name": "switch 1",
		"bulbs" : "[1,2]"
	}


# Assigning a switch To the User

Method - POST
http://localhost:3001/api/user/switch

	{
		"user" : "gayankavirathne@gmail.com",
		"switch" : "1"
	}


# Getting The switches Assigned to a User


Method - POST
http://localhost:3001/api/user/getSwitches

	{
		"user" : "gayankavirathne@gmail.com"
	}


# Getting Bulbs belong to the Switch

Method - POST
http://localhost:3001/api/switch/bulbs

	{
		"switch" : "1"
	}



# Changing the State Of switch

Method - POST
http://localhost:3001/api/switch/state

	{
		"state" : true,
		"switch" : 1
	}
