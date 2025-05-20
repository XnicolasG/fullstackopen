import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import { Blog } from "../components/Blog";
import userEvent from "@testing-library/user-event";

test('Test show title and author by default ', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Percy',
        url: 'http://test-url.com',
        likes: 5,
    };
    render(<Blog blogItem={blog} />)

    const title = screen.getByTestId('blog_title')
    const author = screen.getByTestId('blog_author')

    expect(title).toHaveTextContent('Test Blog')
    expect(author).toHaveTextContent('Percy')
});
test('clicking the button shows url and likes details', async()=>{
    const blog = {
        title: 'Test Blog',
        author: 'Percy',
        url: 'http://test-url.com',
        likes: 5,
    };
    render(<Blog blogItem={blog} />)
    expect(screen.queryByTestId('blog_url')).toBeNull()
    expect(screen.queryByTestId('blog_likes')).toBeNull()

    const user = userEvent.setup()
    const button = screen.getByTestId('blog_showbutton')
    await user.click(button)

    expect(screen.getByTestId('blog_url')).toBeInTheDocument();
    expect(screen.getByTestId('blog_likes')).toBeInTheDocument();
})
test('Click twice the like button will call the event twice', async ()=> {
    const blog = {
        title: 'Test Blog',
        author: 'Percy',
        url: 'http://test-url.com',
        likes: 5,
    };

    
    const mockHandler = vi.fn()
    render(<Blog blogItem={blog} handleLikes={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByTestId('blog_showbutton')
    await user.click(button)
    
    expect(screen.getByTestId('blog_url')).toBeInTheDocument();
    expect(screen.getByTestId('blog_likes')).toBeInTheDocument();
    

    const likebutton = screen.getByTestId('blog_likebutton')
    await user.click(likebutton)
    await user.click(likebutton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})