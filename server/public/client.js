// clear #outputDiv, get the list of tasks from the DB, then display them on the DOM
function displayTasks(){
    $('#outputDiv').empty();

    $.ajax({
        method: 'GET',
        url: '/task',
        success: function(response){
            console.log('ajax get successful', response);
            
        }

    });
}

$(document).ready(function(){
    console.log('jq');

    displayTasks();
    
    $('#submitButton').on('click', function(){
        console.log('submitButton clicked');
        
        var userInputObj = {
            task: $('#userInput').val(),
            complete: false,
        };

        $.ajax({
            method: 'POST',
            url: '/task',
            data: userInputObj,
            success: function(response){
                displayTasks();
            }
        });
    });

    $('#outputDiv').on('click', ':checkbox', function(){
        console.log('checkbox clicked');
        if ($(this).prop('checked')){
            console.log('checkbox is checked');            
        } else {
            console.log('checkbox is empty');
            
        }
    })

    $('#outputDiv').on('click', '.deleteButton', function(){
        console.log('delete clicked');
    })
});