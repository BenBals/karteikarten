# init
console.log 'karteikarten v0.3 - BETA admantium armadillo'
$( document ).ready ->
  # toastr config
  toastr.options.preventDuplicates = true

  # SumoSelect config
  $('.dataSelect').SumoSelect {
    'placeholder': 'URL auswählen'
  }

  if getQueryVar('dataURL') != false
    loadData(getQueryVar('dataURL'))

# config variables
animationTime = 500
JSONLoadCheckInterval = 10

# data variables

# inits the data variabels
data = {}
data.allCards = []
data.random = false


# main functions

# handels the data movement behind answering and moves the card to the appropriate stack and fires of nextCard()
answer = ->
  data.lastAnsweredCard = data.unansweredCards.splice(0, 1)[0]

answerRight = ->
  data.rightCards.push(data.lastAnsweredCard)
  nextCard()

answerWrong = ->
  data.wrongCards.push(data.lastAnsweredCard)
  nextCard(true)


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

loadData = (queryURL) ->

  # check wheter the input or the dropdown was used or the query stirng and seperating the urls and adding them to the urls array
  urls = []

  if queryURL
    urls = queryURL.trim().split(',')
  else if $('.dataSelect').val() is null
    urls = $('input.jsonUrl').val().trim().split(', ').join(',').split(',')
  else
    urls = $('.dataSelect').val()
  console.log 'the urls are '
  console.log urls
  toastr.info('Laden...')

  # init loaded data as emply array to hold all jsonData responses
  loadedData = []
  loadFail = false

  # looping over the urls
  for url in urls
    # running them throug rawgit
    url = url.split('gist.githubusercontent.com').join('cdn.rawgit.com')
    # do not use the CDN in dev
    if window.location.hostname is 'localhost'
      url = url.split('cdn.').join('')

    # init the loading process
    $.getJSON url, (jsonData) ->
      loadedData.push jsonData
      # set the loadFail variable to true when one file fails
    .fail -> loadFail = true

    console.log 'start loading', url

  # creating an interval that checks whether all data is loaded every JSONLoadCheckInterval seconds
  JSONLoadCheckInterval = setInterval ->
    if loadedData.length is urls.length
      console.log 'all data loaded'

      console.log loadedData
      # check if we only load one file
      if loadedData.length is 1
        # check if it has a config
        if loadedData[0] instanceof Array
          data.allCards = loadedData[0]
        else
          data.allCards = loadedData[0].data.shuffle()
          data.random = loadedData[0].config.random
      else
        # loop over all loaded files
        for dataThing in loadedData
          console.log dataThing
          if dataThing instanceof Array
            data.allCards = data.allCards.concat(dataThing)
          else
            data.allCards = data.allCards.concat(dataThing.data)

        data.allCards.shuffle()

      # do the visual stuff
      flipCard()
      setTimeout ->
        init()
        $('.front').show()
        $('.back').hide()
        $('.allDone').hide()
        $('.selectData').hide()
        # $('.totalCardN').html data.allCards.length
        $('.progressbar').fadeIn 'fast'
        updateProgressBar()
        toastr.clear()
      ,animationTime/2

      #add the url(s) to the hash query string
      addQueryVar('dataURL', urls.join(','))
      toastr.info('Kopiere einfach die URL aus der Leiste und sende sende sie an jemandem und er spielt mit den gleichen karteikarten.')

      # clear the interval
      clearInterval(JSONLoadCheckInterval)

    # exit and notify the user when the loading fails
    if loadFail
      toastr.clear()
      toastr.error('Es ist ein Fehler beim Laden der Daten aufgetreten. Kontrolliere die URL(s) bzw. die Datenquelle(n).')
      clearInterval(JSONLoadCheckInterval)

  ,JSONLoadCheckInterval

# gets the next card (swing out and in, fires of the flipCard() and setTextOnCard() functions and increases data.currCard)
nextCard = (wrongBool) ->
  updateProgressBar()

  if wrongBool
    $('.card').addClass 'swingOut-wrong'
  else
    $('.card').addClass 'swingOut-right'
  setTimeout ->
    $('.card').removeClass 'swingOut-wrong'
    $('.card').removeClass 'swingOut-right'
    $('.card').addClass 'swingIn'
    setTimeout ->
      $('.card').removeClass 'swingIn'
    ,animationTime
  ,animationTime

  if data.random
    data.unansweredCards.shuffle()

  flipCard()
  data.currCard++
  # $('.currentCardN').html data.currCard
  setTimeout ->
    setTextOnCard()
  ,animationTime/2


# handels the play again buttons, sets the data and fires of the reset and restarts the game
playAgian = ->
  console.log 'runnig playAgian'
  setTimeout ->
    $('.allDone').hide()
    $('.front').show()
  ,animationTime/2

playAgainAllCards = ->
  flipCard()
  setTimeout ->
    init()
  ,animationTime/2

playAgainWrongCards = ->
  flipCard()
  setTimeout ->
    init(true)
  ,animationTime/2

reset = ->
  window.location.hash = ''
  window.location.href = window.location.href.split('#')[0]

# tools

# add a variable in the query string wich is hidden in the hash string
addQueryVar = (name, val) ->
  hash = window.location.hash

  if hash.startsWith('#?')
    window.location.hash += '&' + String(name) + '=' + String(val)
  else
    window.location.hash = '?' + String(name) + '=' + String(val)

# handels the flip animation for a given element
flipElement = (selector) ->
  $(selector).addClass 'flip'
  setTimeout ->
    $(selector).removeClass 'flip'
  ,animationTime

# flips the card using flipElement()
flipCard = ->
  console.log 'runnig flip card'
  flipElement('.card')
  setTimeout ->
    $('.front').toggle()
    $('.back').toggle()
  ,animationTime/2

# get a query variable (hidden in the hash) from the url by name
getQueryVar = (name) ->
  # get the entire query string and remove the &
  query = window.location.hash.substring(2)
  # split the query string
  vars = query.split('&')
  # loop over the query sting pairs and return the value if the name matches
  for varString in vars
    pair = varString.split('=')
    if pair[0] == name then return pair[1]
  # otherwise return false
  return false

# takes the percent values for right, wrong and unanwered and sets the progress bar acordingly
setProgressBar = (right, wrong, unanswered) ->
  $('.progressbar .unanswered').width unanswered + '%'
  $('.progressbar .right').width right + '%'
  $('.progressbar .wrong').width wrong + '%'

  $('.progressbar .wrong').css 'left', right + '%'
  $('.progressbar .unanswered').css 'left', (right + wrong) + '%'

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

# when called it calculates the percentages for right, wrong and unanswered and passes them to the setProgressBar function
updateProgressBar = ->
  right = data.rightCards.length / data.allCards.length * 100
  wrong = data.wrongCards.length / data.allCards.length * 100
  unanswered = data.unansweredCards.length / data.allCards.length * 100

  setProgressBar right, wrong, unanswered

# Proto improvements

# adds a shuffle method to every array that puts the item of that arry into a random order
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

# play agian buttons
$('.btnAgainAll, .btnAgainWrong').click -> playAgian()
$('.btnAgainAll').click -> playAgainAllCards()
$('.btnAgainWrong').click -> playAgainWrongCards()

# get the json data button
$('.btnSubmitJson').click -> loadData()

# reset button
$('.btnReset').click -> reset()