import React from "react";
import actions from "../../../../actions";
import { Form, ValidateForm } from "react-form-library";
import { InputField, CheckboxField } from "../../../../components/Form";
import PropTypes from "prop-types";
import Loading from "../../../../components/Loading";
import WeightGradeModal from "./WeightGradeModel";
import ReactToolTip from "react-tooltip";
import { AgGridReact } from "ag-grid-react";

const requiredFields = {
  name: {
    type: "required",
  },
  weight: {
    type: "required",
  },
};

class WeightForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initializeState();
  }

  /*
   * If new weight is received, update form.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.weight && this.state.form.id !== nextProps.weight.id) {
      this.setState({ form: this.initializeFormData(nextProps.weight) });
    } else {
      this.setState({ form: this.initializeFormData() });
    }
  }

  /*
   * Method for intializing the state.
   *
   * @return [Object]. State object.
   */
  initializeState() {
    const { weight } = this.props;
    return {
      form: this.initializeFormData(weight),
      isPoints: this.props.boolPoints,
      loading: false,
      totalPointsFormValue: null,
      editPoints: false,
      openGradeModal: false,
    };
  }

  /*
   * Method for intializing form data.
   * Weight form data.
   *
   * @param [Object] data. initial data
   * @return [Object]. Form object.
   */
  initializeFormData(data) {
    let formData = data || {};
    const { id, name, weight } = formData;
    return {
      id: id || null,
      name: name || "",
      weight: weight || "",
      created_on: "Web",
    };
  }

  /*
   * Determine whether the user is submiting updated weight or a new weight.
   *
   */
  onSubmit(e) {
    e.preventDefault();
    const { form } = this.state;
    const { weight } = this.props;

    if (this.props.validateForm(form, requiredFields)) {
      form.id &&
      weight &&
      (form.name === weight.name || form.weight === weight.weight)
        ? this.onUpdateWeight()
        : this.onCreateWeight();
    }
  }

  onDelete() {
    const { form } = this.state;
    const { weight } = this.props;
    this.props.onDeleteWeight(weight);
  }
  /*
   * Create a new weight
   */
  onCreateWeight() {
    this.setState({ loading: true });
    actions.weights
      .createWeight(this.props.cl, this.state.form)
      .then((weight) => {
        this.setState({ form: this.initializeFormData(), loading: false });
        this.props.onCreateWeight(weight);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  /*
   * Update an existing weight
   */
  onUpdateWeight() {
    this.setState({ loading: true });
    actions.weights
      .updateWeight(this.props.cl, this.state.form)
      .then((weight) => {
        this.setState({ form: this.initializeFormData(), loading: false });
        this.props.onUpdateWeight(weight);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  /*
   * Delete weight.
   *
   * @param [Object] weight. The weight to be deleted.
   */
  onDeleteWeight(weight) {
    this.setState({ loading: true });
    actions.weights
      .deleteWeight(weight)
      .then(() => {
        this.setState({ form: this.initializeFormData(), loading: false });
        // this.props.onDeleteWeight(weight)
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  changePoints(isPoints, total) {
    this.setState({ editPoints: false });
    this.props.onTypeSelection(isPoints, total);
    this.toggleGradeModal();
  }

  onChangeTotalPoints(totalPoints) {
    this.setState({ totalPoints });
  }

  toggleGradeModal() {
    this.setState({ openGradeModal: !this.state.openGradeModal });
  }

  renderGradeModal() {
    const { cl } = this.props;
    const { openGradeModal, totalPoints } = this.state;
    return (
      <WeightGradeModal
        open={openGradeModal}
        onClose={this.toggleGradeModal.bind(this)}
        isPoints={cl.is_points}
        pointTotal={totalPoints || 100}
        onChange={this.onChangeTotalPoints.bind(this)}
        onSubmit={this.changePoints.bind(this)}
      />
    );
  }

  onNext() {
    this.props.onConfirm();
  }

  render() {
    // issue: renders before onUpdateClass finishes --solved
    const { form } = this.state;
    const { formErrors, updateProperty, numWeights, noWeights } = this.props;

    return (
      <div className="cn-form-section">
        <AgGridReact>
          
        </AgGridReact>

        <div></div>
        <div className="addbtndiv">
          <a
            className={
              "margin-top " +
              (this.state.loading || noWeights ? "disabled" : "")
            }
            disabled={this.state.loading || noWeights}
            onClick={this.onSubmit.bind(this)}
          >
            {" "}
            Submit Weights
            {this.state.loading ? <Loading /> : null}
          </a>
        </div>
        {this.renderGradeModal()}
      </div>
    );
  }
}

WeightForm.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onCreateWeight: PropTypes.func.isRequired,
  onUpdateWeight: PropTypes.func.isRequired,
  onDeleteWeight: PropTypes.func,
  updateProperty: PropTypes.func,
  weight: PropTypes.object,
  validateForm: PropTypes.func,
  noWeights: PropTypes.bool,
  numWeights: PropTypes.number,
  onNoWeightChecked: PropTypes.func,
  reset: PropTypes.func,
  boolPoints: PropTypes.bool,
  onClick: PropTypes.func,
  togglePoints: PropTypes.func,
  totalPoints: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ValidateForm(Form(WeightForm, "form"));
