Travel Experience Sharing Platform

A full-stack web application built with Spring Boot, MongoDB, and a HTML/CSS/JavaScript frontend.
The platform allows users to upload, manage, and share their travel experiences, including descriptions, locations, images, and trip details.

      https://travel-ieqw.onrender.com/


Backend

   1. Java 17+

   2. Spring Boot (Web, Data MongoDB, Validation)

   3. Lombok

   4. Maven

Frontend

  1.  HTML5

  2.  CSS

  3.  JavaScript (fetch API for backend interaction)

Database

 1.   MongoDB (Atlas or local instance)

Clone the Repository

    git clone https://github.com/PIyush1Thakur/travel.git
    cd travel

Configure MongoDB
Update application.properties

    spring.data.mongodb.uri=mongodb://localhost:27017/travel_app
    spring.data.mongodb.database=travel_app
    server.port=8080

