import { getUser, getIdByUsername, db } from './FirebaseConfig.js';

async function IsUserFound(name1, name2) {
    const user = await getUser(db, (name1 + "-" + name2));
    if (user == null) {
        console.log("user not found");
        return false;
    }
    return true;
}

//for animation
function expandAndNavigate(button, targetURL) {
    button.classList.add('expand-fullscreen');
    setTimeout(() => {
        window.location.href = targetURL;
    }, 500); // Match animation duration
}

window.gotToGenerate = async function() { 
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    console.log(name1 + "-" + name2);

    const responsesURL = new URL(window.location.origin + '/SetUp.html');
    const encodedName = encodeURIComponent((name1 + "-" + name2));
    responsesURL.searchParams.set('names', encodedName);

    //for animation
    const button = document.getElementById('setUpBtn');
    expandAndNavigate(button, responsesURL.toString());
}

window.goToResponses = async function() { 
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    console.log(name1 + "-" + name2);

    document.getElementById('error-msg').hidden = true;
    if (await IsUserFound(name1, name2) == false) {
        document.getElementById('error-msg').hidden = false;
        return;
    }

    const responsesURL = new URL(window.location.origin + '/Responses.html');
    const encodedName = encodeURIComponent((name1 + "-" + name2));
    responsesURL.searchParams.set('names', encodedName);

    //for animation
    const button = document.getElementById('checkBtn');
    expandAndNavigate(button, responsesURL.toString());
}