import React from 'react';
import MenuSuperior from './Menu/MenuSuperior'

function Layout( props ){
    //const children = props.children;
    return (
        <React.Fragment>
            <MenuSuperior />
            {props.children}
        </React.Fragment>

    );
}
export default Layout;