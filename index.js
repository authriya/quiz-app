//question database
const STORE = [
{
    question: 'How many letters in the English language?',
    answers: [
        '30',
        '26',
        '24',
        '23'
    ],
    correctAnswer: '26',
},
{
    question: 'How many vowels?',
    answers: [
        '2',
        '3',
        '4',
        '5'
    ],
    correctAnswer: '5',
},
{
    question: 'How many consonants?',
    answers: [
        '20',
        '21',
        '22',
        '23',
    ],
    correctAnswer: '21',
},
{
    question: 'Which is not a vowel?',
    answers: [
        'a',
        'r',
        'i',
        'o',
    ],
    correctAnswer: 'r',
},
{
    question: 'Which language family subdivision does English fall into?',
    answers: [
        'Germanic',
        'Hellenic',
        'Daco-Thracian',
        'Italic',
    ],
    correctAnswer: 'Germanic',
}
];

let scoreNumber=0;
let questionNumber=0;

function startQuiz() {
$('.question-box').hide();
$('.end-quiz').hide();
$('.start-quiz').on('click', '.start-button', function(event) {
    $('.start-quiz').hide();
    $('.question-number').text(1);
    $('.question-box').show();
    $('.question-box').append(generateQuestion());
});
}

function generateQuestion() {
    if (questionNumber < STORE.length) {
        createQuestionHtml(questionNumber);
    } else {
        $('.question-box').hide();
        finalScore();
        $('.question-number').text(5);
    }
};

function updateScore(){
    scoreNumber++;
    $('.score-number').text(scoreNumber);
}

function updateProgress(){
    questionNumber++;
    $('.question-number').text(questionNumber+1);
}

function restartButtonActions() {
scoreNumber = 0;
questionNumber = 0;
$('.score-number').text(0);
$('.question-number').text(0);
}

function submitAnswer(){
    $('.main-section').on('submit', function(event){
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer===correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

function createQuestionHtml(questionIndex) {
    $(`<legend for="question-title"> ${STORE[questionIndex].question}</legend>`).appendTo('fieldset');
    let answerNumber = STORE[questionIndex].answers;
    for (let i = 0; i < answerNumber.length; i++) {
        $(`<input type = "radio" name="answer" id="answer${i+1}" value= "${answerNumber[i]}" tabindex ="${i+1}" required> 
        <label for="answer${i+1}"> ${answerNumber[i]}</label> <br/>
        <span id="js-r${i+1}" class="check"></span> <br>`).appendTo('fieldset');
    };
    $(`<button class="submit-button">Submit</button> <button class="next-button">Next</button>`).appendTo('fieldset');
    $('.next-button').hide();
}

function correctAnswer() {
    $('.submit-button').hide();
    let selected = $('input:checked').val();
    let id_num = STORE[questionNumber].answers.findIndex(i => i === selected);
    let id = "#js-r" + ++id_num;
    updateScore();
    $(`${id}`).addClass("right-answer");
    $(`${id}`).append(`That's right!<br/>`);
    $('.next-button').show();
}

function wrongAnswer() {
    $('.submit-button').hide();
    let selected = $('input:checked').val();
    let id_num = STORE[questionNumber].answers.findIndex(i => i === selected);
    let id = "#js-r" + ++id_num;
    $(`${id}`).append(`You got it wrong <br/> The answer is "${STORE[questionNumber].correctAnswer}"<br/>`);
    $(`${id}`).addClass("wrong-answer");
    $('.next-button').show();
}

function nextQuestion() {
    $('.main-section').on('click', '.next-button', function(event) {
        $('.start-quiz').hide();
        $('.end-quiz').hide();
        $('.question-box').show();
        updateProgress();
        $('fieldset').children().remove();
        generateQuestion();
    });
}
function finalScore() {
    $('.end-quiz').show();
    $('footer').hide();
    return $('.end-quiz').html(
        `<h1>All Done!</h3>
            <h3>Your score is ${scoreNumber} / 5</h3>
            <button type="submit" class="restart-button button">Restart</button>`
      );

}

function restartQuiz() {
    $('.main-section').on('click', '.restart-button', function (event) {
    event.preventDefault();
    restartButtonActions();
    $('.start-quiz').show();
    $('footer').show();
    $('.end-quiz').hide();
    });
  }

  function makeQuiz() {
      startQuiz();
      submitAnswer();
      nextQuestion();
      restartQuiz();
  }

  $(makeQuiz);