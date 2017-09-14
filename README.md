# RestApiNodeJs
Ready to use Rest API in NodeJs which you can use to connect with NoSql database - MongoDB.

Below you will find information what you have to do to be able to use this RestApi.

Prerequisities:

# You have node and npm installed on your computer: 

NodeJS & NPM installation -> https://nodejs.org/en/download/
   
   Make sure everything is installed correctly by typing:
   
   C:\>node -v
   v6.10.3 (this value can vary on your computer)

   C:\>npm -v
   5.3.0 (this value can vary on your computer)

1. Right after you download this repo into your computer and unzip it, go into the folder of this repo using command line and run: 
   npm install
   In this way you will install all necessary libraries to run the project. There you will se new folder node_modules.
   When all necessary modules are downloaded the project is almost ready to run with command: node index . Before you have to yet
   provide correct connection data in disks.js file. Please continue to get know how to do that.
   
2. Install MongoDB https://www.mongodb.com/download-center#enterprise . After installation you will see that new folder in 
   C:\Program Files\MongoDB has appeared. Inside it you will find in localisation C:\Program Files\MongoDB\Server\3.4\bin two files:
   
   mongod.exe - run it in command line to launch mongoBb server
   mongo.exe - run it in command line to launch mongoDb client
   
3. To be able to maintain MongoDb database and see what is going on in much more convinient way, install Robo 3T from 
   https://robomongo.org/ .
   
4. Create Database and User with appriopriate settings and privilages.

   # run mongo client
   # create new database:
     
     use NAME_OF_THE_NEW_DATABASE
   
   # create collection
   
      db.createCollection("NAME_OF_THE_COLLECTION")
     
   # create user
     
     db.createUser(
         {
           user: "USER_NAME",
           pwd: "USER_PASSWORD",
           roles: [ "readWrite"]
         }
      )
   
5. Run MongoDB gui -> Robo 3T
   
   # create new connection to the database
   
      - File -> Connect -> Create
      
      On: Connection Card
      
      Type: Direct Connection
      Name: As you wish
      Address: localhost
      Port: 27017
      
      On: Authentication Card
      
      Database: NAME_OF_THE_NEW_DATABASE (as you have provided earlier)
      User name: USER_NAME
      Password: USER_PASSWORD
      Auth Mechanism: SCRAM-SHA-1
      
      - Test connection by clicking "Test" button in the left corner. If everything is correct you can continue. In different situation         check again provided information.
      
   # Connect with created database
   
      - From list of the defined connections choose this one you have just created.
      - Expand NAME_OF_THE_NEW_DATABASE folder, right click on "Collection" folder and choose "Create collection".
      - Enter collection name and save it.
      - Right click on created collection and choose "Insert document" option.
      - In the new window you can create new entity in JSON format e.g.
      
         {
            name: "John",
            lastname: "Smith"
         }
       
       - Before you save it, please check if the JSON structure is correct by clicking "Validate" button in the left-down corner. If  
         everything is correct, please save.
         
         In this way you can create other entities in database.
  
 6. Run WebApi Project
 
   # Run NodeJS WebApi
   
       - Before you can run the project, you have to insert apriopriate connection data inside ./disks/disks.js file. 
       
         const DB_USER = "USERNAME";
         const DB_PASSWORD = "PASSWORD";
         const DB_NAME = "DATABASE_NAME";
         const COLLECTION_NAME = "COLLECTION_NAME";
   
       - Run NodeJS project by typing: "node index" in the main folder of the project. If project will run correctly you will see
         information like: Serwer został uruchomiony pod adresem http://localhost:8080 .*
         
         * There can show up warning like:
           
           Cannot find module './win32/ia32/bson'
           
           or
           
           (node:10116) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, 
            use `openUri()` instead, or set the `useMongoClient` option if using `connect()`
            or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mon
            go-client
            Serwer został uruchomiony pod adresem http://localhost:8080
            Db.prototype.authenticate method will no longer be available in the next major r
            elease 3.x as MongoDB 3.6 will only allow auth against users in the admin db and
            will no longer allow multiple credentials on a socket. Please authenticate usin
            g MongoClient.connect with auth credentials.


           I don't know how to solve that yet, but the webservice is working as it should. I will get back to that in the close future.
           
  7. Postman
  
        - Install postman within Google Chrome webbrowser. After you install it, you can check if webservice is working correctly.
        - Below you will find basic CRUD operations you can fire directly from Postman:
      
          POST -> http://localhost:8080/api/disks -> Allow to save new entity into database
          
                  - Inside Postman in Headers insert: Key/Value Content-Type application/json 
                  - In Body section provide valid JSON object you want to store in database
                  
          GET  -> http://localhost:8080/api/disks -> Allow to get list of all stored entities in database
                  
                  - Inside Postman in Headers insert: Key/Value Content-Type application/json 
          
          GET  -> http://localhost:8080/api/disk/_id -> Allow to get information about specified entity. _id parameter you will find in 
                                                        Postman response after run GET query.
                                           
                  - Inside Postman in Headers insert: Key/Value Content-Type application/json 
                  
          PUT  -> http://localhost:8080/api/disk/_id -> Allow to update information about specified entity. _id parameter you will find
                                                        in Postman response after run GET query.
                                                        
                  - Inside Postman in Headers insert: Key/Value Content-Type application/json 
                  - In Body section provide valid JSON object you want to store in database
                  
          DELETE -> http://localhost:8080/api/disk/_id -> Allow to remove the specified entity from the database.
