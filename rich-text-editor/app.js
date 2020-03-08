const cursor_p = document.getElementById('cursor');
const italics_button = document.getElementById("italics");
const bold_button = document.getElementById("bold");
const underline_button = document.getElementById("underline");
const editor_div = document.getElementById("editor");


var content = editor_div.innerHTML;
const letters = new RegExp('[A-z]{1}| |[0-9]');
const editor = new Editor();

console.log('working');
var line = editor.newLine();

editor_div.addEventListener('keydown', function(event){  
  if(event.keyCode == 37) {
    console.log('Left');
  }
  else if(event.keyCode == 39) {
    console.log('Right');
  }
  else if(event.key.match(RegExp('Shift|CapsLock'))){
  }
  else if(event.key.match(RegExp('Tab'))){
    text_line += '    ';
  }
  else if(event.key.match(RegExp('Enter'))){
    line.end();
    line = editor.newLine();
  }
  else if((event.key.match(letters))){
    line.add(event.key);
  }
  else{
    console.log(event)
  }
  editor_div.innerHTML = editor.toHTML();
});

bold_button.addEventListener('click',function(event){
  console.log('Bold');
  line.addStyle('font-weight:bold;')
});

italics_button.addEventListener('click',function(event){
  console.log('Italics');
  line.addStyle('font-style:italic;')
});

underline_button.addEventListener('click',function(event){
  console.log('Underline');
});

