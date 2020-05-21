/* eslint-disable no-underscore-dangle */

const parser = require('./parser.js')

describe('parseAnnotation', () => {
  const parseAnnotation = parser.__get__('parseAnnotation')

  test('empty value', () => {
    expect(parseAnnotation('')).toEqual({ type: '' })
  })

  test('no colon', () => {
    expect(parseAnnotation('foo')).toEqual({ type: 'foo' })
    expect(parseAnnotation('foo bar baz ')).toEqual({ type: 'foo bar baz ' })
    expect(parseAnnotation(' -- ')).toEqual({ type: ' -- ' })
  })

  test('single colon', () => {
    expect(parseAnnotation('foo:')).toEqual({ type: 'foo', value: '' })
    expect(parseAnnotation('foo: ')).toEqual({ type: 'foo', value: ' ' })
    expect(parseAnnotation('foo: bar')).toEqual({ type: 'foo', value: ' bar' })
    expect(parseAnnotation('foo :bar')).toEqual({ type: 'foo ', value: 'bar' })
    expect(parseAnnotation('foo : bar')).toEqual({
      type: 'foo ',
      value: ' bar',
    })
    expect(parseAnnotation(': bar')).toEqual({ type: '', value: ' bar' })
    expect(parseAnnotation(' : bar')).toEqual({ type: ' ', value: ' bar' })
  })

  test('many colons', () => {
    expect(parseAnnotation('foo::bar')).toEqual({ type: 'foo', value: ':bar' })
    expect(parseAnnotation('foo: bar: baz')).toEqual({
      type: 'foo',
      value: ' bar: baz',
    })
    expect(parseAnnotation('foo: :bar:')).toEqual({
      type: 'foo',
      value: ' :bar:',
    })
    expect(parseAnnotation(': :bar:')).toEqual({ type: '', value: ' :bar:' })
    expect(parseAnnotation(':: :bar:')).toEqual({ type: '', value: ': :bar:' })
  })

  test('escaped colon(s)', () => {
    expect(parseAnnotation('foo\\: bar')).toEqual({ type: 'foo: bar' })
    expect(parseAnnotation('foo\\: bar: baz')).toEqual({
      type: 'foo: bar',
      value: ' baz',
    })
    expect(parseAnnotation('foo\\: bar\\: baz')).toEqual({
      type: 'foo: bar: baz',
    })
    expect(parseAnnotation('foo: bar\\: baz')).toEqual({
      type: 'foo',
      value: ' bar: baz',
    })
    expect(parseAnnotation(': bar\\: baz')).toEqual({
      type: '',
      value: ' bar: baz',
    })
    expect(parseAnnotation('\\: bar\\: baz')).toEqual({ type: ': bar: baz' })
    expect(parseAnnotation('\\:\\: \\:bar\\:')).toEqual({ type: ':: :bar:' })
  })
})

describe('getOffset', () => {
  const getOffset = parser.__get__('getOffset')

  test('no offset', () => {
    expect(getOffset('foo')).toBe(0)
  })

  test('space offsets', () => {
    expect(getOffset('  foo')).toBe(2)
    expect(getOffset('    foo')).toBe(4)
  })

  test('tab offsets', () => {
    expect(getOffset('\tfoo')).toBe(1)
    expect(getOffset('\t\tfoo')).toBe(2)
  })

  test('mixed offsets', () => {
    expect(getOffset('\t foo')).toBe(2)
    expect(getOffset(' \tfoo')).toBe(2)
    expect(getOffset(' \t foo')).toBe(3)
  })
})
