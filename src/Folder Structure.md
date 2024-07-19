Folder Structure Guide
======================
```
/src
 |-- /controllers                 //# Controllers that define routes and handle requests
 |-- /api-services                //# Services that interact with external APIs
 |-- /config                       //# Configuration files and environment variable management
 |-- /core                         //# Core modules and utilities
 |-- /dtos                        //# Data Transfer Objects for handling and validating data input/output
 |-- /models                      //# Data models that define the structure of database entities
 |-- /repositories                //# Data access layers that interact with the database
 |-- /services                    //# Services that contain business logic and application rules
 |-- app.module.ts                //# Root module of the application
 |-- main.ts                      //# Entry file of the application

```
Let's take a closer look at the key components:

### `src/controllers/`:
Controllers in our application define routes and what happens when a certain route is called. They
  handle the user's request and return a response.

### `src/api-services/`:
API Services are responsible for interacting with external APIs. They handle the communication with
  external services, process the data, and return the results to the calling services.

### `src/config/`:
Configuration files and environment variable management. This is where you can store configuration
  settings for your application. 



### `src/core/`:
Core modules and utilities that are shared across the application. This can include services, utilities,
  and other modules that are used in multiple parts of the application.

### `src/dtos/`:
Data Transfer Objects (DTOs) are used for handling and validating data input/output. They define the
  structure of the data that is passed between different parts of the application.

### `src/models/`:
Data models define the structure of database entities. They represent the data that is stored in the
  database and are used to interact with the database.

### `src/repositories/`:
Repositories are data access layers that interact with the database. They provide methods to retrieve
  data from and persist data to the database, hiding the details of the data source.

### `src/services/`:
Services contain business logic and application rules. They are called by controllers and are responsible
  for processing data, executing business rules, and calling repositories.

### `src/app.module.ts`:
The root module of the application. This is where you define the structure of your application and import
  the necessary modules and components.

### `src/main.ts`:
The entry file of the application. This is where the application is started and the server is created.
