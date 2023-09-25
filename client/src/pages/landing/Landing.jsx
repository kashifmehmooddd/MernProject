import { connect } from 'react-redux';
import './Landing.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const Landing = ({ isAuthenticated, loading }) => {


  const guest = (<><Link to='/login' className='btn btn-outline-dark m-1'>Login</Link>
    <Link to='/register' className='btn btn-dark m-1'>Signup</Link></>)

  const auth = (<>
    You are Signed in!</>)

  return (
    <div>
      <div className="landing">
        <div className="content">
          <h1 className='text-center'>DEVS-SOCIALIZER</h1>
          <p className='text-center'>Lets Connect with the developers all around the world</p>
          <div className="buttons">
            {loading ? (
              <>loading...</>
            ) : (<>{
              isAuthenticated ? auth : guest
            }</>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToPros)(Landing);
