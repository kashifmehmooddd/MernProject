import './Landing.css'

const Landing = () => {
  return (
    <div>
      <div className="landing">
        <div className="content">
          <h1 className='text-center'>DEVS-SOCIALIZER</h1>

          <p className='text-center'>Lets Connect with the developers all around the world</p>

          <div className="buttons">
            <button className='btn btn-outline-dark m-1'>Login</button>
            <button className='btn btn-dark m-1'>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Landing;
