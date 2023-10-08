import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, loading }) => {
  if (!loading) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);
