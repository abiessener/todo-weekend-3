// clear #outputDiv, get the list of tasks from the DB, then display them on the DOM
function displayTasks() {

    $.ajax({
        method: 'GET',
        url: '/task',
        success: function (response) {
            console.log('ajax get successful', response);
            $('#outputDiv').empty();
            var completedTasks = [];
            
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                var $rowToAppend = $('<div class="taskDiv"></div>');
                $rowToAppend.append('<p>' + task.task + '</p>');
                $rowToAppend.append('<button class="deleteButton">X</button>');
                $rowToAppend.data('id', task.id);
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

            for (var i = 0; i < completedTasks.length; i++) {
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

    displayTasks();

    $('#submitButton').on('click', submitTask);
    $('#userInput').keypress(function (key) {
        if (key.which === 13) {
            submitTask();
        }
    });

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