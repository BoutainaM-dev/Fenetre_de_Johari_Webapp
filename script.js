let currentQuestionIndex = 0;
let questions = null;
let finalValueA = 0;
let finalValueB = 5;
var score_A = Array(20).fill(0);
var score_B = Array(20).fill(0);
let Sollicitations = 0;
let revelation = 0;

document.addEventListener('DOMContentLoaded', function () {
    fetch('questions.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            questions = xmlDoc.getElementsByTagName('question');

            console.log("Number of questions:", questions.length);

            displayQuestion(currentQuestionIndex);

            // Call final_score() here to ensure it's called after the XML file is loaded
            final_score();

            // Call graph() here to ensure it's called after the XML file is loaded
            graph(); // Call the graph function once the DOM has fully loaded
        })
        .catch(error => {
            console.error('Error fetching or parsing XML:', error);
        });
});


function updateSlider(value) {
    const answerLabelA = document.querySelector('.answer-label-A');
    const answerLabelB = document.querySelector('.answer-label-B');
    let A, B;

    switch (parseInt(value)) {
        case 0:
            answerLabelA.textContent = 'A = 0';
            answerLabelB.textContent = 'B = 5';
            A = 0;
            B = 5;
            break;
        case 1:
            answerLabelA.textContent = 'A = 1';
            answerLabelB.textContent = 'B = 4';
            A = 1;
            B = 4;
            break;
        case 2:
            answerLabelA.textContent = 'A = 2';
            answerLabelB.textContent = 'B = 3';
            A = 2;
            B = 3;
            break;
        case 3:
            answerLabelA.textContent = 'A = 3';
            answerLabelB.textContent = 'B = 2';
            A = 3;
            B = 2;
            break;
        case 4:
            answerLabelA.textContent = 'A = 4';
            answerLabelB.textContent = 'B = 1';
            A = 4;
            B = 1;
            break;
        case 5:
            answerLabelA.textContent = 'A = 5';
            answerLabelB.textContent = 'B = 0';
            A = 5;
            B = 0;
            break;
        default:
            // Handle other cases if needed
            break;
    }
    finalValueA = A;
    finalValueB = B;
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the slider to A=0 and B=5 at the beginning
    updateSlider(0);
});
function displayQuestion(index) {
    const q = document.getElementById('q');
    const a1 = document.getElementById('a1');
    const a2 = document.getElementById('a2');

    const currentQuestion = questions[index];
    const qText = currentQuestion.getElementsByTagName('text')[0].textContent;
    const answer1 = currentQuestion.getElementsByTagName('reponse1')[0].textContent;
    const answer2 = currentQuestion.getElementsByTagName('reponse2')[0].textContent;

    q.textContent = qText;
    a1.querySelector('.option-content').textContent = answer1;
    a2.querySelector('.option-content').textContent = answer2;
    
}


function next() {
    update_score();
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        final_score();
        
        if (currentQuestionIndex === questions.length) {
            const nextButton = document.querySelector('button');
            nextButton.textContent = 'See Results';
            nextButton.removeEventListener('click', next);

            nextButton.addEventListener('click', function () {
                // Construct the URL with query parameters
                const url = 'result.html' +
                    '?revelation=' + revelation +
                    '&sollicitations=' + Sollicitations;

                // Redirect to the results page with query parameters
                window.location.href = url;
            });
        } else {
            displayQuestion(currentQuestionIndex);
        }
    }
}


// Handle the beforeunload event

function update_score() {
    score_A[currentQuestionIndex] = finalValueA;
    score_B[currentQuestionIndex] = finalValueB;
    console.log(finalValueA,finalValueB)
}

function final_score() {
    revelation = 0;
    Sollicitations = 0;
    let valeurs_sollicitations_A = [3,5,7,16,20];
    let valeurs_sollicitations_B = [2,8,10,12,14];
    let valeurs_revelations_A = [1,13,15];
    let valeurs_revelations_B = [4,6,9,11,17,18,19];
    for (let i of valeurs_revelations_A) {
        revelation  = revelation + score_A[i-1]; 
    }
    for (let i of valeurs_revelations_B) {
        revelation  = revelation + score_B[i-1]; 
    }
    for (let i of valeurs_sollicitations_A) {
        Sollicitations  = Sollicitations + score_A[i-1]; 
    }
    for (let i of valeurs_sollicitations_B) {
        Sollicitations  = Sollicitations + score_B[i-1]; 
    }
}

