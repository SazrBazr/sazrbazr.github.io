(function() {
    emailjs.init("torhjkGsU4X3vG3Bn");
})();

// Check email count in local storage
function checkEmailLimit() {
    let emailCount = localStorage.getItem("emailCount");
    if (!emailCount) {
        localStorage.setItem("emailCount", 0);
        emailCount = 0;
    }
    return parseInt(emailCount, 10);
}

function incrementEmailCount() {
    let emailCount = checkEmailLimit();
    emailCount += 1;
    localStorage.setItem("emailCount", emailCount);
}

function sendEmail(event) {
    event.preventDefault();

    // Check if email limit is reached
    if (checkEmailLimit() >= 3) {
        document.getElementById("responseMessage").style.display = "block";
        document.getElementById("responseMessage").innerHTML = "<h3>You’ve reached the maximum number of submissions allowed.</h3>";
        return;
    }

    // Collecting data from the form
    const unexpectedFact = document.querySelector('textarea[name="unexpectedFact"]').value;
    const dreamDestination = document.querySelector('textarea[name="dreamDestination"]').value;
    const biggestFear = document.querySelector('textarea[name="biggestFear"]').value;
    const sibilings = document.querySelector('textarea[name="sibilings"]').value;

    emailjs.send("service_ce7g4hx","template_3lo4d9z",{
        from_name: dreamDestination,
        to_name: unexpectedFact,
        message: biggestFear,
        reply_to: sibilings,
    })
        .then(response => {
            incrementEmailCount();  // Increment email count on success
            document.getElementById("responseMessage").style.display = "block";
            document.getElementById("responseMessage").innerHTML = "<h3>Thanks for sharing! Your response has been submitted successfully.</h3>";
        })
        .catch(error => {
            document.getElementById("responseMessage").style.display = "block";
            document.getElementById("responseMessage").innerHTML = "<h3>Oops! Something went wrong. Please try again later.</h3>";
        });


        const alertTitle = document.getElementById('email-title');
        const alertMsg = document.getElementById('email-msg');
        document.getElementById('emailAlert').style.display = 'flex';
        alertTitle.innerHTML  = `<h1>Great!</h1>`;
        alertMsg.innerHTML = `Your responses has been sent`;
}


function checkAnswers() {
    const correctAnswers = {
        question1: "Iceland",
        question2: "Dog",
        question3: "ComputerScience",
        question4: "Green",
        question5: "Burgers"
    };
    const perfectResponses = {
        response1:"Spot on! You know everything about me already! 👏",
        response2:"Whoa! It's like you read my mind! 🧠✨",
        response3:"Impressive! 100% accurate! You're a pro! 🎉"
    };

    const highResponses = {
        response1:"Almost there! You know me pretty well. 😉 Want to give it another shot?",
        response2:"So close! Just a little more, and you’ll ace it! 🎯",
        response3:"You're just a tiny step away from perfection! Wanna try again?"
    };

    const lowResponses = {
        response1:"Not bad! There’s still a bit more to discover. Up for another try?",
        response2:"Hey, you're halfway there! Want to dig a bit deeper? 🌱",
        response3:"Great attempt! Keep going, you’re getting warmer! 🔥"
    };

    let score = 0;

    for (let question in correctAnswers) {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption && selectedOption.value === correctAnswers[question]) {
            score++;
        }
    }

    const resultDiv = document.getElementById('quizResults');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>You got ${score} out of ${Object.keys(correctAnswers).length} correct!</h3>`;
    
    const alertTitle = document.getElementById('alert-title');
    const alertMsg = document.getElementById('alert-msg');
    document.getElementById('responseAlert').style.display = 'flex';

    // Get a random number
    const randomNumber = getRandomNumber();

    if(score == Object.keys(correctAnswers).length){
        const responseKey = `response${randomNumber}`;
        const selectedResponse = perfectResponses[responseKey];
        alertTitle.innerHTML  = `<h2>${selectedResponse}</h2>`;
        alertMsg.innerHTML = `<h2>You got ${score} out of ${Object.keys(correctAnswers).length} correct!</h2>`;
    }
    else{
        if(score == Object.keys(correctAnswers).length - 1){
            const responseKey = `response${randomNumber}`;
            const selectedResponse = highResponses[responseKey];
            alertTitle.innerHTML  = `<h2>${selectedResponse}</h2>`;
            alertMsg.innerHTML = `<h2>You got ${score} out of ${Object.keys(correctAnswers).length} correct!</h2>`;
        }
        else{
            const responseKey = `response${randomNumber}`;
            const selectedResponse = lowResponses[responseKey];
            alertTitle.innerHTML  = `<h2>${selectedResponse}</h2>`;
            alertMsg.innerHTML = `<h2>You got ${score} out of ${Object.keys(correctAnswers).length} correct!</h2>`;
        }
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function closeAlert(id) {
    // Hide the modal alert
    document.getElementById(id).style.display = 'none';
}

function shareResults() {
    const element = document.getElementById('responseAlert-content');
    if (element) {  // Check if the element exists
        html2canvas(element)
            .then(canvas => {
                canvas.toBlob(blob => {
                    if (navigator.share) {
                        const file = new File([blob], 'results.png', { type: 'image/png' });
                        navigator.share({
                            files: [file],
                            title: 'Check out my results!',
                            text: 'I shared my quiz results with you!'
                        }).then(() => {
                            console.log('Share successful!');
                        }).catch((error) => {
                            console.error('Error sharing:', error);
                        });
                    } else {
                        alert('Sharing not supported on this browser.');
                    }
                });
            })
            .catch(error => {
                console.error('Error capturing the element:', error);
            });
    } else {
        console.error('Element not found: responseAlert');
    }
}

function selectRadio(questionName, value, svgElement) {
    // Check the radio button
    const radioButton = document.querySelector(`input[name="${questionName}"][value="${value}"]`);
    if (radioButton) {
        radioButton.checked = true;
    }

    // Get all SVGs in the same question to reset their fill color
    const svgs = document.querySelectorAll(`input[name="${questionName}"] + svg`);
    svgs.forEach(svg => {
        svg.querySelector('path').setAttribute('fill', 'white'); // Reset fill to white
    });

    // Change the fill color of the selected heart
    svgElement.querySelector('path').setAttribute('fill', '#FF4033'); // Change fill color to selected
}