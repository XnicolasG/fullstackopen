import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

export const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({ toggleVisibility }))

    return (
        <section>
            {!visible ? (
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            ) : (
                <div>
                    {props.children}
                    <button onClick={toggleVisibility}>{props.buttonVisibility}</button>
                </div>
            )}
        </section>
    );
})
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonVisibility: PropTypes.string.isRequired,

}
Togglable.displayName = "Togglable";
