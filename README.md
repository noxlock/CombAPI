# CombAPI

## Communications (Data)base API



### Overview

CombAPI is a web API that allows the fetching of data from a sqlite database. The API was developed to have a full-stack application that interacts with a database, and performs queries to it, as well as using middleware to ensure the security of the application.

The database structure is loosely based on something you would find for VoIP applications like Discord.



The API has all three layers of a project:

- Presentation (basic HTML & CSS)
- Application (Node, Express, other middleware)
- Database (sqlite)



### Table of Contents

- [Installation](https://github.com/noxlock/CombAPI#Installation)
  - [Dependencies](https://github.com/noxlock/CombAPI#Dependencies)
  - [Hosting it](https://github.com/noxlock/CombAPI#Hosting-it)
    - [Connecting](https://github.com/noxlock/CombAPI#Connecting)
- [Usage](https://github.com/noxlock/CombAPI#Usage)
  - [GUI](https://github.com/noxlock/CombAPI#GUI)
  - [Routes](https://github.com/noxlock/CombAPI#Routes)
- [License](https://github.com/noxlock/CombAPI#License)



### Installation

#### Dependencies

- Node

  - better-sqlite3
  - body-parser
  - express
  - helmet
  - morgan
  - node-fetch
  - pug




#### Hosting It

Clone the repository to your system.

`git clone https://github.com/noxlock/CombAPI.git`



Enter the root directory of the repo.

`cd CombAPI`



Install all required dependencies with NPM.

`npm install`



Once all the dependencies are installed, run the **srv.js** file in the src folder.

`node ./src/srv.js`



##### Connecting

Simply enter the URL that was printed to the console into your web browser.

Note: connecting isn't needed to access the routes, it's just for those who prefer a GUI





#### Usage

The API can be accessed through the user-friendly GUI, or through the individual API routes.





##### GUI

It's really simple, navigate to the URL of the web server, and click on whatever option you'd like to perform.





##### Routes

This covers the back-end routes that interact with the database, NOT any of the GUI routes.





##### GET /users/

Displays all the users.





##### GET /users/:id

Displays a specific user's data





##### GET /servers/

Displays the number of servers present in the database.





##### GET /users/servers/:id

Displays the servers that the user is a member of.





##### POST /users/

Creates a user.



Before being inserted into the database, passwords are hashed using the `crypto` library.



###### Data format:

{

"user_id": integer,

"username": varchar,

"password": varchar,

Before being inserted into the database, passwords are hashed using the `crypto` library."role": integer

}







##### PATCH /users/:id

Modifies a user's password field.



Before being inserted into the database, passwords are hashed using the `crypto` library.







###### Data format:

{

"new_password": varchar

}







##### DELETE /users/:id

Deletes a specific user, selected by :id





###### Data format:

{

"user_id": integer

}







##### GET /dump

Displays ALL data from the database.





##### GET /staff

Displays all staff members (members with roles that have `administrator` or `moderator` field set to 1).







##### License

This program is under the MIT License, check LICENSE.md for more information.

















