import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';


const CelledTable = ({ children }) => <Table celled>{children}</Table>;

CelledTable.propTypes = { children: PropTypes.node.isRequired };

export default CelledTable;
