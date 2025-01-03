const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helpers')

test('Dummy returns 1', () => {
    const blogs = []

    const result = dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
    ]

    test('When list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

describe('return favorite blog', () => {
    const listOfBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Tolkien's Story",
            author: "anon",
            likes: 8
        }
    ]

    test('bring the object with most likes', () => {
        const result = favoriteBlog(listOfBlogs)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})