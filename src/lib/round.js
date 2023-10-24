export const getPrintedReceipts = (receipts) => {
  const filterdReceipts = {};
  let newTotalAmount = 0;

  if (receipts != undefined) {
    Object.keys(receipts).forEach((receipt) => {
      if (receipts[receipt].numberOfPrints > 0) {
        filterdReceipts[receipt] = receipts[receipt];
        newTotalAmount += receipts[receipt].net;
      }
    });
  }

  return {
    receipts: filterdReceipts,
    totalAmount: newTotalAmount,
  };
};

export const getNotPrintedReceipts = (receipts) => {
  const filterdReceipts = {};
  let newTotalAmount = 0;

  if (receipts != undefined) {
    Object.keys(receipts).forEach((receipt) => {
      if (receipts[receipt].numberOfPrints === 0) {
        filterdReceipts[receipt] = receipts[receipt];
        newTotalAmount += receipts[receipt].net;
      }
    });
  }

  return {
    receipts: filterdReceipts,
    totalAmount: newTotalAmount,
  };
};
