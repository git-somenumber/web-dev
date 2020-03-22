const textRegex = new RegExp('{text}')
const styleRegex = new RegExp('{style-here}')

class Base {
  /**
     * @param {string} style
     */
  constructor (style) {
    this.contents = ''
    this.styles = style
    this.html = '<span style="{style-here}" id="{id-here}" class="{class-here}">{text}</span>'
    this.currentHtml = this.html.replace(textRegex, style)
  }

  /**
     * @param {string} char
     */
  add (char) {
    this.contents += char
    this.currentHtml = this.html.replace(textRegex, this.contents)
  }

  /**
     * @param {string} styles
     */
  addStyle (styles) {
    this.styles += styles
    this.currentHtml = this.html.replace(styleRegex, this.styles)
  }

  /**
     *
     * @param {string} style
     */
  resetStyle (style) {
    this.styles = style
  }

  /**
     * @returns {string} Rendered Content
     */
  render () {
    return this.currentHtml.replace(styleRegex, this.styles)
  }
}

/**
 *
 */
class Line {
  /**
     *
     * @param {int} line
     * @param {string} style
     */
  constructor (line, style = '') {
    this.line = line
    this.bases = []
    this.bases[0] = new Base(style)
    this.html = '<span style="{style-here}" id="{id-here}" class="{class-here}">{text}</span>'
    this.currentBase = 0
    this.end = false
  }

  /**
     *
     * @param {string} character to be added
     */
  add (ch) {
    this.bases[this.currentBase].add(ch)
  }

  /**
     * Ends the line
     */
  endLine () {
    this.end = true
  }

  /**
     * Adds a new line to the editor
     */
  newLine () {
    return new Line(this.line + 1, this.bases[this.currentBase].styles)
  }

  /**
     * Adds style to the line
     * @param {string} styles
     */
  addStyle (styles) {
    this.bases[this.currentBase].addStyle(styles)
  }

  /**
     * Replaces the style for the line
     * @param {string} style
     */
  resetStyle (style) {
    this.bases[this.currentBase].resetStyle(style)
  }

  /**
     * (Helper)
     * Returns html for the line
     * @returns {string} HTML to be put into DOM
     */
  toHTML () {
    let currentHtml = ''
    this.bases.forEach(base => {
      currentHtml += base.render()
    })

    if (this.end) {
      currentHtml += '<br>'
    }

    return this.html.replace(textRegex, currentHtml)
  }

  /**
     * Creates a new base for the styles to
     * be added in between line.
     * @param {string} style
     */
  addBase (style = '') {
    this.bases.push(new Base(style))
    this.currentBase++
  }

  /**
     * Leaves a base so that we may continue
     * with default style for the line.
     */
  escapeBase () {
    this.currentBase--
  }
}

class Editor {
  constructor () {
    this.lines = []
    this.lineNum = 0
  }

  /**
     * Adds a line to the editor
     * @param {int} line
     */
  addLine (line) {
    this.lines[this.lineNum] = line
    this.lineNum++
  }

  newLine () {
    const line = new Line(this.lineNum, '')
    this.addLine(line)
    return line
  }

  /**
     * Renders the final html to be put into DOM
     */
  toHTML () {
    var html = ''
    this.lines.forEach(line => {
      html += line.toHTML()
    })
    return html
  }
}
