# MEAN Stack To-do List
This is the first real full-stack app that I built, and I'm pretty happy with how it turned out. The backend was simple enough to construct, but I spent some time on the styling and I like how it came together.

## What I learned
Getting the checkboxes to behave the way I wanted and tying them to display state (order, background color) was interesting and new. 

Obviously getting a full-stack app running was a cool moment as well. That's what I came to Prime to learn to do, and it felt great.

## Applicability
I doubt I'd re-use any of this code anywhere. Honestly Angular is so much easier to use for the common front-end stuff once you learn it, jQuery just doesn't make a ton of sense. I'm glad I learned it, though, as JQ may well come in handy at some point (and educationally, tying the DOM to the script in this way was obviously huge).

# Full Stack TODO

## Prime Weekend Challenge 3

This application will display a task list, let the user edit, add, and delete items from it, and store all task information in a persistent database.

## TODO
[] Create a front end experience that allows a user to create a task.
~~* Create headline, input, and output container divs~~
~~* Create input fields and buttons in input div~~
~~* Create click handlers for input buttons~~
~~* Create AJAX functions for click handlers~~
~~* Add basic styling~~

[] When the task is created, it should be stored inside of a database (SQL)
~~* Create .sql file with initial population of tasks table~~
~~* SQL columns: id - task - complete~~

~~* Create a basic server~~
~~* Create a /task router~~
~~* Create GET route (SELECT)~~
~~* Create POST route (INSERT)~~
~~* Create PUT route (UPDATE)~~
~~* Create DELETE route (DELETE)~~

[] Whenever a task is created the front end should refresh to show all tasks that need to be completed.

[] Each task should have an option to 'Complete' or 'Delete'.
~~* Add 'Complete' and 'Delete' buttons to the DOM when drawing output~~
~~* Add click handlers for Complete and Delete buttons~~
~~* Create AJAX functions for Complete and Delete buttons~~

[] When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)
~~* Style class(es) for completed tasks~~

[] Whether or not a task is complete should also be stored in the database.

[] Deleting a task should remove it both from the Front End as well as the Database.