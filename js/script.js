//Declaring the input field as a global variable since it will be used multiple times
let inputField=document.getElementById("search") 

//

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

//Declaring the function that will fetch data from the dictionary API
function fetchDictionaryData(inputFieldValue)
{
    //Declaring the url that will be used to fetch data from the API
    const fetchURL=`https://api.dictionaryapi.dev/api/v2/entries/en/${inputFieldValue}`

    //Fetching data from the API
    fetch(fetchURL)
        .then(response => response.json())
        .then(wordData=>
            {
                //Destructuring the fetch result to get the word, phonetic/promounciation, audio pronounciation link and the meanings array
                let[{word, phonetic, phonetics: [{audio}], meanings}]=wordData

                //Passing the word, pronounciation and audio that will be used to create the result header
                renderResultHeader(word, phonetic, audio)

                //Looping over the meanings array to get the part of speech, definition, synonyms and antonyms
                meanings.forEach(meaning => 
                {
                    //Destructuring the meaning object to get the part of speech, definitions array, synonyms and antonyms of the word
                    let {partOfSpeech, definitions, synonyms, antonyms}=meaning

                    //Looping over the definitions array to get the definition of the word and an example in a sentence
                    definitions.forEach(definitions => 
                    {
                        //Destructuring the definitions object to get the definition and example in a sentence
                        let {definition, example}=definitions

                        //Creating an object that will be used to pass the data that has been fetched from the API
                        let wordDataObject=
                        {
                                partOfSpeech: partOfSpeech,
                                definition: definition,
                                example: example,
                                synonyms: synonyms,
                                antonyms: antonyms
                        }

                        //Passing the collected data as a paramenter to a function that will render the results to the DOM
                        // renderWordResults(wordDataObject)
                    });
                });
            })
}

//Function that will be used to get the result header section and modify the innerHTML based on the word being searched
function renderResultHeader(word, phonetic, audio)
{
    //Getting the result-header div from the DOM and setting the innerHTML content to it
    const resultHeader= document.getElementById("result-header")
    resultHeader.innerHTML=
    `
    <h2>${word}</h2>
    <p>Pronounciation: <span>${phonetic}</span> <i class="fa fa-volume-up"><audio src="${audio}" id="audio"></audio></i></p>
    `
}