# IDF-LGBTQI+ CENTER APP (SERVER SIDE) :rainbow_flag:

## What is our app about?

Centre LGBTQI+ is an association that has been fighting for equal rights and against discrimination based on sexual orientation or gender identity for more than 20 years.
They welcome, inform and offer support by providing activities and documentary resources on LGBT issues. They get about 15000 visitors per year in their Paris office.

Like many NGOs they rely on donations. For that reason they need to keep track of how many people come and what kind of assistance is provided. With these records they’re able to :
- Demonstrate which of their activities is most requested.
- Adjust existing activities to keep up with the current context and demand.

Until today the system to keep track of visits was kinda prehistoric with a simple piece of paper being stashed in a drawer at the end of each day. 
At the end of the year a really brave employee picks up the mountain of paper and starts counting.

We met with employees to try and figure out what they actually needed. We ended up with 3 main needs:
- Build a simple tool for the volunteers to keep track of visits.
- Allow admins to access and modify data.
- Provide insights on the association activities.

With these informations in hands we went to work!

### [Test our app here](https://lgbtqi-plus-test.herokuapp.com/)

(Username: Admin, Password: 1234)

![](https://media0.giphy.com/media/l4hvNQ8U3bFysxC4wr/giphy.gif)

## Tech stack

| Client      |     Server    |
|:-----------:|:-------------:|
| React.js    |  Node.js      |
|   CSS       |  Express.js   |
| Recharts.js | MongoDB       |
### [Check the client side here](https://github.com/benpin31/LGBT-center-client)

## API documentation:


The route for the API is ```https://centre-lgbtqiplus-idf.herokuapp.com/api```

### Insights

|Method |Endpoint   |Protections   |response (200)   |Action   |
|---|---|---|---|---|
|GET|/insight/get-category-repartition?dateBegin=\<dateBegin\>&dateEnd=\<dateEnd\> |Volunteer|[{name, value}]|Return an array of objects of the form ```{name, values}``` where <ul><li>name : visit category name</li><li>value : number of visit corresponding to the category in the periode ```<dateBegin>``` -> ```<dateEnd>```</li></ul> Dates must be given in simplified extended ISO format : YYYY-MM-DDTHH:mm:ss.sssZ|
|GET|/insight/get-popular-days?dateBegin=\<dateBegin\>&dateEnd=\<dateEnd\> |Volunteer|{[{name, value}, [weekBegin, weekEnd]}]| return an object of aggregated data and new period range. Agregated data is an array of objects of the form ```{name, values}``` where <ul><li>name : weekday</li><li>value : average number of visit per day in the period ```<weekBegin>``` -> ```<weekEnd>```. ```<weekBegin>``` and ```<weekEnd>``` "round" ```<dateBegin>``` and ```<dateEnd>``` to compute on full week. The new period range returned is the array of the two new date limits</li></ul> Dates must be given in simplified extended ISO format : YYYY-MM-DDTHH:mm:ss.sssZ|
|GET|/insight/get-popular-hours?dateBegin=\<dateBegin\>&dateEnd=\<dateEnd\>[&weekDays=\<weekDay1\>,\<weekday2\>...] |Volunteer|[{name, value}]|Return an array of objects of the form ```{name, values}``` where <ul><li>name : and hour of the day</li><li>value : average number of visit per hour in the period ```<dateBegin>``` -> ```<dateEnd>``` computed on weekdays \<weekDay1\>,\<weekday2\> if some weekdays ae provided as query-string, on all weekdays else</li></ul> Dates must be given in simplified extended ISO format : YYYY-MM-DDTHH:mm:ss.sssZ. ```<weekdays>``` must be provided a list of weedays in french, separeted with coma without space : Lundi,Mardi,Samedi|



### Users
|Method |Endpoint   |Protections   |response (200)   |Action   |
|---|---|---|---|---|
| GET     | /user/        | Admin | [users] | Get all the users of the App|
| GET     | /user/:id       | Admin | {user} | Get user of ```ìd``` id of the app|
| POST    | /user/create    | Admin | {user} (created)  | Create a user in the data base. The 3 following properties must be given <ul><li>```login``` : at least 3 characters</li><li>```password``` : at least 3 characters</li><li>```isAdmin``` : boolean</li></ul>|
| DELETE  | /user/delete/:id | Admin<br/> A user can't delete his/her own account | {user} (deleted) | Delete user of ```ìd``` id from the app|
| PATCH  | /user/edit/:id | Admin<br/> Users can edit only their own account or volunteer account | {user} (deleted) | Edit user of ```ìd``` id from the app. The 3 following properties must be given <ul><li>```login``` : at least 3 characters</li><li>```password``` : at least 3 characters</li><li>```isAdmin``` : boolean</li></ul>||

### Categories

|Method |Endpoint   |Protections   |response (200)   |Action   |
|---|---|---|---|---|
| GET | /categories/| Volunteer | [categories] | Get all the categories |
| POST | /categories/| Admin | {category} | Create a category. The two following properties must be given : <ul><li>```name``` : at least 3 characters</li><li>```description``` : at least 3 characters</li></ul>By default, a category is active when created. The creator can't choose another value|
| PATCH | /categories/:id | Admin | {category} | Edit the category of ```ìd``` id. The three following properties must be given : <ul><li>```name``` : at least 3 characters</li><li>```description``` : at least 3 characters</li><li>```isActive``` : Boolean</li></ul>|

### Contact types

|Method |Endpoint   |Protections   |response (200)   |Action   |
|---|---|---|---|---|
| GET | /contactTypes/| Volunteer | [categories] | Get all the categories |
| POST | /contactTypes/| Admin | {category} | Create a contact type. The following property must be given : <ul><li>```name``` : at least 3 characters</li></ul>By default, a contact type is active when created. The creator can't choose another value|
| PATCH | /contactTypes/:id | Admin | {category} | Edit the category of ```ìd``` id. The two following properties must be given : <ul><li>```name``` : at least 3 characters</li><li>```isActive``` : Boolean</li></ul>|


### Visits

|Method |Endpoint   |Protections   |response (200)   |Action   |
|---|---|---|---|---|
|GET| /visits/[?dateBegin=\<dateBegin\>&dateEnd=\<dateEnd\>]|Volunteer|[visits]| Get all visits between ```<dateBegin>``` and ```<dateEnd>```. If ```<dateBegin>``` is not given, by default it will be begining of the current day. If ```<dateEnd>```  is not given, by default it will be end of the current day. Date must be given in simplified extended ISO format : YYYY-MM-DDTHH:mm:ss.sssZ|
|POST| /visits/|Volunteer|{visit}|Create a new visit. The two following properties must be given <ul><li>a contact type ```ìd```</li><li>a category ```ìd```</li></ul>|
|PATCH| /visits/:id |Volunteer|{visit}|Edit the visit of ```ìd``` id. The two following properties must be given : <ul><li>```category``` : mongoDB id </li><li>```contact type``` : mongoDB id</li></ul>|
|DELETE| /visits/:id |Volunteer|{visit}|Delete visit of ```ìd``` id from the app|



## Made by:

☞ Benjamin Pinard - [here](https://github.com/benpin31)

☞ Julie Plantey - [here](https://github.com/ronronscelestes)

☞ Mathieu Lambertin - [here](https://github.com/Mathoz)

