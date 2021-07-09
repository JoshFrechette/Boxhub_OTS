  const sortedOrders = (orders) => {
    const sortedArray = orders.sort((a,b) => (a.created < b.created ? 1 : -1));
    return sortedArray;
  };

export default sortedOrders;
