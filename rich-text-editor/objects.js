class Base {
    constructor(style) {
        this.contents = "";
        this.styles = style;
    }

    /**
     * @param {string} char
     */
    add(char) {
        this.contents += char;
    }

    addStyle(styles) {
        this.styles += styles;
    }

    resetStyle(style) {
        this.styles = style;
    }


}

class Line {
    constructor(line, style = '') {
        this.line = line;
        this.base = new Base(style);
        this.html = `<span style="{style-here}">{text}</span>`;
    }

    add(ch){
        this.base.add(ch)
    }

    end(){
        this.html += '<br>';
    }

    newLine(){
        return new Line(this.line+1,this.base.styles);
    }

    addStyle(styles) {
        this.base.addStyle(styles)
    }

    resetStyle(style) {
        this.base.resetStyle(style);
    }

    toHTML(){
        const textRegex = new RegExp("{text}");
        const styleRegex = new RegExp("{style-here}");
        var htmlWithText = this.html.replace(textRegex, this.base.contents);
        console.log(this.base.styles);
        return htmlWithText.replace(styleRegex, this.base.styles);
    }
}

class Editor {
    constructor(){
        this.lines = {};
        this.lineNum = 1;
    }

    addLine(line){
        const x = "line" + this.lineNum;
        this.lines[x] = line;
        this.lineNum++;
    }

    newLine(){
        let line = new Line(this.lineNum,'');
        this.addLine(line);
        return line;
    }

    toHTML(){
        var html = "";
        for(var i = 1;i<this.lineNum;i++){
            var index = "line" + i;
            html += this.lines[index].toHTML();
        }
        return html;
    }
}

