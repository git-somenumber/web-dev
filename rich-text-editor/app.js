"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objects_1 = require("./objects");
var cursorP = document.getElementById('cursor');
// eslint-disable-next-line camelcase
var italicsButton = document.getElementById('italics');
var boldButton = document.getElementById('bold');
var underlineButton = document.getElementById('underline');
var editorDiv = document.getElementById('editor');
// eslint-disable-next-line no-unused-vars
var content = editorDiv.innerHTML;
var letters = new RegExp('[A-z]{1}| |[0-9]');
var editor = new objects_1.Editor();
console.log('working');
var line = editor.newLine();
editorDiv.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        console.log('Left');
    }
    else if (event.keyCode === 39) {
        console.log('Right');
    }
    else if (event.key.match(RegExp('Shift|CapsLock|Alt|Meta'))) {
    }
    else if (event.key.match(RegExp('Tab'))) {
    }
    else if (event.key.match(RegExp('Enter'))) {
        line.endLine();
        line = editor.newLine();
    }
    else if ((event.key.match(letters))) {
        line.add(event.key);
    }
    else {
        console.log(event);
    }
    editorDiv.innerHTML = editor.toHTML() + '<span id="cursor">|</span>';
});
var boldStatus = false;
boldButton.addEventListener('click', function (event) {
    styleEditor('font-weight:bold;', boldStatus);
    boldStatus = !boldStatus;
    console.log(boldStatus);
});
var italicsStatus = false;
italicsButton.addEventListener('click', function (event) {
    styleEditor('font-style:italic;', italicsStatus);
    console.log(italicsStatus);
    italicsStatus = !italicsStatus;
});
var underlineStatus = false;
underlineButton.addEventListener('click', function (event) {
    console.log('Underline');
    styleEditor('text-decoration: underline;', underlineStatus);
    underlineStatus = !underlineStatus;
});
function styleEditor(style, status) {
    if (!status) {
        console.log(style);
        line.addBase(style);
    }
    else if (status) {
        console.log('Un ' + style);
        line.addBase();
    }
}
