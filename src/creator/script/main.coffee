# init
console.log 'karteikarten creator v0.0.1 - ALPHA awesome alfred'

#init autosize
autosize(x('textarea').es())

data = {
  config:
    random: true
  data: []
}

# functions
appendNewRow = ->
  tr = document.createElement('tr')
  tr.innerHTML = '<td><textarea placeholder="Vorderseite"></textarea></td><td><textarea placeholder="Rückseite"></textarea></td>'
  x('tbody').e().appendChild(tr)
  x('tbody > tr').on 'keypress', changedData

changedData = ->
  console.log 'changedData'
  setTimeout ->
    if x('tbody > tr:last-child > td > textarea').val()[0] != '' or x('tbody > tr:last-child > td > textarea').val()[1] != ''
      console.log 'changed last-child'
      appendNewRow()
    viewToDataObj()
  , 5

getDataJsonString = ->
  return JSON.stringify(data)

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


# event handler
x('tbody > tr').on 'keypress', changedData