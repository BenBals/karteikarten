do ->
  options = document.getElementsByTagName('option')

  window.multiSelectSelected = []

  setSelected = ->
    window.multiSelectSelected = []
    for i of options
      options[i].selected = selected[i]
      if options[i].selected
        window.multiSelectSelected.push(options[i].value)
    return

  getSelected = ->
    for i of options
      selected[i] = options[i].selected
    return

  init = ->
    i = 0
    while i < options.length

      options[i].onmousedown = (e) ->
        j = e.target.index
        selected[j] = !selected[j]
        setSelected()
        false

      i++
    return

  selected = []
  select = undefined
  init()
  return