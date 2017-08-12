// clear #outputDiv, get the list of tasks from the DB, then display them on the DOM
function displayTasks() {

    $.ajax({
        method: 'GET',
        url: '/task',
        success: function (response) {
            console.log('ajax get successful', response);
            $('#outputDiv').empty();
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                var $rowToAppend = $('<div class="taskDiv"></div>');
                $rowToAppend.append('<p>' + task.task + '</p>');
                $rowToAppend.append('<button class="deleteButton">X</button>');
                if (task.complete) {
                    $('<input>', {
                        type: "checkbox",
                        class: "taskCheckBox",
                        "checked": "checked"
                    }).appendTo($rowToAppend);
                    $rowToAppend.data('complete', true);
                } else {
                    $rowToAppend.append('<input type="checkbox" class="taskCheckBox">');
                    $rowToAppend.data('complete', false);                    
                }
                $('#outputDiv').append($rowToAppend);
            } // end for loop
        }

    });
}

$(document).ready(function () {
    console.log('jq');

    displayTasks();

    $('#submitButton').on('click', function () {
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
    });

    $('#outputDiv').on('click', ':checkbox', function () {
        console.log('checkbox clicked');
        if ($(this).prop('checked')) {
            console.log('checkbox is checked');
        } else {
            console.log('checkbox is empty');

        }
    })

    $('#outputDiv').on('click', '.deleteButton', function () {
        console.log('delete clicked');
    })
});