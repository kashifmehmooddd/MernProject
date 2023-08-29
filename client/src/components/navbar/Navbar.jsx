import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">DevSocializer</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href='/devs' className='nav-link'>Developers</a>
            </li>
            <li className="nav-item">
              <a href='/login' className='nav-link'>Login</a>
            </li>
            <li className="nav-item">
              <a href='/register' className='nav-link'>Signup</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

