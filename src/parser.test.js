/* eslint-disable no-underscore-dangle */

const parser = require('./parser.js')

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
