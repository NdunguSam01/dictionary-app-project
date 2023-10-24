//Declaring the input field as a global variable since it will be used multiple times
let inputField=document.getElementById("search") 

//Adding an event listener to the DOM so that when it is loaded, the input field is automatically focused
document.addEventListener("DOMContentLoaded", ()=>
{
    inputField.focus()
})

//Getting the form from the DOM and attaching a submit event to it
const form=document.querySelector("form")
form.addEventListener("submit", event =>
{
    //Prevent the default behaviour of the from
    event.preventDefault()
    
    //Getting the input field avalue from the form
    const inputFieldValue=inputField.value

    //Calling the function that will fetch dictionary data based on the phrase passed on by the user
    fetchDictionaryData(inputFieldValue)

    //Clearing the form data that was submitted
    form.reset()
})