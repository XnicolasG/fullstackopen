import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event/dist/cjs/setup/index.js"
import { CreateForm } from "../components/CreateForm"

test('<CreateForm /> submit a a proper form', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<CreateForm handleAdd={createBlog} />)

    const inputTitle = screen.getByTestId('title')
    const inputAuthor = screen.getByTestId('author')
    const inputUrl = screen.getByTestId('url')
    const submitButton = screen.getByTestId('form_submitbutton')

    await user.type(inputTitle, 'Testing is cool')
    await user.type(inputAuthor, 'SrPizza Dev')
    await user.type(inputUrl, 'example.com/Testing-is-cool')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1);
    console.log(createBlog.mock.calls[0][1]);
    expect(createBlog.mock.calls[0][1].title).toBe('Testing is cool')
    expect(createBlog.mock.calls[0][1].author).toBe('SrPizza Dev')
    expect(createBlog.mock.calls[0][1].url).toBe('example.com/Testing-is-cool')
})