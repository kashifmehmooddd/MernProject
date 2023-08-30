import { connect } from 'react-redux';
import './Landing.css'

const Landing = ({ isAuthenticated }) => {
  return (
    <div>
      <div className="landing">
        <div className="content">
          <h1 className='text-center'>DEVS-SOCIALIZER</h1>

          <p className='text-center'>Lets Connect with the developers all around the world</p>

          <div className="buttons">
            {!isAuthenticated && <><button className='btn btn-outline-dark m-1'>Login</button>
              <button className='btn btn-dark m-1'>Signup</button></>}
            {isAuthenticated && <>
              You are Signed in!</>}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToPros)(Landing);
