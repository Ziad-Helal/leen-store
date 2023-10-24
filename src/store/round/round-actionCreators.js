import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { generalActions } from "../../store/general";
import { roundActions } from "../../store/round";
import { db } from "../../config/firebase";

export const getRoundLimits = (validRegions) => {
  return async (dispatch) => {
    dispatch(generalActions.loading("roundLimits"));

    try {
      const roundLimits = (await getDoc(doc(db, "round", "limits"))).data();

      validRegions.forEach((region) => {
        if (roundLimits[region] === undefined) {
          roundLimits[region] = 500;
        }
      });

      dispatch(roundActions.setRoundLimits(roundLimits));
    } catch (error) {
      alert(error);
    }

    dispatch(generalActions.loaded("roundLimits"));
  };
};

export const getRoundsStructure = (validRegions) => {
  return async (dispatch) => {
    dispatch(generalActions.loading("roundsStructure"));

    try {
      const roundsStructure = (
        await getDoc(doc(db, "round", "structure"))
      ).data();

      const roundsRegions = [];
      Object.keys(roundsStructure).forEach((round) => {
        roundsRegions.push(...roundsStructure[round]);
      });

      const unAssignedRegions = [];
      validRegions.forEach((validRegion) => {
        if (!roundsRegions.includes(validRegion))
          unAssignedRegions.push(validRegion);
      });

      dispatch(roundActions.setRoundsStructures(roundsStructure));
      if (unAssignedRegions.length > 0)
        dispatch(roundActions.setUnAssignedRegions(unAssignedRegions));
    } catch (error) {
      alert(error);
    }

    dispatch(generalActions.loaded("roundsStructure"));
  };
};

export const updateRoundLimits = (limits) => {
  return async () => {
    try {
      await setDoc(doc(db, "round", "limits"), limits);
    } catch (error) {
      alert(error);
    }
  };
};

export const updateRoundsStructure = (roundsStructures) => {
  return async () => {
    try {
      await setDoc(doc(db, "round", "structure"), roundsStructures);
    } catch (error) {
      alert(error);
    }
  };
};

export const getRoundArchive = () => {
  return async (dispatch) => {
    try {
      const roundArchive = (await getDoc(doc(db, "round", "archive"))).data();
      dispatch(roundActions.setRoundArchive(roundArchive));
    } catch (error) {
      alert(error);
    }
  };
};

export const shipReceipt = ({ receiptNumber, day, round, shippedOrders }) => {
  return async (dispatch) => {
    dispatch(roundActions.setSpecificArchive({ receiptNumber, day, round }));

    try {
      const update = {};
      update[day] = { ...shippedOrders[day] };
      update[day][round] = shippedOrders[day][round].filter(
        (number) => number != receiptNumber
      );

      await updateDoc(doc(db, "round", "archive"), update);
    } catch (error) {
      alert(error);
    }
  };
};

export const clearRound = ({ day, round, shippedOrders }) => {
  return async (dispatch) => {
    dispatch(roundActions.clearSpesificArchiveRound({ day, round }));

    const update = {};
    update[day] = { ...shippedOrders[day] };
    update[day][round] = [];

    try {
      await updateDoc(doc(db, "round", "archive"), update);
    } catch (error) {
      alert(error);
    }
  };
};

export const archiveReceipt = ({
  day,
  round,
  receiptNumber,
  shippedOrders,
}) => {
  return async (dispatch) => {
    dispatch(
      roundActions.setSpecificArchive({
        day,
        round,
        receiptNumber,
        operation: "add",
      })
    );

    const update = {};
    update[day] = { ...shippedOrders[day] };
    update[day][round] = shippedOrders[day][round].concat(receiptNumber);

    try {
      await updateDoc(doc(db, "round", "archive"), update);
    } catch (error) {
      alert(error);
    }
  };
};
