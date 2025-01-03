const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy } = require('../utils/list_helpers')

test('Dummy returns 1', () => {
    const blogs = []

    const result = dummy(blogs)
    assert.strictEqual(result, 1)
})