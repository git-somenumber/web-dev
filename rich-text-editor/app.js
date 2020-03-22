const cursorP = document.getElementById('cursor')
// eslint-disable-next-line camelcase
const italicsButton = document.getElementById('italics')
const boldButton = document.getElementById('bold')
const underlineButton = document.getElementById('underline')
const editorDiv = document.getElementById('editor')

// eslint-disable-next-line no-unused-vars
var content = editorDiv.innerHTML
const letters = new RegExp('[A-z]{1}| |[0-9]')
const editor = new Editor()

console.log('working')
var line = editor.newLine()

editorDiv.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) {
    console.log('Left')
  } else if (event.keyCode === 39) {
    console.log('Right')
  } else if (event.key.match(RegExp('Shift|CapsLock|Alt|Meta'))) {
  } else if (event.key.match(RegExp('Tab'))) {

  } else if (event.key.match(RegExp('Enter'))) {
    line.endLine()
    line = editor.newLine()
  } else if ((event.key.match(letters))) {
    line.add(event.key)
  } else {
    console.log(event)
  }
  content = editor.toHTML()
})

var boldStatus = false
boldButton.addEventListener('click', function (event) {
  if (!boldStatus) {
    console.log('Bold')
    line.addBase('font-weight:bold;')
    boldStatus = !boldStatus
  } else if (boldStatus) {
    line.escapeBase()
    console.log('unBold')
    boldStatus = !boldStatus
  }
  console.log(boldStatus)
})

italicsButton.addEventListener('click', function (event) {
  console.log('Italics')
  line.addStyle('font-style:italic;')
})

underlineButton.addEventListener('click', function (event) {
  line.addStyle('text-decoration: underline;')
  console.log('Underline')
})
