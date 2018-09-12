# Canadian Trivia Game

## Description
Conventional trivia game with a Canadian theme and time-trial twist. Every question must be answered within 10 seconds and 'non-answer' counts as false. The purpose of this project was to continue improving upon javascript fundamentals and implement some new features, such as the 'setTimeout' and 'setInterval' methods. 

##Screenshots

![](./assets/images/trivia.gif)

## Technology Used
* HTML
* CSS
* Javascript
* Jquery 

## Screenshots

## Resolutions
With this trivia game I originally had an issue with ensuring that the same question was not asked multiple times in one game.  I considered deleting each question after use, but this would not allow the user to restart the game because the array housing all the questions would be empty. I solved this by making each question an object with a 'used' property. This property starts as false at the start of the game for every question, but after it has been chosen, it gets set to true. I then used 'continue' inside a for loop that iterated over the question set to avoid any with the 'used' value set to true. When the game was finished, all the objects' 'used' value was set back to false, which made implementing a 'restart' feature straightforward.

## Instructions
* Start the game and answer as many questions as possible
* A correct answer gets you a point. 
* Running out of time, or getting the answer wrong results in a 0 score for that question
* 13 Questions in total.
* Get 80% or higher and you win the game !

[Play it here](https://davidlapadula.github.io/TriviaGame/)
