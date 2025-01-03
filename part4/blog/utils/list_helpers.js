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
    if (blogs.length < 0) return null

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}