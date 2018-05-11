$(document).ready(function () { 

// Values used for the game
var gameQuestions = [{

	question: "What industy do most Canadians work in?",
	answerList: ["Energy", "Service", "Government", "Manufacturing"],
    answer: 1, 
    image: "assets/images/service_question.jpg", 
    message: "Statistically Speaking, most Canadians work in the service industry", 
},{ 
	question: "What is Canada's highest mountain?",
	answerList: ["Mount Saint Elias", "Mount Slaggard", "Mount Lucania", "Mount Logan"],
    answer: 3, 
    image: "assets/images/mount_logan.jpg", 
    message: "At 19,551 ft, Mount Logan is Canada's tallest Mountain",  
},{
	question: "Which of these is a Canadian territory?",
	answerList: ["New Brunswick", "Nunavut", "Alaska", "North Pole"],
    answer: 1, 
    image: "assets/images/territories_region.png", 
    message: "Along with Yukon and the North West Territories, Nunavut is a Canadian territory", 
},{
	question: "Since 2000, how Many Olympic Gold Medals does the Mens Canadian Hockey team have?",
	answerList: ["3", "5", "2", "0"],
    answer: 0, 
    image: "assets/images/canada_hockey.gif", 
    message: "The have 3, with wins in 2002, 2010, and 2014", 
},{
	question: "Which of these is a governing body of the Canadian Parliament?",
	answerList: ["Supreme Court", "The Cabinet", "House of Commons", "The Canadian Military"],
    answer: 2, 
    image: "assets/images/parliament.jpg", 
    message: "The House of Commons is one governing body of the Canadian Parliament", 
},{
	question: "What was the last province to join Canada?",
	answerList: ["Newfoundland", "Quebec", "The North Pole", "Alberta"],
    answer: 0,
    image: "assets/images/newfoundland.jpg", 
    message: "Newfoundland became the last province to join Canada in 1949", 
},{
	question: "In what year did the Canadian Confederation Occur?",
	answerList: ["1776", "1867", "1812", "1999"],
    answer: 1,
    image: "assets/images/confederation.jpg", 
    message: "It was in 1867 that the Dominion of Canada was formed",  
},{
	question: "Who was Canada's longest non-consecutive serving Prime Minister?",
	answerList: ["Sir John A. Macdonald", "Pierre Elliot Trudeau", "Jean Chretien", "William Mackenzie"],
    answer: 3,
    image: "assets/images/william_lyon.jpg", 
    message: "With a tenure of over 21 years between 1921 and 1948, William Mackenzie is the longest serving Prime Minister",  
},{
	question: "Which day of the year is Canada Day?",
	answerList: ["July 1st", "July 4th", "December 31st", "April 1st"],
    answer: 0,
    image: "assets/images/canada_day.webp", 
    message: "In celebration of the Constitution Act, July 1st is Canada day", 
},{   
	question: "Hockey is Canada's official sport", 
	answerList: ["True", "False"],
    answer: 1,
    image: "assets/images/lacrosse.jpg", 
    message: "Contrary to popular opinion, Lacrosse is Canada's national sport",  
},{
	question: "In what year was the Canadian Flag first shown?",
	answerList: ["1867", "1812", "1944", "1965"],
    answer: 3,
    image: "assets/images/waving_flag.gif", 
    message: "Designed by George Stanley, the official Canadian flag was established in 1965",  
},{
	question: "The Toronto Maple Leafs won a Stanley Cup in the last 50 years",
	answerList: ["True", "False"], 
    answer: 1, 
    image: "assets/images/1967_cup.jpg", 
    message: "With their last win coming in 1967, they have not captured Lord Stanley in over a half century",    
}]; 
            
//Selectors for in game play
var gameHeading = $("#game-heading"); 
var gameStartDiv = $("#game-start"); 
var startButton = $("#start-button"); 
var restartButton = $("#play-again"); 
var gamePlayDiv = $("#game-play"); 
var questionDiv = $("#question-div"); 
var optionDiv = $("#answer-options"); 
var timer = $("#timer"); 
var progressSection = $("#progress-section");   
var gameResultsDiv = $("#game-results"); 
var answerResultDiv = $("#answer-result"); 
var finalResultDiv = $("#final-result"); 
var imageUpdate = $("#image-update");  
var finalMessageDiv = $("#final-message");  
var finalStatsTable = $("#final-stats");  
var correctAmount = $("#correct-amount");    
var incorrectAmount = $("#incorrect-amount");  
var timeOutAmount = $("#timed-out");  
var avgTime = $("#avg-time");  
var percentCorrect = $("#percent-correct");  
var gameSound = $("#game-sound");  

//Variables used throughout gameplay
var questionObject; 
var currentQuestion;
var userChoice; 
var userResponded; 
var currentAnswerList;
var currentAnswer;
var currentAnswerImage;
var currentAnswerMessage;
var timerSeconds; 
var timedInterval; 

// Counters used to calculate end of game statistics
var questionsUsed = 0; 
var correctAnswers = 0; 
var wrongAnswers = 0;
var timeoutAnswers = 0;  
var timeUsed = 0;
var percentScore = 0; 
var secondsRemaining = 0;
var buttonStyle = "col-md-12 btn btn-secondary btn-lg mt-2 h2 font-weight-bold text-light answer-click"; 
  
// Conditions for the beggining of the game (function)  *******
var gameStartConditions = function () {}
    gamePlayDiv.hide(); 
    progressSection.hide();  
    gameResultsDiv.hide(); 
    gameStartDiv.show(); 

// Conditions for the restarting the game (function)  *******
var newGame = function () {}
  
//function for generating the question and placing it on the screen  
var questionGenerator = function () {
   questionDiv.empty();  //hides elements that are not part of gamplay and empties div that showed previous question when a new one is generated
   optionDiv.empty(); 
   gameResultsDiv.hide()
   gamePlayDiv.show();   
   gameHeading.text('Question')
   questionsUsed++;    
   questionObject = gameQuestions[Math.floor(Math.random()* gameQuestions.length)]; //gets random object from questions array and sets values in variables *****
   currentQuestion = questionObject.question; 
   currentAnswerList = questionObject.answerList; 
   currentAnswer = questionObject.answer;  
   currentAnswerImage = questionObject.image; 
   currentAnswerMessage = questionObject.message;
   questionDiv.text(currentQuestion); 
    for (var i = 0; i < currentAnswerList.length; i++) { //fills the options section with buttons for each question and a data index of their place in the array
        var answerButton = $('<button>');
        answerButton.addClass(buttonStyle);
        answerButton.text((i+1) + ") " + currentAnswerList[i]);
        answerButton.attr({'data-index': i})
        optionDiv.append(answerButton);  
    }  
    timeClock();  

    // collects the data of the user click and stops the timer 
    $('.answer-click').on('click', function() { 
        gameSound.attr('src', 'assets/audio/button_click.mp3')  
        userResponded = true; 
        userChoice = $(this).data('index');  
        clearInterval(timedInterval); 
        userResults(); 
    }) 
 
}      
   
// Two functions for counting down once a new question is clicked.
 var timeClock = function () {
     timerSeconds = 20; 
     timer.text('Remaining Time: ' + timerSeconds)
     timedInterval = setInterval(timeCountdown, 1000) 
 } 
 var timeCountdown = function () {
     timerSeconds--; 
     timer.text('Remaining Time: ' + timerSeconds)
     if (timerSeconds < 1) {
         clearInterval(timedInterval) 
         userResults()
     } 
   
 }  

//sets conditions for the result of the reponse and then runs the game status function in 5 seconds
 var userResults = function () { 
        gamePlayDiv.hide();
        finalStatsTable.hide();   
        gameResultsDiv.show(); 
        gameHeading.text('Result') 
        imageUpdate.attr('src', currentAnswerImage)
        finalResultDiv.text(currentAnswerMessage);
        timeUsed = timeUsed += timerSeconds; 
        if ((userChoice === currentAnswer) && (userResponded === true)) { //user responded boolean to distinguish when user has made a choice vs. non-answer
            correctAnswers++;  
            answerResultDiv.text('That is Correct!') 
        } else if ((userChoice != currentAnswer) && (userResponded === true)) {
            wrongAnswers++; 
            answerResultDiv.text('That is Incorrect!')
        } else { 
            timeoutAnswers++
            answerResultDiv.text('Out of Time!') 
        } 
        userResponded = false;   
        setTimeout(gameStatus, 5000);          
 }  

 // Checks if all the questions have been answered first. If so, shows displays calculating bar and then runs game over in 5 seconds. Otherwise generates new question
 var gameStatus = function () {   
     if (questionsUsed === 1) { //questionsAnswered.length 
        calculatingResult(); 
        setTimeout(gameOver, 5000);   
     } else {
        questionGenerator(); 
     }

 }         
  
// Displays the progress bar for 5 seconds before the results are calculated and displayed
 var calculatingResult = function () {
    progressSection.show(); 
    answerResultDiv.text(''); 
    finalResultDiv.text('Calculating');
    imageUpdate.hide(); 
    gameHeading.text('Please await your score')
        var progressBar = document.getElementById("progress-bar")   // emebedded function to update progress bar ****
        var width = 1; 
        var id = setInterval(frame, 10);
        function frame() {  
            if (width >= 100) {
                clearInterval(id); 
            } else {
                width = width + 0.2;   
                progressBar.style.width = width + '%'; 
            }
        }
 }  
       
 var gameOver = function () {
    percentScore = ((correctAnswers/gameQuestions.length) * 100).toFixed();   
    progressSection.hide();  
    gameHeading.text('Game Over')
    finalMessageDiv.text('Analytics'); 
    finalStatsTable.show();  
    correctAmount.append('<th>' + correctAnswers + '</th>')
    incorrectAmount.append('<th>' + wrongAnswers + '</th>')
    avgTime.append('<th>' + (timeUsed/gameQuestions.length).toFixed(1) + ' seconds </th>')
    percentCorrect.append('<th>' + percentScore + ' % </th>')
    timeOutAmount.append('<th>' + timeoutAnswers + ' </th>')
    if (percentScore >= 1) { 
        answerResultDiv.text('You have won the game !');
        finalResultDiv.text('You got ' + correctAnswers + ' correct ' + ' out of ' + gameQuestions.length);
        imageUpdate.show().attr('src', 'assets/images/win.webp');
        gameSound.attr('src', 'assets/audio/national_anthem.mp3')  
    } else if (percentScore < 80) {
        answerResultDiv.text('You have lost the game !');  
        finalResultDiv.text('You got ' + correctAnswers + ' correct ' + ' out of ' + gameQuestions.length);
        imageUpdate.show().attr('src', 'assets/images/lose.webp'); 
        gameSound.attr('src', 'assets/audio/lose_game.mp3') 
    } 
 }  
    
// Start button that hides initial Div and shows Div with questions and timer
startButton.on('click', function () {
    gameStartDiv.hide();  
    gamePlayDiv.show(); 
    gameSound.attr('src', 'assets/audio/button_click.mp3')  
    questionGenerator();     
}); 

 
});       

 