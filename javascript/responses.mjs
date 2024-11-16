import { getUser, db } from './FirebaseConfig.js';

async function displayContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const names = urlParams.get('names') || {};
    const user = await getUser(db, decodeURIComponent(names));

    const aboutHerData = user.aboutHer;
    const quizData = user.quiz;
    const currentcolors = user.color;
    const pickedAnswers = user.quizAnswers;
    const score = user.quizScore;

    // Set colors
    document.body.style.setProperty('--main-bg-color', currentcolors['main']);
    document.body.style.setProperty('--header-footer-bg-color', currentcolors['header']);
    document.body.style.setProperty('--button-hover-bg-color', currentcolors['btn-hover']);
    document.body.style.setProperty('--button-bg-color', currentcolors['btn']);

    // Display About Her section
    const aboutHerTextDiv = document.getElementById('aboutHerText');
    aboutHerData.forEach((item, index) => {
 
        if(!item.answer)
        {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('bonding-question');

            const questions = ["What's something unexpected about you that most people don’t know?",
                "If you could travel anywhere in the world, where would you go, and why?",
                "What's your biggest fear, and how do you usually deal with it?"]
        
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = decodeURIComponent(questions[index]);
            questionDiv.appendChild(questionTitle);
        
            const textarea = document.createElement('textarea');
            textarea.name = `answer-${index}`;
            textarea.rows = 3;
            textarea.readOnly = true;
            textarea.value = decodeURIComponent(item);
            questionDiv.appendChild(textarea);
        
            aboutHerTextDiv.appendChild(questionDiv);
            console.log("old format");
            console.log(index);
        }
        else
        {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('bonding-question');
        
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = decodeURIComponent(item.question);
            questionDiv.appendChild(questionTitle);
        
            const textarea = document.createElement('textarea');
            textarea.name = `answer-${index}`;
            textarea.rows = 3;
            textarea.readOnly = true;
            textarea.value = decodeURIComponent(item.answer);
            questionDiv.appendChild(textarea);
        
            aboutHerTextDiv.appendChild(questionDiv);
        }
    });

 

    // Display Quiz section
    let numOfQuestions = 0;
    const quizDisplay = document.getElementById('filled-questions');
    
    quizData.forEach((quizItem, index) => {
        numOfQuestions++;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        
        const ques = document.createElement('h3');
        ques.textContent = `${index + 1}. ${decodeURIComponent(quizItem.question)}`;
        questionDiv.appendChild(ques);

        quizItem.answers.forEach((answer) => {
            const label = document.createElement('label');
            label.classList.add('custom-heart');
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index + 1}`;
            const inputValue = decodeURIComponent(answer);
            input.value = inputValue;
            input.hidden = true;

            // Create SVG heart
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
            
            // Add elements to DOM
            label.appendChild(input);
            label.appendChild(svg);
            
            const ans = document.createElement('textarea');
            ans.classList.add("answer");
            ans.readOnly = true;
            ans.textContent = inputValue;
            label.appendChild(ans);
            
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));

            // Select the picked answer if it matches
            if (inputValue === pickedAnswers[`question${index + 1}`]) {
                selectRadio(`question${index + 1}`, inputValue, svg);
            }
        });
        
        quizDisplay.appendChild(questionDiv);
    });

    // Update score display
    document.getElementById('quizScore').textContent = `They got ${score} out of ${numOfQuestions}`; 
}

window.selectRadio = function(questionName, value, svgElement) {
    const radioButton = document.querySelector(`input[name="${questionName}"][value="${value}"]`);
    if (radioButton) {
        radioButton.checked = true;
    }

    // Reset all hearts in the same question
    const svgs = document.querySelectorAll(`input[name="${questionName}"] + svg`);
    svgs.forEach(svg => {
        svg.querySelector('path').setAttribute('fill', 'white');
    });

    // Fill selected heart
    svgElement.querySelector('path').setAttribute('fill', '#FF4033');
}

displayContent();