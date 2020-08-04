import React, { useContext } from 'react';
import { appContext } from '../../../Statemanagement/Statecontext';
import Img from './Images';
import Addtocart from '../../Buttons/Addtocart';
import Addtowishlist from '../../Buttons/Addtowishlist';
import API from '../../../backend';
const Productcard = ({ product, categoryId }) => {
  //eslint-disable-next-line

  const { name, photos, markedPrice, price, _id, shopName } = product;
  console.log(photos);
  const src = photos[0].substr(6);
  //eslint-disable-next-line
  const { state } = useContext(appContext);

  return (
    <div className="card p-2 col-12 shadow-sm col-sm-6" key={_id}>
      <div className="row no-gutters" style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <div>
          <Img src={`${API}${src}`} alt={name} />
        </div>
        <div style={{ paddingLeft: '10px' }} className="w-100">
          <p className="mb-1">
            <strong>{name}</strong>
          </p>
          <p className="small  mt-0 pt-0">
            Rs.{price} {'    '}
            {Math.ceil(((markedPrice - price) / markedPrice) * 100) > 2 ? (
              <>
                <strike className="text-muted">Rs.{markedPrice}</strike> <span style={{ color: '#ff905a' }}> ({Math.ceil(((markedPrice - price) / markedPrice) * 100) + '% Off'})</span>
              </>
            ) : (
              ''
            )}
          </p>
          <p className="small text-muted mt-0 pt-0">Sold by: {shopName} </p>
          <Addtowishlist classes="btn btn-outline-primary" id={_id}>
            Add to wishlist
          </Addtowishlist>

          <Addtocart classes="m-2 btn btn-primary" id={_id}>
            Add to cart
          </Addtocart>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
