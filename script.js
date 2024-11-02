function addAboutMe() {
    const textContainer = document.getElementById('text-container');

    // Create a new card for the textarea and remove button
    const aboutMeCard = document.createElement('div');
    aboutMeCard.classList.add('about-me-card');

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
    const quizSection = document.getElementById('quiz-questions');

    // Create a new quiz card container
    const quizCard = document.createElement('div');
    quizCard.classList.add('quiz-card');

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

    const url = new URL(window.location.origin + '/homepage.html');
    url.searchParams.set('aboutMe', JSON.stringify(aboutMeData));
    url.searchParams.set('quiz', JSON.stringify(quizData));

    window.location.href = url.toString();
}
