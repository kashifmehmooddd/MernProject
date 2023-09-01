import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

import logo from '../SVG/logo.svg'

const Navbar = ({ isAuthenticated, logout, setAlert, authLoading }) => {
  const handleLogout = () => {
    logout();
    setAlert('You signed out of your account', 'success');
  }

  const guestLinks = (<><li className="nav-item">
    <Link to='/login' className='nav-link'>Login</Link>
  </li>
    <li className="nav-item">
      <Link to='/register' className='nav-link'>Register</Link>
    </li></>)
  const authLinks = (
    <><li className="nav-item">
      <a onClick={handleLogout} className='nav-link'>logout</a>
    </li>
    </>
  )
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'><img src={logo} height='30' width='30' className='me-2' />DevSocializer</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to='/devs' className='nav-link'>Developers</Link>
            </li>
            {authLoading ? (<li className="nav-item">
              <Link className='nav-link'>loading...</Link>
            </li>) : (<>{
              isAuthenticated ? authLinks : guestLinks
            }</>)}

          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading
})

export default connect(mapStateToProps, { setAlert, logout })(Navbar);

