// clear #outputDiv, get the list of tasks from the DB, then display them on the DOM
function displayTasks() {

    $.ajax({
        method: 'GET',
        url: '/task',
        success: function (response) {
            console.log('ajax get successful', response);
            $('#outputDiv').empty();
            var completedTasks = [];
            
            // build a jQuery object out of the data from the DB, then append it to #outputDiv
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                var $rowToAppend = $('<div class="taskDiv"></div>');
                //here we're making tasks' backgrounds red, and more red as we go through the array
                var taskRed = 255 - ((10 * i) % 255);
                var taskGreen = parseInt((255 - ((10 * i) % 255))/6);
                var taskBlue = parseInt((255 - ((10 * i) % 255))/4);
                var taskColor = 'rgba(' + taskRed + ',' + taskGreen + ',' + taskBlue + ', 0.3)';
                $rowToAppend.css('background-color', taskColor);
                $rowToAppend.append('<p>' + task.task + '</p>');
                $rowToAppend.append('<button class="deleteButton">X</button>');
                $rowToAppend.data('id', task.id);

                // here we differentiate between tasks that are complete or not. incomplete get appended to the DOM immediately, while complete tasks get stored in an array to append below
                if (task.complete) {
                    $('<input>', {
                        type: "checkbox",
                        class: "taskCheckBox",
                        "checked": "checked"
                    }).appendTo($rowToAppend);
                    $rowToAppend.addClass('completed');
                    completedTasks.push($rowToAppend);
                } else {
                    $rowToAppend.append('<input type="checkbox" class="taskCheckBox">');
                    $('#outputDiv').append($rowToAppend);
                }
            } // end for loop

            // here we're making our completed tasks have green (and greener as we go) backgrounds, then appending them to the DOM
            for (var i = 0; i < completedTasks.length; i++) {
                var taskRed = parseInt((255 - ((10 * i) % 255))/3);
                var taskGreen = 255 - ((10 * i) % 255);
                var taskBlue = parseInt((255 - ((10 * i) % 255))/3);
                var taskColor = 'rgba(' + taskRed + ',' + taskGreen + ',' + taskBlue + ',0.3)';
                completedTasks[i].css('background-color', taskColor);
                $('#outputDiv').append(completedTasks[i]);
            }
        }

    });
}

// grab the input from #userInput, POST it to the server, then get a fresh task list and display it
function submitTask() {
    console.log('submitButton clicked');

    var userInputObj = {
        task: $('#userInput').val(),
        complete: false,
    };

    $.ajax({
        method: 'POST',
        url: '/task',
        data: userInputObj,
        success: function (response) {
            $('#userInput').val('');
            displayTasks();
        }
    });
}

$(document).ready(function () {
    console.log('jq');

    displayTasks(); // initial display

    // run submitTask when submit button clicked or when [enter] pressed in the input field
    $('#submitButton').on('click', submitTask);
    $('#userInput').keypress(function (key) {
        if (key.which === 13) {
            submitTask();
        }
    });

    // make our PUT request when the checkbox is clicked, passing the id of the clicked row as a URL parameter and whether it was checked or un-checked as the data object
    // I mostly did this to get practice with a URL parameter, but it's nice that there's some portability of the code to the DELETE request, so that was a happy accident
    $('#outputDiv').on('click', ':checkbox', function () {
        console.log('checkbox clicked');
        $.ajax({
            method: 'PUT',
            url: '/task/' + $(this).parent().data('id'),
            data: {
                complete: $(this).prop('checked')
            },
            success: displayTasks
        });

    });

    // prompt the user for confirmation when the delete button is clicked, then send our DELETE request if the user confirms (with the id of the row passed as a URL parameter)
    $('#outputDiv').on('click', '.deleteButton', function () {
        console.log('delete clicked');
        var taskText = $(this).siblings('p').text();
        console.log(taskText);
        
        if (confirm('Are you sure you want to delete "' + taskText + '"?') == true) {
            $.ajax({
                method: 'DELETE',
                url: '/task/' + $(this).parent().data('id'),
                success: displayTasks
            });
        }
    })
});