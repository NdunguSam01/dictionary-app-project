let inputField=document.getElementById("search") //Declaring the input field as a global variable since it will be used multiple times

//Adding an event listener to the DOM so that when it is loaded, the input field is automatically focused
document.addEventListener("DOMContentLoaded", ()=>
{
    inputField.focus()
})