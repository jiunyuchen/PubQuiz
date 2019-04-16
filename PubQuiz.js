var gameLevel = 1; // game level:easy, medium and hard
var actualArray = []; // an array hold the actual order of answers
var correctAnswer = ''; // for correct answer
var currentQuestion = 0;

var prize = 0; // how much money user can get
var mistakeTimes = 0;
var timerSeconds = 20; // 20 second for each question
var questions;



$("#resultPage").hide(); // hide the result page

//timer
var Timer = setInterval(function() {
  // when time is up, run confirmAnswer function
  if (timerSeconds === 0) {
    $('.Timer').text(timerSeconds + " Seconds");
    alert("Time's up!");
    confirmAnswer();
  } else {
    $('.Timer').text(timerSeconds + " Seconds");
    timerSeconds--;
  }
},1000);

start();


// when game is over, the question div will be hindden and the result page and prize will be show up
function gameover() {
  $('#nextLevel').hide(); // when game is over, user cannot go to next level
  $("#questionPage").hide(); // hide the question page
  $("#resultPage").show(); // show the result page
  $("#finishThisLevel").hide(); // if user give up or fail then cannot go to next level
  $("#prizegameover").html("You get " + prize + " pound!"); // show the prize user get
  clearInterval(Timer); // stop the timer
}

//allow user go to next levl
function nextLevelFN() {
  gameLevel++;
  start();
}

// when game is over, user can restart
function restart() {
  location.reload();
}

// when user finish one level, then can go to next level
function GoToNextLevel(){
  $('#nextLevel').show(); //shoe the button to next Level
  $("#gameover").hide(); // hide the Game Over text
  $("#restart").hide();
  $("#questionPage").hide(); // hide the question page
  $("#resultPage").show(); // show the result page
  $("#prizegameover").html("You get " + prize + " pound!");
  clearInterval(Timer); // stop the timer  }
}


function start(){
  $('#giveUpButton').hide(); // hide the give up button in first question
                            // user can only give up since question 2

  // This if statement is for three level:easy, medium and hard
  if (gameLevel == 1) {
  $.getJSON("https://opentdb.com/api.php?amount=10&difficulty=easy", function(data) {
    questions = data.results; //give JSON question data to 'questions'

    // show the number of question
    // because array start from 0 so need to +1
    currentQuestion = currentQuestion + 1;
    $("#questionNumber").html("Question" +  currentQuestion  + ":");
    currentQuestion = currentQuestion - 1;

    $("#question").html(questions[currentQuestion].question); // give the question to html page
    correctAnswer = questions[currentQuestion].correct_answer; // get currect answert into correctAnswer
    console.log('correct', correctAnswer); // tester can through console to get the correct answer and test this game

    // randomize the order of the first question answers and put them into the actualArray
    var answersArray = [questions[currentQuestion].correct_answer, questions[currentQuestion].incorrect_answers[0], questions[currentQuestion].incorrect_answers[1], questions[currentQuestion].incorrect_answers[2]];
    var actualArray = answersArray.sort(function(a, b) {
      return 0.5 - Math.random()
    });

    // puting the answers of actualArray into each label of html file and allowing user to choose
    $("#answer1").val(actualArray[0]);
    $('label[for=answer1]').html(actualArray[0]);
    $("#answer2").val(actualArray[1]);
    $('label[for=answer2]').html(actualArray[1]);
    console.log(actualArray);

    // if it is true/false question, hide another two option
    if (actualArray[2] === undefined) {
      $('#Lifeline').hide();
      $('#answer3').hide();
      $('#answer4').hide();
    } else {
      $("#answer3").val(actualArray[2]);
      $('label[for=answer3]').html(actualArray[2]);
      $("#answer4").val(actualArray[3]);
      $('label[for=answer4]').html(actualArray[3]);
    }
  })
 }

  // medium level
  else if (gameLevel == 2) {

    $.getJSON("https://opentdb.com/api.php?amount=10&difficulty=medium", function(data) {
      questions = data.results; //give JSON question data to 'questions'

      // because array start from 0 so need to +1
      currentQuestion = currentQuestion + 1;
      $("#questionNumber").html("Question" +  currentQuestion  + ":");
      currentQuestion = currentQuestion - 1;
      console.log("Medium" + questions[currentQuestion]);
      $("#question").html(questions[currentQuestion].question); // give the question to html page
      correctAnswer = questions[currentQuestion].correct_answer; // get currect answert into correctAnswer
      console.log('correct', correctAnswer);

      // randomize the order of the first question answers and put them into the actualArray
      var answersArray = [questions[currentQuestion].correct_answer, questions[currentQuestion].incorrect_answers[0], questions[currentQuestion].incorrect_answers[1], questions[currentQuestion].incorrect_answers[2]];
      var actualArray = answersArray.sort(function(a, b) {
        return 0.5 - Math.random()
      });
      $("#resultPage").hide();
      $("#questionPage").show(); // show the result page
      $('#answer1').show();
      $('#answer2').show();
      $('#answer3').show();
      $('#answer4').show();

      $('input:radio').prop("checked", false); // unselect all radio button

      $('#giveUpButton').show(); //user can give up since second question
      $('label[for=answer1]').html('');
      $('label[for=answer2]').html('');
      $('label[for=answer3]').html('');
      $('label[for=answer4]').html('');


      // puting the answers of actualArray into each label on html file and allowing user to choose
      $("#answer1").val(actualArray[0]);
      $('label[for=answer1]').html(actualArray[0]);
      $("#answer2").val(actualArray[1]);
      $('label[for=answer2]').html(actualArray[1]);
      console.log(actualArray);

      // if it is true/false question, hide another two option
      if (actualArray[2] === undefined) {
        $('#Lifeline').hide();
        $('#answer3').hide();
        $('#answer4').hide();
      } else {
        $("#answer3").val(actualArray[2]);
        $('label[for=answer3]').html(actualArray[2]);
        $("#answer4").val(actualArray[3]);
        $('label[for=answer4]').html(actualArray[3]);
      }

    })
    timerSeconds = 20;
    Timer = setInterval(function() {
      // when time is up, run confirmAnswer function
      if (timerSeconds === 0) {
        $('.Timer').text(timerSeconds + " Seconds");
        alert("Time's up!");
        confirmAnswer();
      } else {
        $('.Timer').text(timerSeconds + " Seconds");
        timerSeconds--;
      }
    },1000);

  }

  // hard level
  else if (gameLevel == 3) {

    $.getJSON("https://opentdb.com/api.php?amount=10&difficulty=hard", function(data) {
      questions = data.results; //give JSON question data to 'questions'

      // because array start from 0 so need to +1
      currentQuestion = currentQuestion + 1;
      $("#questionNumber").html("Question" +  currentQuestion  + ":");
      currentQuestion = currentQuestion - 1;

      $("#question").html(questions[currentQuestion].question); // give the question to html page
      correctAnswer = questions[currentQuestion].correct_answer; // get currect answert into correctAnswer
      console.log('correct', correctAnswer);

      // randomize the order of the first question answers and put them into the actualArray
      var answersArray = [questions[currentQuestion].correct_answer, questions[currentQuestion].incorrect_answers[0], questions[currentQuestion].incorrect_answers[1], questions[currentQuestion].incorrect_answers[2]];
      var actualArray = answersArray.sort(function(a, b) {
        return 0.5 - Math.random()
      });
      $("#resultPage").hide();
      $("#questionPage").show(); // show the result page
      $('#answer1').show();
      $('#answer2').show();
      $('#answer3').show();
      $('#answer4').show();

      $('input:radio').prop("checked", false); // unselect all radio button

      $('#giveUpButton').show(); //user can give up since second question
      $('label[for=answer1]').html('');
      $('label[for=answer2]').html('');
      $('label[for=answer3]').html('');
      $('label[for=answer4]').html('');
      // puting the answers of actualArray into each label on html file and allowing user to choose
      $("#answer1").val(actualArray[0]);
      $('label[for=answer1]').html(actualArray[0]);
      $("#answer2").val(actualArray[1]);
      $('label[for=answer2]').html(actualArray[1]);
      console.log(actualArray);

      // if it is true/false question, hide another two option
      if (actualArray[2] === undefined) {
        $('#Lifeline').hide();
        $('#answer3').hide();
        $('#answer4').hide();
      } else {
        $("#answer3").val(actualArray[2]);
        $('label[for=answer3]').html(actualArray[2]);
        $("#answer4").val(actualArray[3]);
        $('label[for=answer4]').html(actualArray[3]);
      }
    })
    timerSeconds = 20;
    clearInterval(Timer);
    Timer = setInterval(function() {
      // when time is up, run confirmAnswer function
      if (timerSeconds === 0) {
        $('.Timer').text(timerSeconds + " Seconds");
        alert("Time's up!");
        confirmAnswer();
      } else {
        $('.Timer').text(timerSeconds + " Seconds");
        timerSeconds--;
      }
    },1000);

  }

  else {
    gameover();
  }


}

// fuction for renew a new question
function renewQuestion() {

  actualArray = []; // clean the answer array
  $('#answer1').show();
  $('#answer2').show();
  $('#answer3').show();
  $('#answer4').show();

  $('input:radio').prop("checked", false); // unselect all radio button

  $('#giveUpButton').show(); //user can give up since second question
  $('label[for=answer1]').html('');
  $('label[for=answer2]').html('');
  $('label[for=answer3]').html('');
  $('label[for=answer4]').html('');

  currentQuestion = currentQuestion + 1 ;
  $("#questionNumber").html("Question" +  currentQuestion  + ":");
  currentQuestion = currentQuestion - 1 ;
  $("#question").text(questions[currentQuestion].question);

  console.log('correct', questions[currentQuestion].correct_answer);
  correctAnswer = questions[currentQuestion].correct_answer;
  // put the first question in the actualArray
  var answersArray = [questions[currentQuestion].correct_answer, questions[currentQuestion].incorrect_answers[0], questions[currentQuestion].incorrect_answers[1], questions[currentQuestion].incorrect_answers[2]];
  var actualArray = answersArray.sort(function(a, b) {
    return 0.5 - Math.random()
  });

  $("#answer1").val(actualArray[0]);
  $('label[for=answer1]').html(actualArray[0]);
  $("#answer2").val(actualArray[1]);
  $('label[for=answer2]').html(actualArray[1]);
  console.log(actualArray);
  if (actualArray[2] == undefined) {
    $('#Lifeline').hide();
    $('#answer3').hide();
    $('#answer4').hide();
  } else {
    $("#answer3").val(actualArray[2]);
    $('label[for=answer3]').html(actualArray[2]);
    $("#answer4").val(actualArray[3]);
    $('label[for=answer4]').html(actualArray[3]);
  }
}

function giveUp() {
  alert("Thank you for playing, you get " + prize + " pound");
  gameover();
}



// user have one opporunity to use lifeline (only once)
// using lifeline can hide two incorrect answers
function LifelineFN() {
  console.log("Lifeline is here");
  var temp = 1
  var found = 0
  while (temp <=3&&found<2) {

      if ($('#answer' + temp).val() != correctAnswer) {
      $('#answer' + temp).hide();
      $('label[for=answer'+temp+']').html('');
      console.log("Delete first");
      found++;
    }
     temp ++;
  }
       $('#Lifeline').hide();
}


// determine the answer user select is corrct or not
function confirmAnswer() {
  timerSeconds = 20;
  //the threshold will be 900 pound
  //if user get fail before receiving 900 pound, they will lose all the prize
  //if user get highter than 900 pound, their prize will not be withdrawn
  //user can also give up and get money

  //in this stage user can get 300 pound from each question
  if (prize < 900) {
    console.log(correctAnswer); // show correct answer in console
    if ($('#answer1').is(":checked")) {
      if ($('#answer1').val() == correctAnswer) {
        alert("Your answer is correct and you get 300 prize!");
        prize = prize + 300;
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    } else if ($('#answer2').is(":checked")) {
      if ($('#answer2').val() == correctAnswer) {
        alert("Your answer is correct and you get 300 prize!");
        prize = prize + 300;
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    } else if ($('#answer3').is(":checked")) {
      if ($('#answer3').val() == correctAnswer) {
        alert("Your answer is correct and you get 300 prize!");
        prize = prize + 300;
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    } else if ($('#answer4').is(":checked")) {
      if ($('#answer4').val() == correctAnswer) {
        alert("Your answer is correct and you get 300 prize!");
        prize = prize + 300;
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    }
    else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
    }

    $("#prize").html("You get " + prize + " pound!");
    $("#showMistakeTime").html("Mistake Times:" + mistakeTimes);
    console.log('The current prize is: ' + prize);
    console.log('The current mistakeTimes is: ' + mistakeTimes);
    currentQuestion++;

    if (currentQuestion < 10 && mistakeTimes < 3) {
      renewQuestion();
    } else if (currentQuestion < 10 && mistakeTimes >= 3) {
      alert("You already answered three questions incorrectly! Game is over!");
      prize = 0
      gameover();
    }
  } else { // if the prize higher than 900 pound, then user can come to next questionPage
          // in this stage, the prize will be mutpleed multiplied when user answer a question correctly
    console.log(correctAnswer); // show correct answer in console
    if ($('#answer1').is(":checked")) {
      if ($('#answer1').val() == correctAnswer) {
        prize = prize * 2;
        alert("Your answer is correct! You have gotten " + prize +"pound!" );
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    } else if ($('#answer2').is(":checked")) {
      if ($('#answer2').val() == correctAnswer) {
        prize = prize * 2;
        alert("Your answer is correct! You have gotten " + prize +"pound!" );
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    } else if ($('#answer3').is(":checked")) {
      if ($('#answer3').val() == correctAnswer) {
        prize = prize * 2;
        alert("Your answer is correct! You have gotten " + prize +"pound!" );
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    } else if ($('#answer4').is(":checked")) {
      if ($('#answer4').val() == correctAnswer) {
        prize = prize * 2;
        alert("Your answer is correct! You have gotten " + prize +"pound!" );
      } else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
      }
    }
    else {
        alert("Your answer is incorrect! Mistake Times + 1!");
        mistakeTimes = mistakeTimes + 1;
    }

    $("#prize").html("You get " + prize + " pound!");
    $("#showMistakeTime").html("Mistake Times:" + mistakeTimes);
    console.log('The current prize is: ' + prize);
    console.log('The current mistakeTimes is: ' + mistakeTimes);
    currentQuestion++;

    if (currentQuestion < 10 && mistakeTimes < 3) {
      renewQuestion();
    } else if (currentQuestion < 10 && mistakeTimes >= 3) {
      alert("You already answered three questions incorrectly! Game is over!");
      gameover();
    }
      else if (currentQuestion > 9) {
      alert("Congradulatioin! You finished the game! You get prize: " + prize + " !");
      GoToNextLevel(); // when user
    }
  }
}
