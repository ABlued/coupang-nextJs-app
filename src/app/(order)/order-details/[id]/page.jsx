import React from 'react'

const OrderDetails = ({params, searchParams}) => {
  const { id } = params;
  const { hello } = searchParams;
  return (
    <>
      <div>{id}</div>
      <div>{hello}</div>
    </>
  );
}

export default OrderDetails