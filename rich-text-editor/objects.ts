const textRegex = new RegExp('{text}')
const styleRegex = new RegExp('{style-here}')

class Base {
  contents: string
  styles: string
  html: string
  currentHtml: any
  /**
     * @param {string} style
     */
  constructor (style: string) {
    this.contents = ''
    this.styles = style
    this.html = '<span style="{style-here}" id="{id-here}" class="{class-here}">{text}</span>'
    this.currentHtml = this.html.replace(styleRegex, style)
    this.currentHtml = this.currentHtml.replace(textRegex, this.contents)
  }

  /**
     * @param {string} char
     */
  add (char: string) {
    this.contents += char
    this.currentHtml = this.html.replace(textRegex, this.contents)
  }

  /**
     * @param {string} styles
     */
  addStyle (styles: string) {
    this.styles += styles
    this.currentHtml = this.html.replace(styleRegex, this.styles)
    console.log(this.currentHtml + 'style Log')
  }

  /**
     *
     * @param {string} style
     */
  resetStyle (style: string) {
    this.styles = style
  }

  /**
     * @returns {string} Rendered Content
     */
  render (): string {
    const h = this.currentHtml.replace(styleRegex, this.styles)
    console.log(h)
    return this.currentHtml.replace(styleRegex, this.styles)
  }
}

/**
 *
 */
class Line {
  line: any
  bases: any[]
  html: string
  currentBase: number
  end: boolean
  /**
     *
     * @param {number} line
     * @param {string} style
     */
  constructor (line: number, style: string = '') {
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
  add (ch: string) {
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
  addStyle (styles: string) {
    this.bases[this.currentBase].addStyle(styles)
  }

  /**
     * Replaces the style for the line
     * @param {string} style
     */
  resetStyle (style: string) {
    this.bases[this.currentBase].resetStyle(style)
  }

  /**
     * (Helper)
     * Returns html for the line
     * @returns {string} HTML to be put into DOM
     */
  toHTML (): string {
    let currentHtml = ''
    this.bases.forEach(base => {
      currentHtml += base.render()
    })

    if (this.end) {
      currentHtml += '<br>'
    }
    console.log(currentHtml)
    return this.html.replace(textRegex, currentHtml)
  }

  /**
     * Creates a new base for the styles to
     * be added in between line.
     * @param {string} style
     */
  addBase (style: string = '') {
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
  lines: any[]
  lineNum: number
  constructor () {
    this.lines = []
    this.lineNum = 0
  }

  /**
     * Adds a line to the editor
     * @param {Line} line
     */
  addLine (line: Line) {
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

class List {
  refHtml: { O: string; U: string; item: string }
  html: any
  items: any[]
  currentItem: number
  currentHtml: any
  constructor (type = 'O') {
    const Ohtml = '<ol>{items}</ol>'
    const Uhtml = '<ul>{items}</ul>'
    const itemHTML = '<li>{item}</li>'
    this.refHtml = {
      O: Ohtml,
      U: Uhtml,
      item: itemHTML
    }
    if (type === 'O') {
      this.html = this.refHtml.O
    } else if (type === 'U') {
      this.html = this.refHtml.U
    }
    this.items = [] //  Text Only
    this.currentItem = 0
  }

  newItem () {
    this.currentItem++
  }

  render () {
    var finalHtml = ''
    this.items.forEach(item => {
      finalHtml += this.refHtml.item.replace(new RegExp('{item}'), item)
    })

    return this.currentHtml.replace(new RegExp('{items}'), finalHtml)
  }

  add (ch: string) {
  }
}

export { Editor, Line, Base, List }
