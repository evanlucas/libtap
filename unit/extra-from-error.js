'use strict'
const t = require('/usr/local/lib/node_modules/tap') // require('../')
const extraFromError = require('../lib/extra-from-error.js')

const cases = [
  [new Error('ok'), null, null, {
    at: { file: 'unit/extra-from-error.js' },
    message: null
  }],

  [new Error('ok'), { foo: 'bar' }, null, {
    at: { file: 'unit/extra-from-error.js' },
    foo: 'bar'
  }],

  [new Error('ok'), null, { foo: 'bar', tapChild: 1234 }, {
    at: { file: 'unit/extra-from-error.js' },
    foo: 'bar',
    tapChild: null
  }],

  [new Error('ok'), { foo: 'bar' }, { foo: 'XXX', tapChild: 1234 }, {
    at: { file: 'unit/extra-from-error.js' },
    foo: 'bar',
    tapChild: null
  }],

  ['not an error', null, null, { error: 'not an error' }],

  [new Error(''), null, null, {
    at: { file: 'unit/extra-from-error.js' },
    message: null
  }],

  [{stack: null, foo: 'baz', message: 'this is fine'}, null, null, {
    stack: null,
    foo: 'baz',
    message: null
  }],

  [{ name: 'asdf' }, null, null, {
    type: 'asdf',
    message: null
  }]
]

cases.forEach(c => t.match(extraFromError(c[0], c[1], c[2]), c[3]))
