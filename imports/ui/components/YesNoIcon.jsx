import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from 'semantic-ui-react';


const YesNoIcon = ({ condition }) => (
  condition ?
    <Icon name="checkmark" color="blue" /> :
    <Icon name="close" color="red" />
);

YesNoIcon.propTypes = { condition: PropTypes.bool.isRequired };

export default YesNoIcon;
