var answer, answerRight, answerWrong, check, data, flipCard, flipElement, init, loadData, nextCard, playAgainAllCards, playAgainWrongCards, playAgian, setTextOnCard;

console.log('karteikarten v0.1');

data = {};

data.allCards = [];

answer = function() {
  data.lastAnsweredCard = data.unansweredCards.splice(0, 1)[0];
  return nextCard();
};

answerRight = function() {
  return data.rightCards.push(data.lastAnsweredCard);
};

answerWrong = function() {
  return data.wrongCards.push(data.lastAnsweredCard);
};

check = function() {
  return flipCard();
};

init = function(wichCards) {
  if (!!wichCards === false) {
    data.unansweredCards = data.allCards.slice();
  } else {
    data.unansweredCards = data.wrongCards.slice();
  }
  data.rightCards = [];
  data.wrongCards = [];
  data.currCard = 0;
  return setTextOnCard();
};

loadData = function() {
  var url;
  url = $('input.jsonUrl').val();
  return $.getJSON(url, function(jsonData) {
    data.allCards = jsonData;
    console.log(jsonData);
    flipCard();
    return setTimeout(function() {
      init();
      $('.front').show();
      $('.back').hide();
      $('.allDone').hide();
      return $('.selectData').hide();
    }, 500);
  }).fail(function() {
    return alert('Es ist ein Fehler beim laden der Daten aufgetreten. Bitte lade die Seite neu und versuche es noch einmal');
  });
};

nextCard = function() {
  $('.card').addClass('swingOut');
  setTimeout(function() {
    $('.card').removeClass('swingOut');
    $('.card').addClass('swingIn');
    return setTimeout(function() {
      return $('.card').removeClass('swingIn');
    }, 1000);
  }, 1000);
  flipCard();
  data.currCard++;
  return setTimeout(function() {
    return setTextOnCard();
  }, 500);
};

playAgian = function() {
  console.log('runnig playAgian');
  return setTimeout(function() {
    $('.allDone').hide();
    return $('.front').show();
  }, 500);
};

playAgainAllCards = function() {
  flipCard();
  return setTimeout(function() {
    return init();
  }, 500);
};

playAgainWrongCards = function() {
  flipCard();
  return setTimeout(function() {
    return init(true);
  }, 500);
};

flipElement = function(selector) {
  $(selector).addClass('flip');
  return setTimeout(function() {
    return $(selector).removeClass('flip');
  }, 1000);
};

flipCard = function() {
  console.log('runnig flip card');
  flipElement('.card');
  return setTimeout(function() {
    $('.front').toggle();
    return $('.back').toggle();
  }, 500);
};

setTextOnCard = function() {
  console.log('running setTextOnCard');
  if (data.allCards.length === 0) {
    console.log('there is no data');
    $('.front').hide();
    $('.back').hide();
    $('.allDone').hide();
    return $('.selectData').show();
  } else if (data.unansweredCards.length > 0) {
    $('.q').html(data.unansweredCards[0][0]);
    $('.a').html(data.unansweredCards[0][1]);
    $('.front').show();
    $('.back').hide();
    $('.allDone').hide();
    return $('.selectData').hide();
  } else {
    $('.front').hide();
    $('.back').hide();
    $('.allDone').show();
    $('.selectData').hide();
    if (data.wrongCards.length === 0) {
      return $('.btnAgainWrong').hide();
    } else {
      return $('.btnAgainWrong').show();
    }
  }
};

$('.checkBtn').click(function() {
  return check();
});

$('.btnRight, .btnWrong').click(function() {
  return answer();
});

$('.btnRight').click(function() {
  return answerRight();
});

$('.btnWrong').click(function() {
  return answerWrong();
});

$('.btnAgainAll, .btnAgainWrong').click(function() {
  return playAgian();
});

$('.btnAgainAll').click(function() {
  return playAgainAllCards();
});

$('.btnAgainWrong').click(function() {
  return playAgainWrongCards();
});

$('.btnSubmitJson').click(function() {
  return loadData();
});
