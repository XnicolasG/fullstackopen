import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

export const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({ toggleVisibility }))

    return (
        <div>
            {!visible ? (
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            ) : (
                <div className='togglableContent'>
                    {props.children}
                    <button onClick={toggleVisibility}>Cancel</button>
                </div>
            )}
        </div>
    );
})
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable";
