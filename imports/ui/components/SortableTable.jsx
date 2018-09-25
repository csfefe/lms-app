import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';


const SortableTable = ({ children }) => <Table celled fixed sortable>{children}</Table>;

SortableTable.propTypes = { children: PropTypes.node.isRequired };

export default SortableTable;
