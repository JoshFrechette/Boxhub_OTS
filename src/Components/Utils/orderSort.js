  const sortedOrders = (orders) => {
    const orderArr = orders.orders;
    orderArr.sort( function(a, b) {
      return a.created - b.created;
    });
    return orderArr;
  };

export default sortedOrders;
