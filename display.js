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
    const quizDisplay = document.getElementById('filled-questions');
    quizData.forEach((quizItem, index) => {
        const question = quizItem.question; // Get the question text
        const answers = quizItem.answers; // Get the array of answers
        const correctAnswerIndex = quizItem.correctAnswerIndex; // Correct answer index

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        questionDiv.innerHTML = `
            <h3>${index + 1}. ${decodeURIComponent(question)}:</h3>
            ${answers.map((answer, idx) => `
                <label class="custom-heart">
                    <input type="radio" name="question${index}" value="${answer}" hidden ${correctAnswerIndex === idx ? 'checked' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" class="heart-radio" onclick="selectRadio('question${index}', '${answer}', this);">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#ff5722" stroke-width="2"/>
                    </svg>
                    ${decodeURIComponent(answer)}
                </label><br>
            `).join('')}
        `;
        quizDisplay.appendChild(questionDiv);
    });
}

function selectRadio(questionName, value, svgElement) {
    const radioButton = document.querySelector(`input[name="${questionName}"][value="${value}"]`);
    if (radioButton) {
        radioButton.checked = true;
    }

    const svgs = document.querySelectorAll(`input[name="${questionName}"] + svg`);
    svgs.forEach(svg => {
        svg.querySelector('path').setAttribute('fill', 'white');
    });

    svgElement.querySelector('path').setAttribute('fill', '#ff5722');
}

function checkAnswers() {
    const correctAnswers = {
        question0: "Iceland",
        question1: "Dog",
        question2: "ComputerScience" // Change these as per your quiz
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
    if (score === Object.keys(correctAnswers).length) {
        alertTitle.innerHTML = `<h1>WOW!</h1>`;
    } else {
        if (score === Object.keys(correctAnswers).length - 1) {
            alertTitle.innerHTML = `<h1>Nice Try!</h1>`;
        } else {
            alertTitle.innerHTML = `<h1>Try Again!</h1>`;
        }
    }
    alertMsg.innerHTML = `<h2>You got ${score} out of ${Object.keys(correctAnswers).length} correct!</h2>`;
}

function closeAlert() {
    document.getElementById('responseAlert').style.display = 'none';
}

function shareResults() {
    const element = document.getElementById('responseAlert');
    if (element) {
        html2canvas(element, { scale: 4 })
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

// Initialize content
displayContent();
