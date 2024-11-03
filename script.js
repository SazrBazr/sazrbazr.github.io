currentcolors = {};

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
    questionBox.classList.add('question');
    questionBox.placeholder = 'Quiz Question';
    quizItem.appendChild(questionBox);

    // Add answer text areas and radio buttons
    for (let i = 1; i <= 3; i++) {
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');
        
        // Create a radio button for the answer
        const answerRadio = document.createElement('input');
        answerRadio.type = 'radio';
        answerRadio.name = `question-${quizCard.children.length}-${i}`; // Grouping by question index
        answerContainer.appendChild(answerRadio);

        const answerBox = document.createElement('textarea');
        answerBox.classList.add('answer');
        answerBox.placeholder = `Answer ${i}`;
        answerContainer.appendChild(answerBox);

        // Append the answer container (textarea + radio) to the quiz item
        quizItem.appendChild(answerContainer);
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

    // Map each textarea value to an encoded array for "aboutMe" data
    const aboutMeData = aboutMeTexts.map(textarea => encodeURIComponent(textarea.value));
    
    // Map each quiz item to structured "quizData"
    const quizData = quizItems.map(quizItem => {
        // Get the question text (assuming one question per quiz item)
        const question = encodeURIComponent(quizItem.querySelector('.question').value);
        
        // Get all answer options for this question
        const answers = [...quizItem.querySelectorAll('.answer')].map(answer => encodeURIComponent(answer.value));
        
        const correctAnswerIndex = [...quizItem.querySelectorAll('input')].findIndex(input => input.checked);

        return {
            question: question,
            answers: answers,
            correctAnswerIndex: correctAnswerIndex,
        };
    });

    // Generate the URL and set parameters
    const url = new URL(window.location.origin + '/homepage.html');
    url.searchParams.set('aboutMe', JSON.stringify(aboutMeData));
    url.searchParams.set('quiz', JSON.stringify(quizData));
    url.searchParams.set('color', JSON.stringify(currentcolors));

    // Redirect to the generated URL
    window.location.href = url.toString();
}

function itemClicked(color) {
    // Change the CSS variables or styles based on the selected color
    const blue = document.getElementById('blue');
    const green = document.getElementById('green');
    const yellow = document.getElementById('yellow');
    const pink = document.getElementById('pink');
    const orange = document.getElementById('orange');
    const Purple = document.getElementById('purple');
    
    switch (color) {
        case 'Blue':
            setColors('#E1ECF7', '#AECBEB', '#71A5DE', '#4682b4', blue);
            break;
        case 'Pink':
            setColors('#FCE8E6', '#F2C6DF', '#FF9B9B', '#FF6B6B', pink);
            break;
        case 'Yellow':
            setColors('#FAEDCB', '#F8E59D', '#F8D62D', '#F6D200', yellow);
            break;
        case 'Green':
            setColors('#C9E4DF', '#8BB8B0', '#2A6359', '#538E83', green);
            break;
        case 'Purple':
            setColors('#DBCDF0', '#E1B7E1', '#B57BB5', '#9C27B0', Purple);
            break;
        case 'Orange':
            setColors('#F8D9C4', '#F6A286', '#FFA500', '#FF9800', orange);
            break;
    }
    
}


function setColors(main, header, btnHover, btn, activeElement) {
    document.body.style.setProperty('--main-bg-color', main);
    document.body.style.setProperty('--header-footer-bg-color', header);
    document.body.style.setProperty('--button-hover-bg-color', btnHover);
    document.body.style.setProperty('--button-bg-color', btn);
    currentcolors['main'] = main;
    currentcolors['header'] = header;
    currentcolors['btn-hover'] = btnHover;
    currentcolors['btn'] = btn;
    
    // Reset all clickable items to inactive
    const colorItems = [blue, green, yellow, pink, orange, Purple];
    colorItems.forEach(item => item.classList = 'clickable-item');
    
    // Set the active class for the clicked item
    activeElement.classList = 'clickable-item-active';
}