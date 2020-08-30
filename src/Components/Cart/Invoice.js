import React, { useContext } from 'react';
import { appContext } from '../../Statemanagement/Statecontext';
import { Link } from 'react-router-dom';

const Invoice = props => {
  const { state } = useContext(appContext);
  const { cart } = state;
  return (
    <div
      className="card mt-3"
      style={{
        boxShadow: '0px 0px 4px 1px rgba(97,97,97,0.24)',
        border: 'none'
      }}
    >
      <div className="card-body">
        <strong style={{ color: 'rgba(20, 20, 20)' }}>Price details:</strong>
        <hr />
        <div className="d-flex justify-content-between " style={{ color: 'grey' }}>
          <span>Bag total</span>
          <span>
            &#x20b9;
            {cart.map(item => item.product.markedPrice).reduce((prev, current) => prev + current, 0)}
          </span>
        </div>
        <div className="d-flex justify-content-between" style={{ color: '#ec436f' }}>
          <span>Discount</span>
          <span>
            -&#x20b9;
            {cart.map(item => item.product.markedPrice).reduce((prev, current) => prev + current, 0) - cart.map(item => item.product.price).reduce((prev, current) => prev + current, 0)}
          </span>
        </div>
        <div className="d-flex justify-content-between" style={{ color: 'grey' }}>
          <span>Order total</span>
          <span>
            &#x20b9;
            {cart.map(item => item.product.price).reduce((prev, current) => prev + current, 0)}
          </span>
        </div>
        <div className="d-flex justify-content-between" style={{ color: 'grey' }}>
          <span>Coupouns</span>
          <span>---</span>
        </div>
        <div className="d-flex justify-content-between" style={{ color: 'grey' }}>
          <span>Delivery</span>
          <span style={{ color: '#ec436f' }}>FREE</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between" style={{ color: 'rgba(20, 20, 20)' }}>
          <span>
            <strong>Total:</strong>
          </span>
          <span>
            <strong>
              &#x20b9;
              {cart.map(item => item.product.price).reduce((prev, current) => prev + current, 0)}
            </strong>
          </span>
        </div>
        <div className="row">
          <div className="col-12">
            <Link style={{ display: props.display || '' }} to={props.link}>
              <button type="button" className="btn btn-danger btn mt-3 btn-block">
                <strong>Proceed</strong>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
