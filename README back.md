# Dark Manager (?)

## Description

With the current pandemic, the rise of the dark kitchens have begun, and with them, the need of a software that allows
an integrated management of their webpage, orders and stock management, delivery routes and business metrics all in one.

Dark Manager is a B2B service offered to dark kitchens around the world that will allow exactly all that.

## User stories - Client

- **404** - As a client I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

- **500** - As a client I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **homepage** - As a client I want to be able to access the homepage.

- **sign up** - As a client I want to sign up on the web page so that I can order food.

- **login** - As a client I want to be able to log into my account so that I can order food or check my profile.

- **logout** - As a client I want to be able to log out from the web page so that I can make sure no one will access my account.

- **see and edit profile information** - As a client I want to be able to access my profile information and edit it.

- **food list** - As a client I want to see the list of food I can order.

- **buy** - As a client I want to place an order.

- **checkout** - As a client I want to see the cart and be redirected to payment page.


## User stories - Employee

- **404** - As an employee I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As an employee I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As an employee I want to be able to access the management homepage.
- **login** - As an employee I want to be able to log into my account so that I can manage the current orders and check the business information.
- **logout** - As an employee I want to be able to log out from the web page.
- **Add new employee** - As a employee I want to add new employee accounts.
- **edit user** - As an employee I want to be able to edit my profile.
- **see all current orders** - As an employee I want to see the list of orders and the different stages they are in.
- **move orders between stages** - As an employee I want to see what items i can purchase and click on them.
- **delivery management** - As an employee I want to see a map of the area I work, with all the orders placed in it.
- **stock management** - As an employee I want to see the stock levels of my ingredients and also get a shopping list of the ingredients I need to restock my kitchen to it's proper l
- evels.
- **graphics and statistics** - As an employee I want to see information, graphics and statistics of my business.









## Server Routes

| HTTP Method | URL                          | Request Body                                                 | Success Status       | Error Status | Description                                                  |
| ----------- | ---------------------------- | ------------------------------------------------------------ | -------------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`               | {userRole, username, password, email, image, aboutMe, address, Features(populate)} | 201 with user object | 404          | validation: fields not empty (422), user not exists (409), create user with encrypted password, store user in session |
| POST        | `/auth/login`                | {username, password}                                         | 200 with user object | 404          | validation: fields not empty (422), user exists (404), password matches (404), store user in session |
| POST        | `/auth/logout`               | (empty)                                                      | 204                  | 400          | Logout                                                       |
| POST        | `/user-edit`                 | { accessToken, userRole, username, password, email, image, aboutMe, address, Features(populate)} | 200                  | 400          | Edit user details                                            |
|             |                              |                                                              |                      |              |                                                              |
| `POST`      | `/private/create-recipe`     | Private route. Each user can create a new recipe             |                      |              |                                                              |
|             |                              |                                                              |                      |              |                                                              |
| `POST`      | `/private/create-ingredient` | Private route. Each user can create a new ingredient         |                      |              |                                                              |
|             |                              |                                                              |                      |              |                                                              |
| `POST`      | `/private/create-order`      | Private route. Each user can create a new order              |                      |              |                                                              |
|             |                              |                                                              |                      |              |                                                              |
|             |                              |                                                              |                      |              |                                                              |
| GET         | `/session/:accessToken`      | {accessToken}                                                | 200                  | 404          | Validate session token Router                                |
| GET         | `/get-orders`                | (empty)                                                      | 200                  | 404          | List all profiles                                            |
| GET         | `/get-orders/:id`            | (empty)                                                      | 200                  | 404          | List deatils specific profile                                |
| GET         | `/get-recipes`               | (empty)                                                      | 200                  | 404          | List all profiles                                            |
| GET         | `/get-recipes/:id`           | (empty)                                                      | 200                  | 404          | List deatils specific profile                                |
| GET         | `/get-users                  | (empty)                                                      | 200                  | 404          | List all profiles                                            |
| POST        | `/send-email/:receiver`      | {bodyEmail, sender, receiver}                                | 200                  | 404          | Send email                                                   |
|             |                              |                                                              |                      |              |                                                              |

## Models & schemas

### Users model

```javascript
{
	role: type:{
			type: String,
			enum: [“client”, "employee"]
	},
	name {
		firstName: String,
		lastName: String
	}
	email: String,
	password: String,
	phone: Number,
	address: {
		street: string,
		city: String,
		postCode: Number
	},
	location: {
		type:{
			type: String,
			enum: [“point”]
	},
	coordinates: {
		type: [Number],
		index: “2dsphere”
	},
	formattedAddress: String
	}
	currentOrder {},

	profilePic: String

	},
	{timestamps: true}
}
```

### Recipes model

```javascript
{
	name: String,
	kitchen: { type: String, enum: [ "Andele", "Burgueso", "Pizza Lola", ] },
	price: Number,
	ingredients: [ ObjectId ],
	recipePackaging: []
}
```

### Ingredients model

```javascript
 {
	name: String,
	currentStock: Number,
	minimum: Number,
	pricePerKg: Number
}
```

### Orders model

```javascript
{
	value: Number,
	stage: { type: String, enum: [ "New", "Cooking", "Delivery", “Done”] , default: "New" },
	user: objectId,
	orderPackaging: [],
	recipes: [objectId],
	deliveredBy: objectId,
	cookedBy: objectId
}
```

## Backlog

[See the Trello board.](https://trello.com/b/6ZU07s3r/m2project)

[See the Wireframes.](https://balsamiq.cloud/swcw8xi/pk1esy0/r2278)

## Links

### Git

Url to repository and to deployed project

[Repository Link](https://github.com/aleixbadia/community-project)

[Deploy Link]()

<br>

### Slides

Url to the presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)