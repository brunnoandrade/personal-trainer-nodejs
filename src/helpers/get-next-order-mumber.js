const Order = require('../models/Order')

const getNextOrderNumber = async () => {
  let latestOrder = await Order.findOne({}, {}, { sort: { order_number: -1 } })

  if (latestOrder) {
    return latestOrder.order_number + 1
  } else {
    return 1
  }
}

module.exports = getNextOrderNumber
