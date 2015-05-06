# init
console.log 'karteikarten v0.1.5'
$( document ).ready ->
  # toastr config
  toastr.options.preventDuplicates = true


# data variables

# inits the data variabels
data = {}
data.allCards = []
data.random = false


# main functions

# handels the data movement behind answering and moves the card to the appropriate stack and fires of nextCard()
answer = ->
  data.lastAnsweredCard = data.unansweredCards.splice(0, 1)[0]
  nextCard()

answerRight = ->
  data.rightCards.push(data.lastAnsweredCard)

answerWrong = ->
  data.wrongCards.push(data.lastAnsweredCard)


# handels the event from the check button and flips the card
check = ->
  flipCard()

# sets the data.unansweredCards array from the appropriate source and resets all other values
init = (wichCards) ->
  if !!wichCards == false
    data.unansweredCards = data.allCards.slice()
  else
    data.unansweredCards = data.wrongCards.slice()

  data.rightCards = []
  data.wrongCards = []

  data.currCard = 0

  setTextOnCard()

loadData = ->
  url = ''
  if $('.dataSelect').val() is ''
    url = $('input.jsonUrl').val()
  else
    url = $('.dataSelect').val()

  console.log url
  toastr.info('Laden...')
  $.getJSON url, (jsonData) ->
    console.log typeof jsonData
    if jsonData instanceof Array
      data.allCards = jsonData
    else
      data.allCards = jsonData.data.shuffle()
      data.random = jsonData.config.random
    console.log jsonData
    flipCard()
    setTimeout ->
      init()
      $('.front').show()
      $('.back').hide()
      $('.allDone').hide()
      $('.selectData').hide()
      # $('.totalCardN').html data.allCards.length
    ,500
  .fail ->
    toastr.clear()
    toastr.error('Es ist ein Fehler beim Laden der Daten aufgetreten. Kontrolliere die URL bzw. die Datenquelle.')
  .done ->
    toastr.clear()
  

# gets the next card (swing out and in, fires of the flipCard() and setTextOnCard() functions and increases data.currCard)
nextCard = ->
  $('.card').addClass 'swingOut'
  setTimeout ->
    $('.card').removeClass 'swingOut'
    $('.card').addClass 'swingIn'
    setTimeout ->
      $('.card').removeClass 'swingIn'
    ,1000
  ,1000

  if data.random
    data.unansweredCards.shuffle()

  flipCard()
  data.currCard++
  # $('.currentCardN').html data.currCard
  setTimeout ->
    setTextOnCard()
  ,500


# handels the play again buttons, sets the data and fires of the reset and restarts the game
playAgian = ->
  console.log 'runnig playAgian'
  setTimeout ->
    $('.allDone').hide()
    $('.front').show()
  ,500

playAgainAllCards = ->
  flipCard()
  setTimeout ->
    init()
  ,500

playAgainWrongCards = ->
  flipCard()
  setTimeout ->
    init(true)
  ,500



# tools

# handels the flip animation for a given element
flipElement = (selector) ->
  $(selector).addClass 'flip'
  setTimeout ->
    $(selector).removeClass 'flip'
  , 1000

# flips the card using flipElement()
flipCard = ->
  console.log 'runnig flip card'
  flipElement('.card')
  setTimeout ->
    $('.front').toggle()
    $('.back').toggle()
  , 500

# sets the text on the card to the valuse provided by the first (0th) element in the data.unansweredCards array
setTextOnCard = ->
  console.log 'running setTextOnCard'
  if data.allCards.length == 0
    console.log 'there is no data'
    $('.front').hide()
    $('.back').hide()
    $('.allDone').hide()
    $('.selectData').show()

  else if data.unansweredCards.length > 0
    $('.q').html data.unansweredCards[0][0]
    $('.a').html data.unansweredCards[0][1]

    $('.front').show()
    $('.back').hide()
    $('.allDone').hide()
    $('.selectData').hide()
  
  else
    $('.front').hide()
    $('.back').hide()
    $('.allDone').show()
    $('.selectData').hide()

    if data.wrongCards.length == 0
      $('.btnAgainWrong').hide()
    else
      $('.btnAgainWrong').show()


# Proto improvements

Array::shuffle = ->
  i = @length
  j = undefined
  temp = undefined
  if i == 0
    return this
  while --i
    j = Math.floor(Math.random() * (i + 1))
    temp = @[i]
    @[i] = @[j]
    @[j] = temp
  this


# Event listeners

# check button
$('.checkBtn').click -> check()

# answered right or wrong buttons
$('.btnRight, .btnWrong').click -> answer()
$('.btnRight').click -> answerRight()
$('.btnWrong').click -> answerWrong()

#play agian buttons
$('.btnAgainAll, .btnAgainWrong').click -> playAgian()
$('.btnAgainAll').click -> playAgainAllCards()
$('.btnAgainWrong').click -> playAgainWrongCards()

#get the json data button
$('.btnSubmitJson').click -> loadData()
