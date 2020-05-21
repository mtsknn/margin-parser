import parseMargin from './parser.js'

const input = String.raw`
  [foo]
  [ foo ]
  [category: Foo :D]
  [annotation with a [nested] annotation]
  [:value]

  ** Shopping **
    [x] Groceries
    [x] Milk
    [x] Kale
    [ ] Frozen Fish [Note: Any sort of white fish, not cod]

  ** Projects **
    Portfolio [] Website
    --------------------
      Front-end
        [ ]] Disallow [zoom\] on] mobile[
        [[ ]] Fix homepage \[grid] on [mobile
      Back-end
        Wordpress
          [ ] Update plugins   [date:2019/07/07]
        Server
          [ ] Renew hosting    [date : 2020/01/07]
          [ ] Upgrade to PHP 7 [date : '2020/02/14']
`

const result = parseMargin(input)
document.querySelector('#output').textContent = JSON.stringify(result, null, 2)
