import { Togglable } from "../components/Togglable";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"



describe('<Togglable />', () => {
    let container;

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" >
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    // test('renders its children', async () => {
    //     await screen.getByText('togglable content')
    // })

    test('at start the children are not displayed', async () => {
        expect(await screen.queryByText('togglable content')).toBeNull()
    })

     test('renders its children after clicking the button', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('show...');

        await user.click(button); 

        expect(await screen.findByText('togglable content')).toBeInTheDocument();
    });

    test('Togglable content can be closed', async()=>{
        const user = userEvent.setup();
        const button = screen.getByText('show...');

        await user.click(button); 

        const closeButton = screen.getByText('Cancel')

        await user.click(closeButton)
        expect(await screen.queryByText('togglable content')).toBeNull()

    })

})