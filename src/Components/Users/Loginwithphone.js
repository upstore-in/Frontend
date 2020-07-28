import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { postNumber } from '../../auth/helper/index';

const Loginwithphone = props => {
  const [values, setValues] = useState({
    phoneNumber: '',
    error: '',
    loading: false,
    didRedirect: false
  });

  const { phoneNumber, error, loading } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    postNumber({ phoneNumber }).then(response => {
      console.log(response);
      const { session_id } = response;
      return props.history.push({
        pathname: '/OTP',
        state: { phoneNumber, session_id }
      });
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {loadingMessage()}
      {errorMessage()}
      <form>
        <div className="form-group">
          <label htmlFor="MobileNumber"></label>
          <input type="text" value={phoneNumber} onChange={handleChange('phoneNumber')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mobile Number*" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Keep me signed in
          </label>
        </div>
        <button onClick={onSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>{JSON.stringify(values)}</p>
    </>
  );
};

export default withRouter(Loginwithphone);
