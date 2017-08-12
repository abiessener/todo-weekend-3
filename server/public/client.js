

$(document).ready(function(){
    console.log('jq');
    
    $('#submitButton').on('click', function(){
        console.log('submitButton clicked');
        
    });

    $('#outputDiv').on('click', ':checkbox', function(){
        console.log('checkbox clicked');
        if ($(this).prop('checked')){
            console.log('checkbox is checked');            
        } else {
            console.log('checkbox is empty');
            
        }
    })
});