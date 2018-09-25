import PropTypes from 'prop-types';
import React from 'react';
import { Menu } from 'semantic-ui-react';


const StackableMenu = ({ children }) => <Menu stackable inverted>{children}</Menu>;

StackableMenu.propTypes = { children: PropTypes.node.isRequired };

export default StackableMenu;
