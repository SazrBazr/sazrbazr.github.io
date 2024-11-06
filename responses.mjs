import { getUser, updateUserData, getIdByUsername, db } from './FirebaseConfig.js';

async function displayContent() {
    
    const urlParams = new URLSearchParams(window.location.search);

    const names = urlParams.get('names') || {};

    const user = await getUser(db, decodeURIComponent(names));

    const aboutHerData = user.aboutHer;
    const quizData = user.quiz;
    const currentcolors = user.color;
    const pickedAnswers = user.quizAnswers;
    const score = user.quizScore;

    // Correct the variable name to match the declaration
    document.body.style.setProperty('--main-bg-color', currentcolors['main']);
    document.body.style.setProperty('--header-footer-bg-color', currentcolors['header']);
    document.body.style.setProperty('--button-hover-bg-color', currentcolors['btn-hover']);
    document.body.style.setProperty('--button-bg-color', currentcolors['btn']);

    aboutHerData.forEach((aboutText, index) => {
        const aboutHerTexts = document.querySelectorAll('#bondingForm textarea');
        if (aboutHerTexts[index]) { 
            aboutHerTexts[index].textContent = aboutText;
        }
    });

    let numOfQuestions = 0;

    const quizDisplay = document.getElementById('filled-questions');
    quizData.forEach((quizItem, index) => {
        numOfQuestions++;
        const question = quizItem.question;
        const answers = quizItem.answers;

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        const ques = document.createElement('h3');
        ques.textContent = (index + 1) + '.' + decodeURIComponent(question);
        questionDiv.appendChild(ques);

        answers.forEach((answer, idx) => {
            const label = document.createElement('label');
            label.classList.add('custom-heart');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'question' + (index + 1);
            const inputValue = decodeURIComponent(answer);
            input.value = inputValue;
            if(inputValue == user.quizAnswers['question' + (index + 1)]){
                const svgNamespace = "http://www.w3.org/2000/svg";
                const svg = document.createElementNS(svgNamespace, "svg");
                svg.setAttribute("class", "heart-radio");
                svg.setAttribute("width", "24");
                svg.setAttribute("height", "24");
            }
            input.hidden = true;

            label.appendChild(input);

            // SVG and heart icon handling
            const svgNamespace = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNamespace, "svg");
            svg.setAttribute("class", "heart-radio");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");

            const path = document.createElementNS(svgNamespace, "path");
            path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
            path.setAttribute("fill", "white");
            path.setAttribute("stroke", "#FE251B");
            path.setAttribute("stroke-width", "2");

            svg.appendChild(path);
            label.appendChild(svg);
            label.appendChild(document.createTextNode(decodeURIComponent(answer)));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));

            if(inputValue == pickedAnswers['question' + (index + 1)]){
                selectRadio('question' + (index + 1), inputValue, svg);
            }
        });
        document.getElementById('quizScore').textContent = 'your crush got '+ score + ' out of ' + numOfQuestions; 
        quizDisplay.appendChild(questionDiv);
    });

}

window.selectRadio = function(questionName, value, svgElement) {
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

displayContent();