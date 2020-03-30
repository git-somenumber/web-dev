"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textRegex = new RegExp('{text}');
var styleRegex = new RegExp('{style-here}');
var Base = /** @class */ (function () {
    /**
       * @param {string} style
       */
    function Base(style) {
        this.contents = '';
        this.styles = style;
        this.html = '<span style="{style-here}" id="{id-here}" class="{class-here}">{text}</span>';
        this.currentHtml = this.html.replace(styleRegex, style);
        this.currentHtml = this.currentHtml.replace(textRegex, this.contents);
    }
    /**
       * @param {string} char
       */
    Base.prototype.add = function (char) {
        this.contents += char;
        this.currentHtml = this.html.replace(textRegex, this.contents);
    };
    /**
       * @param {string} styles
       */
    Base.prototype.addStyle = function (styles) {
        this.styles += styles;
        this.currentHtml = this.html.replace(styleRegex, this.styles);
        console.log(this.currentHtml + 'style Log');
    };
    /**
       *
       * @param {string} style
       */
    Base.prototype.resetStyle = function (style) {
        this.styles = style;
    };
    /**
       * @returns {string} Rendered Content
       */
    Base.prototype.render = function () {
        var h = this.currentHtml.replace(styleRegex, this.styles);
        console.log(h);
        return this.currentHtml.replace(styleRegex, this.styles);
    };
    return Base;
}());
exports.Base = Base;
/**
 *
 */
var Line = /** @class */ (function () {
    /**
       *
       * @param {number} line
       * @param {string} style
       */
    function Line(line, style) {
        if (style === void 0) { style = ''; }
        this.line = line;
        this.bases = [];
        this.bases[0] = new Base(style);
        this.html = '<span style="{style-here}" id="{id-here}" class="{class-here}">{text}</span>';
        this.currentBase = 0;
        this.end = false;
    }
    /**
       *
       * @param {string} character to be added
       */
    Line.prototype.add = function (ch) {
        this.bases[this.currentBase].add(ch);
    };
    /**
       * Ends the line
       */
    Line.prototype.endLine = function () {
        this.end = true;
    };
    /**
       * Adds a new line to the editor
       */
    Line.prototype.newLine = function () {
        return new Line(this.line + 1, this.bases[this.currentBase].styles);
    };
    /**
       * Adds style to the line
       * @param {string} styles
       */
    Line.prototype.addStyle = function (styles) {
        this.bases[this.currentBase].addStyle(styles);
    };
    /**
       * Replaces the style for the line
       * @param {string} style
       */
    Line.prototype.resetStyle = function (style) {
        this.bases[this.currentBase].resetStyle(style);
    };
    /**
       * (Helper)
       * Returns html for the line
       * @returns {string} HTML to be put into DOM
       */
    Line.prototype.toHTML = function () {
        var currentHtml = '';
        this.bases.forEach(function (base) {
            currentHtml += base.render();
        });
        if (this.end) {
            currentHtml += '<br>';
        }
        console.log(currentHtml);
        return this.html.replace(textRegex, currentHtml);
    };
    /**
       * Creates a new base for the styles to
       * be added in between line.
       * @param {string} style
       */
    Line.prototype.addBase = function (style) {
        if (style === void 0) { style = ''; }
        this.bases.push(new Base(style));
        this.currentBase++;
    };
    /**
       * Leaves a base so that we may continue
       * with default style for the line.
       */
    Line.prototype.escapeBase = function () {
        this.currentBase--;
    };
    return Line;
}());
exports.Line = Line;
var Editor = /** @class */ (function () {
    function Editor() {
        this.lines = [];
        this.lineNum = 0;
    }
    /**
       * Adds a line to the editor
       * @param {Line} line
       */
    Editor.prototype.addLine = function (line) {
        this.lines[this.lineNum] = line;
        this.lineNum++;
    };
    Editor.prototype.newLine = function () {
        var line = new Line(this.lineNum, '');
        this.addLine(line);
        return line;
    };
    /**
       * Renders the final html to be put into DOM
       */
    Editor.prototype.toHTML = function () {
        var html = '';
        this.lines.forEach(function (line) {
            html += line.toHTML();
        });
        return html;
    };
    return Editor;
}());
exports.Editor = Editor;
var List = /** @class */ (function () {
    function List(type) {
        if (type === void 0) { type = 'O'; }
        var Ohtml = '<ol>{items}</ol>';
        var Uhtml = '<ul>{items}</ul>';
        var itemHTML = '<li>{item}</li>';
        this.refHtml = {
            O: Ohtml,
            U: Uhtml,
            item: itemHTML
        };
        if (type === 'O') {
            this.html = this.refHtml.O;
        }
        else if (type === 'U') {
            this.html = this.refHtml.U;
        }
        this.items = []; //  Text Only
        this.currentItem = 0;
    }
    List.prototype.newItem = function () {
        this.currentItem++;
    };
    List.prototype.render = function () {
        var _this = this;
        var finalHtml = '';
        this.items.forEach(function (item) {
            finalHtml += _this.refHtml.item.replace(new RegExp('{item}'), item);
        });
        return this.currentHtml.replace(new RegExp('{items}'), finalHtml);
    };
    List.prototype.add = function (ch) {
    };
    return List;
}());
exports.List = List;
