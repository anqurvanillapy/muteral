'use strict'

const defaultConfig = {
  childList: true,
  attributes: true,
  characterData: true
}

class Dispatcher {
  constructor () {
    this.parts = {}
  }

  set parts (part) {
    let name
    while (true) {
      name = this._gethash()
      if (this.parts[name] === undefined) {
        this.parts[name] = part
        break
      }
    }
  }

  _gethash = () => `${Math.random()}`.slice(2)
}

const parser = new DOMParser()
const dispatcher = new Dispatcher()

const commentize = (strings, exprs) => {
  let temp = ''
  strings.forEach((s, i) => {
    switch (i) {
      case 0:
        s = `${s}<!--`
        break
      case strings.length - 1:
        s = `-->${s}`
        break
      default:
        s = `-->${s}<!--`
    }
    temp += s + (exprs[i] || '')
  })
  return temp
}

const transformComments = root => {
  const walker = document.createTreeWalker(
    root, 128 /* NodeFilter.SHOW_COMMENT */, null, false)
  const nodesToReplace = []
}

const htmlTemplate = (strings, ...exprs) => {
  const text = commentize(strings, exprs)
  const root = parser.parseFromString(text, 'text/html')
  transformComments(root)
}

export const m = htmlTemplate
