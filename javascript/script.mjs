import { createUser, db } from './FirebaseConfig.js';

let currentcolors = {
    'main': '#E1ECF7',   
    'header':'#AECBEB',
    'btn-hover':'#71A5DE',
    'btn':'#4682b4'
};

window.addAboutMe = function() { 
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

window.addAboutHer = function() { 
    const textContainer = document.getElementById('about-her-container');

    // Create a new card for the textarea and remove button
    const aboutHerCard = document.createElement('div');
    aboutHerCard.classList.add('about-her-card');

    const newTextArea = document.createElement('textarea');
    newTextArea.placeholder = 'Enter a question for her...';

    // Create a remove button for the card
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => removeElement(aboutHerCard);

    // Append the textarea and remove button to the card
    aboutHerCard.appendChild(newTextArea);
    aboutHerCard.appendChild(removeButton);

    // Add the card to the text container
    textContainer.appendChild(aboutHerCard);
}

window.addQuizSection = function() { 
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

window.copyQuizzURL = async function() { 

    const url = document.getElementById('quizLink').value;

    navigator.clipboard.writeText(url).then(() => {
        console.log("Text copied to clipboard");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });

}

function allFieldsFilled() {

    // Check About Me fields
    const aboutMeTexts = [...document.querySelectorAll('#aboutMeSection textarea')];
    for (const textarea of aboutMeTexts) {
        if (!textarea.value.trim()) return false;
    }

    // Check Quiz fields
    const quizItems = [...document.querySelectorAll('.quiz-item')];
    for (const quizItem of quizItems) {
        const question = quizItem.querySelector('.question').value.trim();
        if (!question) return false;

        const answers = [...quizItem.querySelectorAll('.answer')];
        for (const answer of answers) {
            if (!answer.value.trim()) return false;
        }

        // Ensure one answer is selected as the correct one
        const selectedAnswer = [...quizItem.querySelectorAll('input[type="radio"]')].some(radio => radio.checked);
        if (!selectedAnswer) return false;
    }

    // All fields are filled
    return true;
}


window.generateURL = async function() { 

    document.getElementById('errorMessage').hidden = true;
    if(allFieldsFilled() == false){
        document.getElementById('errorMessage').hidden = false;
        return;
    }

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

    const urlParams = new URLSearchParams(window.location.search);

    const namesData = urlParams.get('names') || {};

    const names = decodeURIComponent(namesData);

    await createUser(db, aboutMeData, quizData, currentcolors, names);

    const quizURL = new URL(window.location.origin + '/PersonalizedPage.html');

    quizURL.searchParams.set('names', names);

    document.getElementById('quizLink').value = quizURL;
    document.getElementById('linksSection').hidden = false;
    document.getElementById('generateBtn').hidden = true;
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
    const colorItems = [blue, green, yellow, pink, orange, purple];
    colorItems.forEach(item => item.classList = 'clickable-item');
    
    // Set the active class for the clicked item
    activeElement.classList = 'clickable-item-active';
}

window.itemClicked = function(color) { 
    // Change the CSS variables or styles based on the selected color
    const blue = document.getElementById('blue');
    const green = document.getElementById('green');
    const yellow = document.getElementById('yellow');
    const pink = document.getElementById('pink');
    const orange = document.getElementById('orange');
    const purple = document.getElementById('purple');
    
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
            setColors('#DBCDF0', '#E1B7E1', '#B57BB5', '#9C27B0', purple);
            break;
        case 'Orange':
            setColors('#F8D9C4', '#F6A286', '#FFA500', '#FF9800', orange);
            break;
    }
    
}

