# init
console.log 'karteikarten creator v0.0.1 - ALPHA awesome alfred'

#init autosize
autosize(x('textarea').es())

data = {}

# functions
appendNewRow = ->
  tr = document.createElement('tr')
  tr.innerHTML = '<td><textarea placeholder="Vorderseite"></textarea></td><td><textarea placeholder="Rückseite"></textarea></td>'
  x('tbody').e().appendChild(tr)

checkAppendNewRow = ->
  if x('tbody > tr:last-child > td:first-child').html() != '' or x('tbody > tr:last-child > td:last-child').html() != ''
    console.log 'changed last item'
    x('tbody > tr:last-child').e().removeEventListener('click', arguments.callee)
    appendNewRow()
    x('tbody > tr:last-child').on 'keypress', checkAppendNewRow


# event handler
data.currentLastElementListener = x('tbody > tr:last-child').on 'keypress', checkAppendNewRow