import React from 'react';

const TabPanel = (props) => {
    const { children, value, index, style, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            key={index}
            className={className}
            style={style}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}


export default TabPanel