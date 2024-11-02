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

    const questionBox = document.createElement('textarea');
    questionBox.placeholder = 'Quiz Question';
    quizItem.appendChild(questionBox);

    // Add answer text areas
    for (let i = 1; i <= 3; i++) {
        const answerBox = document.createElement('textarea');
        answerBox.placeholder = `Answer ${i}`;
        quizItem.appendChild(answerBox);
    }

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

function changeInToText(){
    // Change textareas in About Me section
    const aboutMeTextareas = document.querySelectorAll('#aboutMeSection textarea');
    aboutMeTextareas.forEach(textarea => {
        // Create a new paragraph element
        const pElement = document.createElement('p');
        // Set the text content to the value of the textarea
        pElement.textContent = textarea.value;
        textarea.parentNode.parentNode.replaceChild(pElement, textarea.parentNode);
    });

    // Get all quiz containers
    const quizContainers = document.querySelectorAll('.textarea-container, .textarea-container-first');

    quizContainers.forEach((container, index) => {
        // Extract the question and answers from the textareas
        const questionText = container.querySelector('textarea').value; // Get the quiz question
        const answerTextareas = container.querySelectorAll('.answer-inputs textarea');

        // Create the new quiz question container
        const quizQuestionDiv = document.createElement('div');
        quizQuestionDiv.className = 'quiz-question';

        // Create the question header
        const questionHeader = document.createElement('h3');
        questionHeader.textContent = questionText;
        quizQuestionDiv.appendChild(questionHeader);

        // Loop through each answer textarea to create radio buttons
        answerTextareas.forEach((textarea, idx) => {
            const label = document.createElement('label');
            label.className = 'custom-heart';

            // Create the input radio element
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question${index + 1}`; // Use a unique name for each question
            radioInput.value = textarea.value; // Set the value to the textarea's content
            radioInput.hidden = true; // Hide the radio input

            // Create the SVG element for the heart icon
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.className = 'heart-radio';
            svg.setAttribute("onclick", `selectRadio('question${index + 1}', '${textarea.value}', this);`);

            // Create the path element for the heart shape
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
            path.setAttribute("fill", "white");
            path.setAttribute("stroke", "#ff5722");
            path.setAttribute("stroke-width", "2");

            // Append the path to the SVG
            svg.appendChild(path);

            // Append the radio input and text to the label
            label.appendChild(radioInput);
            label.appendChild(svg);
            label.appendChild(document.createTextNode(textarea.value)); // Add the answer text

            // Append the label to the quiz question container
            quizQuestionDiv.appendChild(label);
            quizQuestionDiv.appendChild(document.createElement('br')); // Add a line break for spacing
        });

        // Replace the original container with the new quiz question container
        container.parentNode.replaceChild(quizQuestionDiv, container);
    });
}


{/* 
<div class="textarea-container-first">
    <div class="quiz-item">
        <textarea placeholder="Quiz Question" rows="2"></textarea>
        <div class="answer-inputs">
            <textarea placeholder="Answer 1"></textarea>
            <textarea placeholder="Answer 2"></textarea>
            <textarea placeholder="Answer 3"></textarea>
        </div>
    </div>
</div> 
*/}
