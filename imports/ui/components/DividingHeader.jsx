import PropTypes from 'prop-types';
import React from 'react';
import { Header } from 'semantic-ui-react';


const DividingHeader = ({ children }) => <Header as="h1" dividing>{children}</Header>;

DividingHeader.propTypes = { children: PropTypes.node.isRequired };

export default DividingHeader;
