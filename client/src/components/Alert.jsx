import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../actions/alert";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`sticky-top alert alert-${alert.alert} alert-dismissible fade show`} role="alert">
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
