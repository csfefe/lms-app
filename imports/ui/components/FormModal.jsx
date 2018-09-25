import AbstractModal from './AbstractModal';


export default class FormModal extends AbstractModal {
  constructor(props) {
    super(props);
    this.state.formError = false;
  }

  handleSuccess = () => this.setState({ open: false, formError: false });

  submitCallback = onSuccess => (error) => {
    if (error) {
      console.error(error);
      this.state.formError = true;
    } else {
      onSuccess();
    }
  };
}
