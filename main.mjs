import { getUser, getIdByUsername, db } from './FirebaseConfig.js';

async function IsUserFound(name1, name2) {

    const user = await getUser(db, (name1 + "-" + name2));
    if(user == null){
        console.log("user not found");
        return false;
    } 
    return true;
    
}

window.gotToGenerate = async function() { 

    const name1 = document.getElementById('name1').textContent;
    const name2 = document.getElementById('name2').textContent;

    console.log(name1 + "-" + name2);

    const responsesURL = new URL(window.location.origin + '/personalizedQuiz/SetUp.html');

    responsesURL.searchParams.set('names', name1 + "-" + name2);

    window.location.href = responsesURL.toString();

}

window.goToResponses = async function() { 
    
    const name1 = document.getElementById('name1').textContent;
    const name2 = document.getElementById('name2').textContent;

    console.log(name1 + "-" + name2);

    document.getElementById('error-msg').hidden = true;
    if(await IsUserFound(name1, name2) == false){
        document.getElementById('error-msg').hidden = false;
        return;
    }

    const responsesURL = new URL(window.location.origin + '/personalizedQuiz/Responses.html');

    responsesURL.searchParams.set('names', name1 + "-" + name2);

    window.location.href = responsesURL.toString();

}

