import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import { Blog } from "../components/Blog";

test('Test show ', async () => {
    const blog = {
        title: 'Test Blog',
        author: 'Percy',
        url: 'http://test-url.com',
        likes: 5,
    };
    console.log(screen.debug());

    render(<Blog blogItem={blog} />)

    const urlElement = screen.getByText('Url: http://test-url.com');
    const likesElement = screen.getByText('Likes: 5');
    const title = screen.getByTestId('blog_title')
    const author = screen.getByTestId('blog_author')


    expect(title).toHaveTextContent('Test Blog')
    expect(author).toHaveTextContent('Percy')

    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();

    expect(urlElement.offsetParent).toBeNull();
    expect(likesElement.offsetParent).toBeNull();
});