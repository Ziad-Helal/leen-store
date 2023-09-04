import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  round: {},
};

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    addReceipt(state, action) {
      const order = action.payload;
      const receipt = {
        net: order["صافى الفاتورة"],
        numberOfPrints: order["عدد مرات الطباعه"],
      };

      if (state.round[order.الاسم] === undefined) {
        state.round[order.الاسم] = {};
        state.round[order.الاسم].receipts = {};
        state.round[order.الاسم].totalAmount = 0;
      }

      state.round[order.الاسم].totalAmount += receipt.net;
      state.round[order.الاسم].receipts[order.مسلسل] = receipt;
    },
  },
});

export const roundActions = roundSlice.actions;
