function displayContent() {
    const urlParams = new URLSearchParams(window.location.search);

    const aboutMeData = JSON.parse(urlParams.get('aboutMe') || '[]');
    const aboutMeTextDiv = document.getElementById('aboutMeText');
    aboutMeData.forEach(text => {
        const para = document.createElement('li');
        para.textContent = decodeURIComponent(text);
        aboutMeTextDiv.appendChild(para);
    });

    const quizData = JSON.parse(urlParams.get('quiz') || '[]');
    const quizDisplay = document.getElementById('filled-quesions');
    quizData.forEach(([question, answer1, answer2, answer3], index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <div class="quiz-question">
                <h3>${index + 1}. ${question}:</h3>
                <label class="custom-heart">
                    <input type="radio" name="question${index}" value="${answer1}" hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" class="heart-radio" onclick="selectRadio('question${index}', '${answer1}', this);">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#ff5722" stroke-width="2"/>
                    </svg>
                    Japan
                </label><br>
                <label class="custom-heart">
                    <input type="radio" name="question${index}" value="${answer2}" hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" class="heart-radio" onclick="selectRadio('question${index}', '${answer2}', this);">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#ff5722" stroke-width="2"/>
                    </svg>
                    Iceland
                </label><br>
                <label class="custom-heart">
                    <input type="radio" name="question${index}" value="${answer3}" hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" class="heart-radio" onclick="selectRadio('question${index}', '${answer3}', this);">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#ff5722" stroke-width="2"/>
                    </svg>
                    USA
                </label><br>
            </div>
        `;
        quizDisplay.appendChild(questionDiv);
    });
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
    svgElement.querySelector('path').setAttribute('fill', '#ff5722'); // Change fill color to selected
}

function checkAnswers() {
    const correctAnswers = {
        question1: "Iceland",
        question2: "Dog",
        question3: "ComputerScience"
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
    if(score == Object.keys(correctAnswers).length){
        alertTitle.innerHTML  = `<h1>WOW!</h1>`;
    }
    else{
        if(score == Object.keys(correctAnswers).length - 1){
            alertTitle.innerHTML  = `<h1>Nice Try!</h1>`;
        }
        else{
            alertTitle.innerHTML  = `<h1>Try Again!</h1>`;
        }
    }
    alertMsg.innerHTML = `<h2>You got ${score} out of ${Object.keys(correctAnswers).length} correct!</h2>`;
}

function closeAlert() {
    // Hide the modal alert
    document.getElementById('responseAlert').style.display = 'none';
}

function shareResults() {
    const element = document.getElementById('responseAlert');
    if (element) {  // Check if the element exists
        html2canvas(element, {scale: 4})
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

displayContent();
