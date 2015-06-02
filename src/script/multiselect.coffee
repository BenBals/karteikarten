`
(function () {
	var options = document.getElementsByTagName('option');
	var selected = [];
	var select;

	function setSelected() {
	  for (var i in options)
	    options[i].selected = selected[i];
	}

	function getSelected() {
	  for (var i in options)
	    selected[i] = options[i].selected;
	}

	function init() {
	  for (var i = 0; i < options.length; i++) {
	    options[i].onmousedown = function(e) {
	      var j = e.target.index;
	      selected[j] = !selected[j];
	      setSelected();
	      
	      return false;
	    }
	  }
	}

	init();
})()
`