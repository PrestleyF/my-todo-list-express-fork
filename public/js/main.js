const deleteBtn = document.querySelectorAll('.fa-trash') //creating a variabe with the name deleteBtn and selecting all elements with a the class of thte trash can icons 
const item = document.querySelectorAll('.item span') //creating a variable and assigning it to a selection of span tags of a parent with a class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed') // creating a variable and assigning it to a selection of spans with a class of 'completed' inside a parent with a class of 'item'

Array.from(deleteBtn).forEach((element)=>{// creating an array from our selection and starting a loop 
    element.addEventListener('click', deleteItem) // add an event listener to the current item to listen that waits for a click and calls a function called 'delete item'
}) // closing our loop

Array.from(item).forEach((element)=>{ // creating an array fo=rom our selection and starting a loop 
    element.addEventListener('click', markComplete) // adds and event listener to the current item that waits for a click event that calls a function called 'markComplete'
})// closing our loop

Array.from(itemCompleted).forEach((element)=>{// creating an array from our selection and starting a loop
    element.addEventListener('click', markUnComplete)//adds an event listener to ONLY completed items
})//close our loop

async function deleteItem(){// declarig an asychronous function
    const itemText = this.parentNode.childNodes[1].innerText // looks inside the list items to extract the text value ONLY of the specified list item and grabs ONlY the inner text with the list span
    try{ // stsrting a try block to do something 
        const response = await fetch('deleteItem', {// creating a response variable  that waits on a fetch to get data from a the result of deleteItem route
            method: 'delete', //  sets the CRUD method for the route
            headers: {'Content-Type': 'application/json'}, // specifying the type of content expected, whicn is JSON
            body: JSON.stringify({ // ( the body is the actual information being passesd) Declare the message content being passed, and stringify that content(turn into a string)
              'itemFromJS': itemText // (itemText is the innerText of the list item) setting the content of the body to the inner text of the list item and naming it 'itemsFromJS' 
            })//closing the body
          }) //closing the object
        const data = await response.json() //  waiting on JSON from the response to be converted
        console.log(data) // log date to console
        location.reload() // reloads the page to update what is displayed

    }catch(err){ // if an error occurs pass the error into the catch block
        console.log(err)// log error into console
    } //close the catch block
} // end the function

async function markComplete(){ // declaring asynch function called markComplete
    const itemText = this.parentNode.childNodes[1].innerText// looks inside the list items to extract the text value ONLY of the specified list item and grabs ONlY the inner text with the list span
    try{ // starting try block to do something
        const response = await fetch('markComplete', { // creating a response variable  that waits on a fetch to get data from a the result of markComplete route
            method: 'put', // setting  a CRUD method to update for the route
            headers: {'Content-Type': 'application/json'}, // specifying the type of content expected, whicn is JSON
            body: JSON.stringify({ //  ( the body is the actual information being passesd) Declare the message content being passed, and stringify that content(turn into a string)
                'itemFromJS': itemText // (itemText is the innerText of the list item) setting the content of the body to the inner text of the list item and naming it 'itemsFromJS'
            }) // closing the body
          })// closing the object
        const data = await response.json() // waiting on JSON from the response to be converted
        console.log(data) //log date to console
        location.reload() // reloads the page to update what is displayed

    }catch(err){ // if an error occurs pass the error into the catch block
        console.log(err) // log the error to the console
    } // close the catch block
} // close the function

async function markUnComplete(){ // declaring asynch function called markUncomplete
    const itemText = this.parentNode.childNodes[1].innerText // looks inside the list items to extract the text value ONLY of the specified list item and grabs ONlY the inner text with the list span
    try{ //  starting try block to do something
        const response = await fetch('markUnComplete', { // reating a response variable  that waits on a fetch to get data from a the result of markUncomplete route
            method: 'put', // setting  a CRUD method to update for the route
            headers: {'Content-Type': 'application/json'}, // specifying the type of content expected, whicn is JSON
            body: JSON.stringify({ // ( the body is the actual information being passesd) Declare the message content being passed, and stringify that content(turn into a string)
                'itemFromJS': itemText // (itemText is the innerText of the list item) setting the content of the body to the inner text of the list item and naming it 'itemsFromJS'
            }) // closing the body
          }) // closing function 
        const data = await response.json() // waiting on JSON from the response to be converted
        console.log(data) // log date to console
        location.reload() // reloads the page to update what is displayed 

    }catch(err){ // if an error occurs pass the error into the catch block
        console.log(err) // log the error to the console
    } //  close the catch block
} // close the functi on