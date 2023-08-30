import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { setAlert } from "../actions/alert"

const Alert = ({alerts}) =>
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`bg-${alert.alert}`}>
      {alert.msg}
     </div>
   ))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps) (Alert)

