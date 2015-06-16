# init
console.log 'karteikarten creator v0.2.1 - ALPHA concerned caro'

x('').ready ->
  loadFromLocalStorage()
  dataObjToView()
  doAutosize()

data = {
  config:
    random: true
  data: []
}

config = {
  animationTime: 500
}

# functions
doAutosize = ->
  for e in x('textarea').es()
    autosize(e)

appendNewRow = ->
  tr = document.createElement('tr')
  tr.innerHTML = '<td><textarea placeholder="Vorderseite"></textarea></td><td><textarea placeholder="Rückseite"></textarea></td>'
  x('tbody').e().appendChild(tr)
  x('tbody > tr').on 'keypress', changedData
  doAutosize()

changedData = ->
  setTimeout ->
    if x('tbody > tr:last-child > td > textarea').val()[0] != '' or x('tbody > tr:last-child > td > textarea').val()[1] != ''
      console.log 'changed last-child'
      appendNewRow()
    viewToDataObj()
    saveToLocalStorage()
  , 5

dataObjToView = ->
  x('tbody').html('')
  for card in data.data
    tr = document.createElement('tr')
    tr.innerHTML = "<td><textarea placeholder='Vorderseite'>#{card[0]}</textarea></td><td><textarea placeholder='Rückseite'>#{card[1]}</textarea></td>"
    x('tbody').e().appendChild(tr)
  appendNewRow()


getDataJsonString = ->
  viewToDataObj()
  return JSON.stringify(data)
    .split('<script>').join('&lt;script&gt;')
    .split('</script>').join('&lt;/script&gt;')
    .split('\\n').join('<br>')

load = (obj) ->
  data = obj
  dataObjToView()

loadFromLocalStorage = ->
  data = JSON.parse(localStorage.data)

publish = ->
  publishObj = {
    description: 'karteikarten data json obj',
    public: true,
    files: {
      'karteikartenData.json': {
        content: getDataJsonString()
      }
    }
  }

  request = new XMLHttpRequest()

  request.addEventListener 'load', (e) ->
    response = JSON.parse(e.target.responseText)
    console.log response
    url = response.files['karteikartenData.json'].raw_url
    console.log response
    console.log url
    closeModal()
    setTimeout ->
      setModal('published')
      x('.gistUrl').val(url)
      openModal()
    , config.animationTime

  request.addEventListener 'error', (e) ->
    console.error e
    humane.log('There was an error publishing. Try again later.')

  request.open('POST', 'https://api.github.com/gists')
  request.send(JSON.stringify(publishObj))


saveToLocalStorage = ->
  localStorage.data = JSON.stringify(data)


viewToDataObj = ->
  # load all karteikarten
  trs = x('tr').es().length - 2
  data.data = []
  for trN in [1..trs]
    textareas = x('tr:nth-child(' + trN + ') > td > textarea').val()
    vorderseite = textareas[0]
    rückseite = textareas[1]
    data.data.push [vorderseite, rückseite]
  return true


# modal stuff
setModal = (whatClass) ->
  x('.modal .' + whatClass).css('display', 'block')
  if whatClass is 'export'
    x('.modal .export textarea').val(getDataJsonString())


openModal = ->
  x('.modal').addClass('swingIn')
  x('.modal').css('display', 'block')
  setTimeout ->
    x('.modal').removeClass('swingIn')
  , config.animationTime

closeModal = ->
  x('.modal').addClass('swingOut')
  setTimeout ->
    x('.modal').css('display', 'none')
    x('.modal .export').css('display', 'none')
    x('.modal .load').css('display', 'none')
    x('.modal .publish').css('display', 'none')
    x('.modal').removeClass('swingOut')
  , config.animationTime


# event handler
x('td > textarea').on 'keypress', changedData

x('.closeModal').on 'click', closeModal

x('.exportBtn').on 'click', ->
  setModal('export')
  openModal()

x('.newBtn').on 'click', ->
  data.data = []
  saveToLocalStorage()
  dataObjToView()

x('.publishBtn').on 'click', ->
  setModal('publish')
  openModal()

x('.loadBtn').on 'click', ->
  setModal('load')
  openModal()

x('.publishGo').on 'click', publish

x('.loadGo').on 'click', ->
  load(JSON.parse(x('.inputJson').val()))
  closeModal()