import React from 'react';

export default function ColumnOptions({ children, style = {}, ...props }) {
    return (
        <div {...props} style={{ display: 'inline-flex', flexDirection: 'row', ...style }}>
            { children }
        </div>
    )
}