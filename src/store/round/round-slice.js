import { createSlice } from "@reduxjs/toolkit";
import { getPrintedReceipts, getNotPrintedReceipts } from "../../lib/round";

let currentDay;
switch (new Date().getDay()) {
  case 0:
    currentDay = "الأحد";
    break;
  case 1:
    currentDay = "الاثنين";
    break;
  case 2:
    currentDay = "الثلاثاء";
    break;
  case 3:
    currentDay = "الأربعاء";
    break;
  case 4:
    currentDay = "الخميس";
    break;
  case 5:
    currentDay = "الجمعة";
    break;
  case 6:
    currentDay = "السبت";
    break;

  default:
    break;
}

const initialState = {
  clients: {},
  round: {},
  roundsStructure: {},
  unAssignedRegions: [],
  toBeFiltered: {},
  toBeSearched: {},
  shippedOrders: {},
  excludedOrders: {},
  currentDay: currentDay,
  addingArchiveRound: "",
  filterRegions: [],
  limits: {},
  filter: {
    printed: true,
    notPrinted: false,
    aboveLimit: true,
    underLimit: false,
  },
};

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    getClients(state, action) {
      state.clients = action.payload;
    },
    addReceipt(state, action) {
      action.payload.round.forEach((order) => {
        const receipt = {
          net: order["صافى الفاتورة"],
          numberOfPrints: order["عدد مرات الطباعه"],
        };

        if (state.round[order.الاسم] === undefined) {
          state.round[order.الاسم] = {};
          state.round[order.الاسم].receipts = {};
          state.round[order.الاسم].totalAmount = 0;
          state.round[order.الاسم].region =
            action.payload.clients[order.الاسم].المنطقة.trim() === ""
              ? "غير محدد"
              : action.payload.clients[order.الاسم].المنطقة.trim();
        }

        state.round[order.الاسم].totalAmount += receipt.net;
        state.round[order.الاسم].receipts[order.مسلسل] = receipt;

        if (receipt.numberOfPrints > 0) {
          if (state.toBeFiltered[order.الاسم] === undefined) {
            state.toBeFiltered[order.الاسم] = {};
            state.toBeFiltered[order.الاسم].receipts = {};
            state.toBeFiltered[order.الاسم].totalAmount = 0;
            state.toBeFiltered[order.الاسم].region =
              action.payload.clients[order.الاسم].المنطقة;
          }

          state.toBeFiltered[order.الاسم].totalAmount += receipt.net;
          state.toBeFiltered[order.الاسم].receipts[order.مسلسل] = receipt;
        }
      });

      state.toBeSearched = state.toBeFiltered;
    },
    filter(state, action) {
      const filter = {
        printed: action.payload.printed || false,
        notPrinted: action.payload.notPrinted || false,
        aboveLimit: action.payload.aboveLimit || false,
        underLimit: action.payload.underLimit || false,
      };

      const shippedReceipts = [];
      Object.keys(state.shippedOrders).forEach((day) => {
        Object.keys(state.shippedOrders[day]).forEach((round) => {
          shippedReceipts.push(...state.shippedOrders[day][round]);
        });
      });

      let resultRound = {};
      state.excludedOrders = {};
      Object.keys(state.round).forEach((client) => {
        const currentClient = state.round[client];

        resultRound[client] = {};
        Object.keys(currentClient.receipts).forEach((receipt) => {
          if (shippedReceipts.includes(receipt))
            Object.keys(state.shippedOrders).forEach((day) => {
              Object.keys(state.shippedOrders[day]).forEach((round) => {
                state.shippedOrders[day][round].forEach((number) => {
                  if (number === receipt) {
                    if (state.excludedOrders[client] === undefined) {
                      state.excludedOrders[client] = {};
                      state.excludedOrders[client].receipts = {};
                    }
                    state.excludedOrders[client].receipts[receipt] = {
                      day,
                      round,
                    };
                  }
                });
              });
            });
          else {
            if (resultRound[client].receipts === undefined) {
              resultRound[client].receipts = {};
              resultRound[client].totalAmount = 0;
              resultRound[client].region = currentClient.region;
            }
            resultRound[client].receipts[receipt] =
              currentClient.receipts[receipt];
            resultRound[client].totalAmount +=
              currentClient.receipts[receipt].net;
          }
        });

        if (filter.printed && !filter.notPrinted) {
          const { receipts, totalAmount } = getPrintedReceipts(
            resultRound[client].receipts
          );

          if (totalAmount > 0) {
            resultRound[client].receipts = receipts;
            resultRound[client].totalAmount = totalAmount;
          } else {
            resultRound[client] = {};
          }
        } else if (filter.notPrinted && !filter.printed) {
          const { receipts, totalAmount } = getNotPrintedReceipts(
            resultRound[client].receipts
          );

          if (totalAmount > 0) {
            resultRound[client].receipts = receipts;
            resultRound[client].totalAmount = totalAmount;
          } else {
            resultRound[client] = {};
          }
        }

        if (resultRound[client].receipts != undefined) {
          let result = undefined;
          if (filter.aboveLimit && filter.underLimit) {
            result = resultRound[client];
          } else if (filter.aboveLimit) {
            if (
              resultRound[client].totalAmount >=
              state.limits[resultRound[client].region]
            ) {
              result = resultRound[client];
            }
          } else if (filter.underLimit) {
            if (
              resultRound[client].totalAmount <
              state.limits[resultRound[client].region]
            ) {
              result = resultRound[client];
            }
          }
          if (result != undefined) {
            resultRound[client] = result;
          } else delete resultRound[client];
        } else delete resultRound[client];
      });

      state.filter = filter;
      state.toBeFiltered = resultRound;
      state.toBeSearched = resultRound;
    },
    roundSearch(state, action) {
      const result = {};
      if (action.payload.query.match(/^\d/))
        Object.keys(state.toBeFiltered).forEach((clientName) => {
          if (
            Object.keys(state.toBeFiltered[clientName].receipts).find(
              (orderNumber) => orderNumber.startsWith(action.payload.query)
            ) != undefined
          )
            result[clientName] = state.toBeFiltered[clientName];
        });
      else
        Object.keys(state.toBeFiltered).forEach((clientName) => {
          if (clientName.includes(action.payload.query))
            result[clientName] = state.toBeFiltered[clientName];
        });

      state.toBeSearched = result;
    },
    filterByRegion(state, action) {
      state.filterRegions = action.payload;
    },
    setRoundLimits(state, action) {
      state.limits = action.payload;
    },
    modifyRoundLimit(state, action) {
      state.limits[action.payload.region] = Number(action.payload.amount);
    },
    setRoundsStructures(state, action) {
      state.roundsStructure = action.payload;
    },
    removeRoundFromRoundsStructure(state, action) {
      state.unAssignedRegions.push(
        ...state.roundsStructure[action.payload.roundName]
      );
      delete state.roundsStructure[action.payload.roundName];
    },
    addRoundToRoundsStructure(state, action) {
      state.roundsStructure[action.payload.roundName] = [];
    },
    removeRegionFromRoundsStructure(state, action) {
      const roundRegions = state.roundsStructure[action.payload.roundName];
      roundRegions.splice(roundRegions.indexOf(action.payload.region), 1);
      state.unAssignedRegions.push(action.payload.region);
    },
    addRegionToRoundsStructure(state, action) {
      state.roundsStructure[action.payload.roundName].push(
        action.payload.region
      );
      state.unAssignedRegions.splice(
        state.unAssignedRegions.indexOf(action.payload.region),
        1
      );
    },
    setUnAssignedRegions(state, action) {
      state.unAssignedRegions = action.payload;
    },
    addUnAssignedRegions(state, action) {
      state.unAssignedRegions.push(action.payload);
    },
    changeDay(state, action) {
      state.currentDay = action.payload;
    },
    setRoundArchive(state, action) {
      state.shippedOrders = action.payload;
    },
    setCurrentRoundArchive(state, action) {
      let round;
      if (new Date().getHours() < 14) round = "الراوند الأول";
      else round = "الراوند الثاني";

      state.shippedOrders[currentDay][round] = action.payload;
    },
    setSpecificArchive(state, action) {
      const day = action.payload.day,
        round = action.payload.round,
        receiptNumber = action.payload.receiptNumber,
        operation = action.payload.operation;

      if (operation === "add")
        state.shippedOrders[day][round] =
          state.shippedOrders[day][round].concat(receiptNumber);
      else
        state.shippedOrders[day][round] = state.shippedOrders[day][
          round
        ].filter((number) => number != receiptNumber);
    },
    clearSpesificArchiveRound(state, action) {
      state.shippedOrders[action.payload.day][action.payload.round] = [];
    },
    addToArchiveRound(state, action) {
      state.addingArchiveRound = action.payload;
    },
  },
});

export const roundActions = roundSlice.actions;
