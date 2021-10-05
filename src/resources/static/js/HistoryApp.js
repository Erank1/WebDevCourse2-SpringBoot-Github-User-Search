/*
* Ex3 web programing by: Eran Reuven 205410848
* Client side top history present by AJAX/JSON
* */

/*-------Closure Section--------*/
let HistoryApp = ( ()=> {
    const headers = {   // headers to send for the Ajax for JSON content.
        'Accept': 'application/json',
        'Content-type': 'application/json',
    };
    let returnedObject = {}; //returned object from this closure
    let jsonRes; //the value of JSON that have returned from the fetch() request

    //Msgs to interact the user

    let notValid = `<strong>We are sorry!</strong>
                    <br> The history is invalid now.<br> Refresh or come back later!`;

    //End of msgs to interact the user

    /*-------newFetch Function--------
    * This function is to fetch from the server.
    * it called when the document is up.
    * to promise that we  load the history block on page load.
    * if we dont get a json response means we have a problem. Explained further at javadoc
    * of the server - side.*/

      function newFetch(url, options){
        fetch(url, options).then(res => res.json()
        ).then((resp) => {
            jsonRes = resp;
            printHistory();

        }).catch(() => AlertPresent(notValid))

    }
    /*-------AlertPresent Function--------
    * This function is generic to show an alert msg on our history web app.
    * The function gets "val", the msg itself (one of the msgs above or even custom one)*/

    function AlertPresent(Val){
          let abtn = document.getElementById('tophistory');
          abtn.innerHTML = Val;
      }


    /*-------SurveyLoader Function--------
    * This function calling newFetch function with details for ServletLoader
    * (can be called outside the closure by "HistoryApp.TopHistoryLoader() )*/

    returnedObject.TopHistoryLoader = () => {
         newFetch('/history', {
            method: "GET",
            headers: headers,
        });
    }

    /*-------printHistory Function--------
    * This function printing all the history and vector of histories. it calls once we done to
    * read all the details that needed from the server - side.*/

    function printHistory(){
        document.getElementById("tophistory").innerHTML +="";
        for(let i in jsonRes) {
            document.getElementById("tophistory").innerHTML +=
                `<a href="https://github.com/${jsonRes[i]['userName']}" class="list-group-item list-group-item-action list-group-item-info  d-flex justify-content-between align-items-center" name=historyItem id= ${i} value=${i}> 
                <span id="usernamehistory">${jsonRes[i]['userName']} </span><span class="badge badge-primary badge-pill" id="searchNumHistory">Searched ${jsonRes[i]['numOfSearches']} times</span></a>`;
        }
    }


    return returnedObject; //return the func object.
})();

/*To load all the details before the document even presents*/
window.onload = () => {
    HistoryApp.TopHistoryLoader();
}