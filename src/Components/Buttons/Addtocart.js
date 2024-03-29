import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { appContext, dispatchContext } from '../../Statemanagement/Statecontext';
import { isAutheticated } from '../../auth/helper/index';
import API from '../../backend';
import MySnackbar from '../Snackbar/Snackbar';

const Addtocart = props => {
  const { state } = useContext(appContext);
  const dispatch = useContext(dispatchContext);
  const { cart } = state;

  const [show, setShow] = useState(false);

  if (state.loggedIn) {
    const { token, user } = isAutheticated();
    const { _id } = user;

    const addToCart = (id, shopId) => {
      let filteredCart = cart.filter(item => item.product._id === id);
      if (filteredCart.length === 1) {
        setShow(true);
        setTimeout(function () {
          setShow(false);
        }, 2000);
      } else {
        dispatch({ type: 'LOADING' });
        fetch(`${API}/api/user/addToCart/${_id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: _id,
            products: [
              {
                product: id,
                wishlist: 0,
                quantity: 1
              }
            ]
          })
        })
          .then(response => {
            response.json().then(function (data) {
              dispatch({ type: 'UPDATECART', payload: data.products });
              dispatch({ type: 'REMOVEDFROMWISHLIST', payload: id });
              dispatch({ type: 'LOADED' });
            });
          })
          .catch(err => console.log(err));
      }
    };

    return (
      <>
        {props.open ? (
          props.stock ? (
            <button
              className={props.classes}
              onClick={() => {
                addToCart(props.id, props.shopId);
              }}
            >
              {show && <MySnackbar vertical={'top'} horizontal={'center'} message={'Already exists in cart'} />}

              {props.children}
            </button>
          ) : (
            <div style={{ backgroundColor: 'rgb(253, 228, 227)', color: 'red', border: 'none', fontWeight: '700', padding: '1.5vh' }} className={props.classes}>
              OUT OF STOCK
            </div>
          )
        ) : (
          <button className={props.closed}>Shop Closed</button>
        )}
      </>
    );
  } else {
    return (
      <>
        {props.open ? (
          <button
            onClick={() =>
              props.history.push({
                pathname: '/loginsignup',
                state: {
                  snackbarMessage: 'Login to Add to cart'
                }
              })
            }
            className={props.classes}
          >
            {props.children}
          </button>
        ) : (
          <button className={props.closed}>Shop Closed</button>
        )}
      </>
    );
  }
};

export default withRouter(Addtocart);
