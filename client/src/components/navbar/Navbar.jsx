import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>DevSocializer</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to='/devs' className='nav-link'>Developers</Link>
            </li>
            {!isAuthenticated && <><li className="nav-item">
              <Link to='/login' className='nav-link'>Login</Link>
            </li>
              <li className="nav-item">
                <Link to='/register' className='nav-link'>Register</Link>
              </li>
            </>}

          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Navbar);

