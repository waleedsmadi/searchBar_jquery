$(document).ready(function(){
    "user strict";

    // // array to put names, emails and user div
    // to find the text that user write
    let userArr = [];


    // bring names & emails from placeholder JSON
    $.get("https://jsonplaceholder.typicode.com/users",function(users, status){
        if(status == "success"){

            /*
                1 - make a copy of user div
                2 - bring name and email from user div
                3 - put name and email inside the user div
                4 - append the div user to the wrapper to show it
                5 - return the name, email and the user div in an array
            */
            userArr = $.map(users, function(user){

                const cloneCard = $("template").clone().contents().get(1);
                const nameEl = $(cloneCard).find(".name");
                const emailEl = $(cloneCard).find(".email");

                $(nameEl).text(user["name"]);
                $(emailEl).text(user["email"]);
                $(cloneCard).appendTo($(".users"));

                return {name: user["name"], email: user["email"], element: cloneCard};
            });
        }
    });



    
    // Find similar words and hide the ones that are not
    $("#search-input").on("input",function(){
        const value = $(this).val();

        $(userArr).each(function(index, user){
            if(user["name"].includes(value) || user["email"].includes(value)){
                $(user["element"]).show();
                console.log($(user["element"]).get(0));
            }else{
                $(user["element"]).hide();
            }
        });
    });



});