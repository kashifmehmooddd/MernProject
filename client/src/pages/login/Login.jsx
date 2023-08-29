import { useState } from 'react';
import { login } from '../../components/api/user';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Login = ({ setAlert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email, password })
    if (response.status === 200) {
      setAlert(`login successfull with ${response.data.token}`, 'success')
    } else {
      setAlert(response.data.msg, 'danger')
    }
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  login
                </button>
              </div>
              <p>Don't have an Account? <Link to="/register">Sign up</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Login);
