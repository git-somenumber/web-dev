const cursor_p = document.getElementById('cursor');
const italics_button = document.getElementById("italics");
const bold_button = document.getElementById("bold");
const underline_button = document.getElementById("underline");
const editor_div = document.getElementById("editor");


var content = editor_div.innerHTML;
const letters = new RegExp('[A-z]{1}| |[0-9]');

console.log('working');
var text_line = '';
const line = `<span id=\'text\'>%text-in-this-line%</span>`;
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
    text_line += '<br>';
  }
  else if((event.key.match(letters))){
    text_line += event.key;
  }
  else{
    console.log(event)
  }
  text_line += cursor_p;
  editor_div.innerHTML = line.replace('%text-in-this-line%', text_line);
});

bold_button.addEventListener('click',function(event){

  console.log('Bold');
});

italics_button.addEventListener('click',function(event){

  console.log('Italics');
});

underline_button.addEventListener('click',function(event){

  console.log('Underline');
});

