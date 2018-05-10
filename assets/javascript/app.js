$(document).ready(function () { 

//Selectors for in game play
var gameHeading = $("#game-heading"); 

var gameStartDiv = $("#game-start"); 
var startButton = $("#start-button"); 
 
var gamePlayDiv = $("#game-play"); 
var questionDiv = $("#question-div"); 
var optionDiv = $("#answer-options"); 
var timer = $("#timer"); 
 
var gameResultsDiv = $("#game-results"); 
var answerResultDiv = $("#answer-result"); 
var finalResultDiv = $("#final-result"); 
var imageUpdate = $("#image-update");  
var finalMessageDiv = $("#final-message");  
var finalStatsTable = $("#final-stats");  
var correctAmount = $("#correct-amount");  
var incorrectAmount = $("#incorrect-amount");  
var avgTime = $("#avg-time");  
var percentCorrect = $("#percent-correct");  

var themeSong = $("#theme-song");  

//Variables used throughout gameplay
var questionObject; 
var currentQuestion;
var currentAnswerList;
var currentAnswer;
var currentAnswerImage;
var currentAnswerMessage;
// Counters used to calculate end of game statistics
var correctAnswers; 
var wrongAnswers; 
var timeoutAnswers;   
var timeUsed;   
var percentScore; 
var secondsRemaining;
var buttonStyle = "col-md-12 btn btn-secondary btn-lg mt-2 h2 font-weight-bold text-light answer-click"; 
  
// Initial Conditions - use either as a function or when the game starts
var initialConditions = function () {}
    gamePlayDiv.hide(); 
    gameResultsDiv.hide(); 
    gameStartDiv.show(); 

// Values used for the game
var gameQuestions = [{

	question: "What industy do most Canadians work in?",
	answerList: ["Energy", "Service", "Government", "Manufacturing"],
    answer: 2, 
    image: "assets/images/service_question.jpg", 
    message: "Most Canadians work in the Service Industry", 
},{
	question: "What is Canada's highest mountain?",
	answerList: ["Mount Saint Elias", "Mount Slaggard", "Mount Lucania", "Mount Logan"],
    answer: 3, 
    image: "assets/images/mount_logan.jpg", 
    message: "at 19,551 ft, Mount Logan is Canada's tallest Mountain", 
},{
	question: "Which of these is a Canadian territory?",
	answerList: ["New Brunswick", "Nunavut", "Alaska", "North Pole"],
    answer: 1, 
    image: "assets/images/territories_region.png", 
    message: "Along with Yukon and the North West Territories, Nunavut is one of Canada's territories", 
},{
	question: "Since 2000, how Many Olympic Gold Medals does the Mens Canadian Hockey team have?",
	answerList: ["3", "5", "2", "0"],
    answer: 0, 
    image: "assets/images/canada_hockey.gif", 
    message: "The have 3, with wins in 2002, 2010, and 2014", 
},{
	question: "Which of these is a governing body of the Canadian Parliament",
	answerList: ["Supreme Court", "The Cabinet", "House of Commons", "The Canadian Military"],
    answer: 2, 
    image: "assets/images/parliament.jpg", 
    message: "Along with the senate, The House of Commons is a governing body of the Canadian Parliament", 
},{
	question: "What was the last province to join Canada?",
	answerList: ["Newfoundland", "Quebec", "The North Pole", "Alberta"],
    answer: 0,
    image: "assets/images/newfoundland.jpg", 
    message: "In 1949 Newfoundland became the last province to join Canada", 
},{
	question: "In what year did the Canadian Confederation Occur?",
	answerList: ["1776", "1867", "1812", "1999"],
    answer: 1,
    image: "assets/images/confederation.jpg", 
    message: "It was in 1867 that the Dominion of Canada was formed",  
},{
	question: "Who was Canada's longest non-consecutive serving Prime Minister?",
	answerList: ["Sir John A. Macdonald", "Pierre Elliot Trudeau", "Jean Chretien", "William Lyon Mackenzie"],
    answer: 3,
    image: "assets/images/william_lyon.jpg", 
    message: "Between 1921 and 1948, William Lyon Mackenzie served 21 Years and 154 days as Prime Minister",  
},{
	question: "Which day of the year is Canada Day?",
	answerList: ["July 1st", "July 4th", "December 31st", "April 1st"],
    answer: 0,
    image: "assets/images/canada_day.webp", 
    message: "In celebration of the Constitution Act, July 1st is Canada day?", 
},{
	question: "In what year was the Canadian Flag first shown?",
	answerList: ["1867", "1812", "1944", "1965"],
    answer: 3,
    image: "assets/images/waving_flag.gif", 
    message: "Designed by George Stanley to replace the Union, the official Canadian flag was established in 1965",  
}];

// solution to end of game without page reload
var usedQuestions = []; 
var usedBonusQuestions = []; 

// Questions for the bonus round
var bonusQuestions = [{

	question: "The inventor of Basketball is Canadian",
	answerList: ["True", "False"],
    answer: 0,
    image: "assets/images/naismith.jpg", 
    message: "The sport was invented by James Naismith, who is Canadian",     
},{
	question: "Canada is the second largest country in the world",
	answerList: ["True", "False"],
    answer: 0,
    image: "assets/images/country_size.jpg", 
    message: "In terms of land mass, Canada is second only to Russia",  
},{   
	question: "Hockey is Canada's official sport",
	answerList: ["True", "False"],
    answer: 1,
    image: "assets/images/lacrosse.jpg", 
    message: "Contrary to popular opinion, Lacrosse is Canada's national sport",  
},{
	question: "Canada has two official languages",
	answerList: ["True", "False"],
    answer: 0,
    image: "assets/images/national_language.jpg", 
    message: "According to the Official Languages Act, English and French are Canada's national languages",  
},{
	question: "The Toronto Maple Leafs have won a Stanley Cup within the last 50 years",
	answerList: ["True", "False"], 
    answer: 1, 
    image: "assets/images/1967_cup.jpg", 
    message: "With their last win coming in 1967, they have not captured Lord Stanely in over a half century",    
}];
 
//function for generating the question and placing it on the screen  
var questionGenerator = function (questionArray, event) {
   questionDiv.empty();  
   optionDiv.empty(); 
   gameHeading.text('Question')
   questionObject = questionArray[Math.floor(Math.random()*gameQuestions.length)];
   currentQuestion = questionObject.question; 
   currentAnswerList = questionObject.answerList; 
   currentAnswer = questionObject.answer;  
   currentAnswerImage = questionObject.image; 
   currentAnswerMessage = questionObject.message;
   questionDiv.text(currentQuestion); 
        for (var i = 0; i < currentAnswerList.length; i++) {
            var answerButton = $('<button>');
            answerButton.addClass(buttonStyle);
            answerButton.text((i+1) + ") " + currentAnswerList[i]);
            optionDiv.append(answerButton); 
        }  
}
  
//function for counting down once a new question is clicked



//function for wrong answer or time out

//function for right answer

///////////////////////////////////////   GamePlay   ////////////////////////////////////////////////////////////////////////////////////
 
// Start button that hides initial Div and shows Div with questions and timer
startButton.on('click', function () {
    gameStartDiv.hide();  
    gamePlayDiv.show();  
    questionGenerator(gameQuestions);    
}); 
  
 
});     

// Additions
    // For loop that creates an effect. https://vincentgarreau.com/en