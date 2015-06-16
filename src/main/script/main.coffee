# init
console.log 'karteikarten v0.5.4 - BETA ceasium chameleon'
x('.ready').ready ->
  # humane config
  humane.clickToClose = true

  if getQueryVar('dataURL') != false
    loadData(getQueryVar('dataURL'))

# config variables
animationTime = 500

# data variables

# inits the data variabels
data = {}
data.allCards = []
data.random = false
data.state = 'selectData'


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
  updateProgressBar()

loadData = (queryURL) ->

  console.log 'running loadData'

  # check wheter the input or the dropdown was used or the query stirng and seperating the urls and adding them to the urls array
  urls = []

  if queryURL
    urls = queryURL.trim().split(',')
  else if x('.dataSelect').val()[0] is ""
    urls = x('input.jsonUrl').val()[0].trim().split(', ').join(',').split(',')
  else
    urls = getMultiselectValues()
  
  humane.log('Laden...')
  console.log urls

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
    x().httpReq url,
    (req) ->
      loadedData.push JSON.parse(req.response)
      checkDataLoad()
      # set the loadFail variable to true when one file fails
    ,->
      loadFail = true
      checkDataLoad()
    console.log 'start loading', url

  checkDataLoad = () ->
    # exit and notify the user when the loading fails
    if loadFail
      humane.remove()
      humane.log('Es ist ein Fehler beim Laden der Daten aufgetreten. Kontrolliere die URL(s) bzw. die Datenquelle(n).')

    if loadedData.length is urls.length
      console.log 'all data loaded'
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
          if dataThing instanceof Array
            data.allCards = data.allCards.concat(dataThing)
          else
            data.allCards = data.allCards.concat(dataThing.data)

        data.allCards.shuffle()

      # do the visual stuff
      humane.remove()
      flipCard()
      setTimeout ->
        init()
        setState('front')
        # x('.totalCardN').html data.allCards.length
        x('.progressbar').css 'display', 'block'
        updateProgressBar()
      ,animationTime/2

      #add the url(s) to the hash query string
      addQueryVar('dataURL', urls.join(','))
      humane.log('Kopiere einfach die URL aus der Leiste und sende sende sie an jemandem und er spielt mit den gleichen karteikarten.')

# gets the next card (swing out and in, fires of the flipCard() and setTextOnCard() functions and increases data.currCard)
nextCard = (wrongBool) ->
  updateProgressBar()

  if wrongBool
    x('.card').addClass 'swingOut-wrong'
  else
    x('.card').addClass 'swingOut-right'
  setTimeout ->
    x('.card').removeClass 'swingOut-wrong'
    x('.card').removeClass 'swingOut-right'
    x('.card').addClass 'swingIn'
    setTimeout ->
      x('.card').removeClass 'swingIn'
    ,animationTime
  ,animationTime

  if data.random
    data.unansweredCards.shuffle()

  flipCard()
  data.currCard++
  # x('.currentCardN').html data.currCard
  setTimeout ->
    setTextOnCard()
  ,animationTime/2


# handels the play again buttons, sets the data and fires of the reset and restarts the game
playAgian = ->
  setTimeout ->
    setState('front')
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
  x(selector).addClass 'flip'
  setTimeout ->
    x(selector).removeClass 'flip'
  ,animationTime

# flips the card using flipElement()
flipCard = ->
  if data.state is 'front'
    data.state = 'back'
  else if data.state is 'back'
    data.state = 'front'
  flipElement('.card')
  setTimeout ->
    x('.front').toggle()
    x('.back').toggle()
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

getMultiselectValues = ->
  results = []
  options = x('.dataSelect option').es()

  for option in options
    if option.selected
      results.push(option.value)

  return results

# takes the percent values for right, wrong and unanwered and sets the progress bar acordingly
setProgressBar = (right, wrong) ->
  x('.progressbar .right').css 'width', right + '%'
  x('.progressbar .wrong').css 'width', wrong + '%'

  x('.progressbar .wrong').css 'left', right + '%'

# get the app into a specific state
setState = (stateId) ->
  data.state = stateId

  x('.front').css 'display', 'none'
  x('.back').css 'display', 'none'
  x('.allDone').css 'display', 'none'
  x('.selectData').css 'display', 'none'

  x('.' + stateId).css 'display', 'block'

# sets the text on the card to the valuse provided by the first (0th) element in the data.unansweredCards array
setTextOnCard = ->
  if data.allCards.length == 0
    console.log 'there is no data'
    setState('selectData')

  else if data.unansweredCards.length > 0
    scr = '<scr'
    ipt = 'ipt>'
    script = scr + ipt
    sscript = '</scr' + ipt
    x('.q').html data.unansweredCards[0][0].split(script).join('&lt;script&gt;').split(sscript).join('&lt;/script&gt;')
    x('.a').html data.unansweredCards[0][1].split(script).join('&lt;script&gt;').split(sscript).join('&lt;/script&gt;')

    setState('front')
  
  else
    setState('allDone')

    humane.log('Psst. Profi-Tipp: Benutze <a href="https://github.com/BenBals/karteikarten/blob/master/README.md#shortcuts">Shortcuts<a>, wenn du auf einem Computer spielst.')

    if data.wrongCards.length == 0
      x('.btnAgainWrong').css 'display', 'none'
    else
      x('.btnAgainWrong').css 'display', 'block'

# when called it calculates the percentages for right, wrong and unanswered and passes them to the setProgressBar function
updateProgressBar = ->
  currentCardAmount = data.unansweredCards.length + data.rightCards.length + data.wrongCards.length

  right = data.rightCards.length / currentCardAmount * 100
  wrong = data.wrongCards.length / currentCardAmount * 100

  setProgressBar right, wrong


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
x('.checkBtn').on 'click', -> check()

# answered right or wrong buttons
x('.btnRight, .btnWrong').on 'click', -> answer()
x('.btnRight').on 'click', -> answerRight()
x('.btnWrong').on 'click', -> answerWrong()

# play agian buttons
x('.btnAgainAll, .btnAgainWrong').on 'click', -> playAgian()
x('.btnAgainAll').on 'click', -> playAgainAllCards()
x('.btnAgainWrong').on 'click', -> playAgainWrongCards()

# get the json data button
x('.btnSubmitJson').on 'click', -> loadData()

# reset button
x('.btnReset').on 'click', -> reset()

# shortcuts
x('body').on 'keypress', (ev) ->
  # enter
  if ev.keyCode is 13
    # on front -> check
    if data.state is 'front'
      check()
    # on back -> answered right
    else if data.state is 'back'
      answer()
      answerRight()
    # on all done -> play again with all cards
    else if data.state is 'allDone'
      playAgian()
      playAgainAllCards()
    # on select data -> load the data
    else if data.state is 'selectData'
      loadData()

  else if ev.keyCode is 32
    # on back -> answer wrong
    if data.state is 'back'
      answer()
      answerWrong()
    # on all done -> replay with the wrong cards
    else if data.state is 'allDone'
      playAgian()
      playAgainWrongCards()

  else if ev.keyCode is 82
    reset()