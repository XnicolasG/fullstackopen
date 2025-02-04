const Blog = require("../models/blog");
const User = require("../models/user");

const dummy = blogs => {
    if (blogs) return 1;
}

const totalLikes = blogs => {
    if (blogs.length > 0) {
        return blogs.reduce((acc, blog) => acc + blog.likes, 0);
    } else {
        return 0;
    }
}

const favoriteBlog = blogs => {
    if (blogs.length > 0) {
        return blogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc,
            blogs[0]);
    } else {
        return 0;
    }
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return null

    const countMostBlogs = () => {
        return blogs.reduce((count, blog) => {
            count[blog.author] = (count[blog.author] || 0) + 1
            console.log(count);
            return count;
        }, {})
    }
    const authors = countMostBlogs()
    let maxBlogs = 0;
    let topAuthor ;

    for (const author in authors) {
        if (authors[author] > maxBlogs) {
           maxBlogs = authors[author]
           topAuthor = author
        }
        console.log(author+':', authors[author]);
        
    }
    return {author: topAuthor, blogs: maxBlogs}
}

const mostLikes = blogs => {
    if (blogs.length === 0) return null
    const countLikes = () => {
        return blogs.reduce((count, blog) => {
            count[blog.author] = (count[blog.author] || 0) + blog.likes
            return count
        },{})
    }
    const authors = countLikes()
    let totalLikes = 0;
    let topAuthor = '';

    for (const author in authors) {
        if (authors[author] > totalLikes) {
           totalLikes = authors[author]
           topAuthor = author
        }
    }
    return {author: topAuthor, likes: totalLikes}
}

const initialBlogs = [
    {
        title: 'Understanding JavaScript Closures',
        author: 'John Doe',
        url: 'https://example.com/javascript-closures',
        likes: 10
    },
    {
        title: 'Introduction to Node.js',
        author: 'Jane Smith',
        url: 'https://example.com/intro-to-nodejs',
        likes: 15
    },
    {
        title: 'Exploring Async and Await in JavaScript',
        author: 'Alice Brown',
        url: 'https://example.com/async-await',
        likes: 20
    },
    {
        title: 'Building REST APIs with Express',
        author: 'Bob Johnson',
        url: 'https://example.com/rest-apis-express',
        likes: 5
    },
    {
        title: 'A Guide to MongoDB for Beginners',
        author: 'Charlie Davis',
        url: 'https://example.com/mongodb-guide',
        likes: 25
    }
];

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
}