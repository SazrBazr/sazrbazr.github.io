const correctAnswers = {}; // Declare an object to store correct answers


function addAboutMe() {
    const textContainer = document.getElementById('aboutme-card');

    // Create a new card for the textarea and remove button
    const aboutMeCard = document.createElement('div');
    aboutMeCard.classList.add('textarea-container');

    const newTextArea = document.createElement('textarea');
    newTextArea.placeholder = 'Enter a detail about yourself...';

    // Create a remove button for the card
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => removeElement(aboutMeCard);

    // Append the textarea and remove button to the card
    aboutMeCard.appendChild(newTextArea);
    aboutMeCard.appendChild(removeButton);

    // Add the card to the text container
    textContainer.appendChild(aboutMeCard);
}

function addQuizSection() {
    // Get the quiz section where new questions will be added
    const quizSection = document.getElementById('quiz-card');

    // Create a new quiz card container
    const quizCard = document.createElement('div');
    quizCard.classList.add('textarea-container');

    const quizItem = document.createElement('div');
    quizItem.classList.add('quiz-item');

    // Create the question textarea
    const questionBox = document.createElement('textarea');
    questionBox.placeholder = 'Quiz Question';
    quizItem.appendChild(questionBox);

    const answerInputs = document.createElement('div');
    answerInputs.classList.add('answer-inputs');

    // Add answer text areas with radio buttons
    for (let i = 1; i <= 3; i++) {
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container'); // New div to contain radio and textarea

        const answerBox = document.createElement('textarea');
        answerBox.placeholder = `Answer ${i}`;
        answerBox.rows = 1; // Optional: Set rows for better size management

        const answerRadio = document.createElement('input');
        answerRadio.type = 'radio';
        answerRadio.name = `question${quizSection.childElementCount + 1}`; // Unique name for each question
        answerRadio.id = `answer${quizSection.childElementCount + 1}-${i}`; // Unique ID for each answer
        answerRadio.value = answerBox.value;

        // Append the radio label and answer textarea to the answer container
        answerContainer.appendChild(answerRadio); // Append radio label
        answerContainer.appendChild(answerBox); // Append answer text area

        answerInputs.appendChild(answerContainer);
    }

    quizItem.appendChild(answerInputs);

    // Create a remove button for the quiz card
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Question';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => removeElement(quizCard);

    // Add the quiz item and remove button to the card
    quizCard.appendChild(quizItem);
    quizCard.appendChild(removeButton);

    // Append the new card to the end of the quiz section
    quizSection.appendChild(quizCard);
}

function checkAnswers() {
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
    if(score === Object.keys(correctAnswers).length){
        alertTitle.innerHTML  = `<h1>WOW!</h1>`;
    }
    else{
        if(score === Object.keys(correctAnswers).length - 1){
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

// Function to remove an element from the DOM
function removeElement(element) {
    element.remove();
}

function generateURL() {
    const aboutMeTexts = [...document.querySelectorAll('#aboutMeSection textarea')];
    const quizItems = [...document.querySelectorAll('.quiz-item')];

    const aboutMeData = aboutMeTexts.map(textarea => encodeURIComponent(textarea.value));
    const quizData = quizItems.map(quizItem => {
        const texts = [...quizItem.querySelectorAll('textarea')];
        return texts.map(text => encodeURIComponent(text.value));
    });

    const url = new URL(window.location.origin + '/test.html');
    url.searchParams.set('aboutMe', JSON.stringify(aboutMeData));
    url.searchParams.set('quiz', JSON.stringify(quizData));

    window.location.href = url.toString();
}


function changeInToText() {
    document.getElementById('results-btn').style.display = 'inline';

    const quizContainers = document.querySelectorAll('.textarea-container, .textarea-container-first');

    quizContainers.forEach((container, index) => {
        const questionTextarea = container.querySelector('textarea');
        const questionText = questionTextarea.value;

        const answerTextareas = container.querySelectorAll('.answer-container textarea');

        const quizQuestionDiv = document.createElement('div');
        quizQuestionDiv.className = 'quiz-question';

        const questionHeader = document.createElement('h3');
        questionHeader.textContent = questionText;
        quizQuestionDiv.appendChild(questionHeader);

        answerTextareas.forEach((textarea, idx) => {
            const label = document.createElement('label');
            label.className = 'custom-heart';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question${index + 1}`; // Grouping radio buttons by question
            radioInput.value = textarea.value;
            radioInput.classList.add('correct-radio'); // Add class for easy selection

            // Create SVG for the heart radio button
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.classList.add('heart-radio');

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
            path.setAttribute("fill", "white");
            path.setAttribute("stroke", "#ff5722");
            path.setAttribute("stroke-width", "2");

            svg.appendChild(path);

            // Attach a click event to toggle radio button selection
            svg.onclick = () => {
                // Select the radio input
                radioInput.checked = true; // Mark the radio input as checked

                // Update the custom heart color to reflect selection
                const allHearts = document.querySelectorAll(`input[name="question${index + 1}"] + svg`);
                allHearts.forEach(heart => {
                    heart.classList.remove('selected-heart'); // Remove selected style from all
                });

                svg.classList.add('selected-heart'); // Add selected style to the clicked heart
            };

            label.appendChild(radioInput); // Attach the hidden radio button to the label
            label.appendChild(svg); // Attach the SVG heart to the label
            label.appendChild(document.createTextNode(textarea.value)); // Attach the answer text

            quizQuestionDiv.appendChild(label);
            quizQuestionDiv.appendChild(document.createElement('br'));

            // If the radio button is checked, save its value as the correct answer
            radioInput.addEventListener('change', () => {
                if (radioInput.checked) {
                    correctAnswers[`question${index + 1}`] = textarea.value; // Store correct answer
                }
            });
        });

        container.parentNode.replaceChild(quizQuestionDiv, container);
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