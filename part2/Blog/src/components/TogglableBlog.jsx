import PropTypes from 'prop-types';
import { useState } from 'react';

export const TogglableBlog = (props) => {
    const [visible, setVisible] = useState(true);

    const toggleVisibility = () => {
        setVisible(!visible);
    };
    const buttonLabel = visible ? 'View' : 'Hide'
    return (
        <section className={`${!visible && 'outline-2 outline-sky-300'} outline-1 my-2`}>
                <section className='flex items-center gap-4'>
                    <p className={`${!visible && 'hidden'}`}>{props.title}</p>
                    <button onClick={toggleVisibility} >{buttonLabel}</button>
                </section>
                
            {
                !visible && 
            <div>
                {props.children}
            </div>
            }
        </section>
    )
}
TogglableBlog.propTypes = {
    title: PropTypes.string.isRequired
    
}