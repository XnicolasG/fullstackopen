import { render, screen } from "@testing-library/react"
import { Note } from "../components/Note"
import userEvent from "@testing-library/user-event"
// import { expect, test } from "vitest"


test('renders content', async() => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    render(<Note note={note} />)

    // screen.debug()
    /*const element =*/
   await screen.findByText('Component testing is done with react-testing-library')
    // screen.debug(element)

    // expect(element).toBeDefined()


    //Usando selectores CSS:
    /*
    const { container } = render(<Note note={note} />)

    const div = container.querySelector('.note')
        expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    */
})

test('clicking the button calls event hanlde once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const mockHander = vi.fn()

    render(<Note note={note} toggleImportance={mockHander} />)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHander.mock.calls).toHaveLength(1)
})