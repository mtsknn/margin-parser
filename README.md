# Margin parser

A simple parser for [Margin](https://margin.love/), a lightweight markup
language.

## Try it out

1. `npm i`
2. `npm start` &ndash; a browser will open
3. Modify the `input` variable in `src/playground.js` &ndash; the browser will
   automatically refresh with the new parsed JSON

Run `npm t` to run tests. Many tests are still missing.

## Remarks

Some features are not 100% compliant with the current Margin specs:

- A single tab is counted as a single space since it's unclear how they should
  treated ([gamburg/margin #5][])
- Annotations with children are interpreted as valueless items instead of
  annotations belonging to their first(?) child, and only the topmost children
  can be annotations of the parent ([gamburg/margin #17][])
- Annotations are represented as `{ type, value }` objects (the `value` is
  optional) instead of `{ [type]: value | null }` ([gamburg/margin #18][])
- In addition to `[`, also `]` can be escaped, as can `:` (but only inside
  annotations), and `\n` is treated as a newline (but not inside annotations)
  ([gamburg/margin #21][])

[gamburg/margin #5]: https://github.com/gamburg/margin/issues/5
[gamburg/margin #17]: https://github.com/gamburg/margin/issues/17
[gamburg/margin #18]: https://github.com/gamburg/margin/issues/18
[gamburg/margin #21]: https://github.com/gamburg/margin/issues/21
