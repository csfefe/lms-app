import Changeable from './Changeable';


export default class AbstractModal extends Changeable {
  constructor(props) {
    super(props);
    this.state.open = false;
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });
}
