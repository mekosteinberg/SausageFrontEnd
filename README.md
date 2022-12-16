# SausageFrontEnd

[Rate My Brat](https://rate-my-brat.herokuapp.com/)

### Approach Taken

The idea was for a fun and silly Octoberfest app, as a SPA.  The original wireframe was just drawn out on a whiteboard. We intended to get MVP and then add in a search, login with user and password, use a 3rd party API as well.

As per the requirements we have two separate repos for front and backend. 

The search came together easier than I had anticipated, so I also broke things down into quite a few components. Accessing the 3rd party API solely through the front end was also easier than I thought it would have been. 

### Technologies used

- Express/Node
- jQuery/Javascript
- Material UI
- Postman
- Heroku


### Unsolved Problems

There were two things I really wanted to get implemented but didnt have time.
    - I also intended to link google maps to the brewery cards for breweries that did include location lat/longs in the API, but ran out of time. 
    - Dark Mode. I found out how to do it pretty easily on MUI but again, ran out of time.

One more thing, if we got the auth working I wanted to make it so anyone could rate the pictures and they would average over time. To add anything you would have to be logged in, you could only edit your own, but ALL the choices would show and you could rate other peoples.

### Resource Links

- https://gist.githubusercontent.com/marshallswain/88f377c71aa88aceaf660b157f6d8f46/raw/599592776eb9c25d59de175e4438898a66f8a290/states.js
- https://mui.com/
- https://www.openbrewerydb.org/?ref=apilist.fun
