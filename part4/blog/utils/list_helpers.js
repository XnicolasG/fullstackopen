const dummy = blogs => {
    if (blogs) return 1;
}

const totalLikes = blogs => {
    if (blogs.length > 0) {
        return blogs.reduce((acc, blog) => acc + blog.likes, 0);
    }else {
        return 0;
    }
}

module.exports = {
    dummy,
    totalLikes
}