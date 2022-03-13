////
////

const patternInput = document.querySelector('.pattern-input');
const stringInput = document.querySelector('.string-input');

const responseBox = document.querySelector('.response-box');

const checkButton = document.querySelector('.check-button');
const resetButton = document.querySelector('.reset-button');

const warningMessageNotification = document.querySelector('.warning-message-notification');

//// Event Listener /////

checkButton.addEventListener("click", function() {

    const patternText = patternInput.value;
    const stringText = stringInput.value;
 
    checkPattern(stringText, patternText);

});

resetButton.addEventListener("click", function() {

    responseBox.innerHTML = '';

    patternInput.value = '';
    stringInput.value = '';
});

////
////

function checkPattern(stringText, patternText)
{
    const string = stringText;
    const pattern = patternText;

    responseBox.innerHTML = '';

    let regexPattern;

    try
    {
        if(pattern === '' || string === '')
        {
            throw "Fields are not filled";
        }
    }
    catch(err)
    {
        console.error(err);
        warningMessageNotification.innerHTML = '<i class="fas fa-exclamation-triangle"></i>' + '   ' + err;
                
        setTimeout(function() {
            warningMessageNotification.style.display = "none";
        }, 3000);

        warningMessageNotification.style.display = "block";
        return null;
    }

    try 
    {
        regexPattern = new RegExp(pattern, 'g');
    }
    catch(err)
    {
        console.error(err);
        warningMessageNotification.innerHTML = '<i class="fas fa-exclamation-triangle"></i>' + '   ' + err;
                
        setTimeout(function() {
            warningMessageNotification.style.display = "none";
        }, 3000);

        warningMessageNotification.style.display = "block";
        return null;
    }

    const matches = string.match(regexPattern);
  
    //console.log(matches);
    

    let response = document.createElement("p");
    let responseContent;

    let matchesList = document.createElement("p");
    let matchesListContent = document.createTextNode('Matches: ');

    if(matches == null)
    {
        console.log("No result in matching");
        responseContent = document.createTextNode('There are no matches in your string.');

    }
    else
    {
        if(matches.length == 1)
        {
            console.log("There is " + matches.length + " match in your string.");
            responseContent = document.createTextNode('There is ' + matches.length + ' match in your string.');
        }
        else
        {
            console.log("There are " + matches.length + " matches in your string.");
            responseContent = document.createTextNode('There are ' + matches.length + ' matches in your string.');
        }

        matchesList.appendChild(matchesListContent);

        for(let i = 0; i < matches.length - 1; i++)
        {
            matchesListContent = document.createTextNode(matches[i] + ', ');
            matchesList.appendChild(matchesListContent);
        }

        matchesListContent = document.createTextNode(matches[matches.length - 1]);
        matchesList.appendChild(matchesListContent);
    }

    response.appendChild(responseContent);
        
    responseBox.appendChild(response);
    responseBox.appendChild(matchesList);
}

