let ornaments = '[ \\t*﹡＊\\-–—_:>+]+'
ornaments = new RegExp(`^${ornaments}|${ornaments}$`, 'g')

// TODO: Get rid of this global variable?
let lines = []

function parseMargin(input) {
  lines = input
    .split('\n')
    .filter(line => line.replace(ornaments, '').length > 0)
  const root = {
    annotations: [],
    children: [],
  }

  while (lines[0]) {
    const line = lines.shift()
    append(line, root)
  }

  return root
}

function append(line, parent) {
  const [value, annotations] = parseLine(line)
  const isAnnotation = value.length === 0 && annotations.length === 1

  // Only the first childless annotation children are annotations of the parent;
  // the rest are regular children with empty values
  if (parent.children.length === 0 && isAnnotation && !hasChildren(line)) {
    parent.annotations.push(annotations[0])
    return
  }

  const item = {
    raw_data: line,
    value,
    annotations,
    children: [],
  }
  parent.children.push(item)

  while (hasChildren(line)) {
    const indentedLine = lines.shift()
    append(indentedLine, item)
  }
}

function parseLine(line) {
  const text = line.replace(ornaments, '')

  let value = ''
  const annotations = []

  let inAnnotation = false
  let nestLevel = 0
  let annotation = ''

  for (let i = 0; i < text.length; i++) {
    const prevChar = text[i - 1]
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '\\' && nextChar === 'n') {
      value += '\n'
      i++
    } else if (char === '\\' && (nextChar === '[' || nextChar === ']')) {
      // continue
    } else if (char === '[' && prevChar !== '\\') {
      if (inAnnotation) {
        nestLevel++
        annotation += char
      } else {
        inAnnotation = true
        nestLevel = 0
      }
    } else if (char === ']' && prevChar !== '\\' && inAnnotation) {
      if (nestLevel > 0) {
        nestLevel--
        annotation += char
      } else {
        inAnnotation = false
        annotations.push(parseAnnotation(annotation))
        annotation = ''
      }
    } else if (inAnnotation) {
      annotation += char
    } else {
      value += char
    }
  }

  // The annotation was never terminated, so it's part of the value (including
  // the starting bracket)
  if (inAnnotation) value += '[' + annotation

  return [value.trim(), annotations]
}

function hasChildren(line) {
  return lines[0] && getOffset(lines[0]) > getOffset(line)
}

function parseAnnotation(text) {
  const match = text.match(/[^\\]?:/)

  if (match === null) return { type: text }

  const i = match.index + (match[0] === ':' ? 0 : 1)

  return {
    type: text.substring(0, i),
    value: text.substring(i + 1),
  }
}

function getOffset(line) {
  return line.match(/^[ \t]+/)?.[0].length || 0
}
