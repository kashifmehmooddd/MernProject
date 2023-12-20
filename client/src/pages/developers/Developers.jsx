import React from 'react';
import { useState } from 'react';
import Profile from '../../components/Profile';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profiles';
import './developers.css';

const Developers = ({ getProfiles, profiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <div className='developer'>
      {!profiles.length > 0 && <>Loading...</>}
      {profiles.length > 0 && (
        <>
          {profiles.map((profile) => <Profile profile={profile} />)}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
