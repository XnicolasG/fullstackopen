import { useState } from 'react';

export const Togglable = (props) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            {!visible ? (
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            ) : (
                <div>
                    {props.children}
                    <button onClick={toggleVisibility}>Cancel</button>
                </div>
            )}
        </div>
    );
};
