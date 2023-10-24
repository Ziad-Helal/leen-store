import { faBroom, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generalActions } from "../../../../../../../store/general";
import {
  archiveReceipt,
  clearRound,
  roundActions,
} from "../../../../../../../store/round";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { RoundHistory_Item } from "../../../../../../../layouts";
import {
  Button,
  Form,
  InputField,
  Modal,
} from "../../../../../../../components";
import { sortAlphabetically } from "../../../../../../../lib/utils";

export default function RoundArchive({ day, round }) {
  const dispatch = useDispatch();
  const orderRef = useRef();
  const archiveOrderIsOpen = useSelector(
    (state) => state.general.lists.archiveOrderIsOpen
  );
  const { shippedOrders, currentDay, filter, addingArchiveRound } = useSelector(
    (state) => state.round
  );

  const openArchiveOrder = (round) => {
    dispatch(generalActions.showList("archiveOrder"));
    dispatch(roundActions.addToArchiveRound(round));
  };

  const closeArchiveOrder = () => {
    dispatch(generalActions.hideList("archiveOrder"));
  };

  const addShippedReceipt = (event, day, round) => {
    event.preventDefault();

    dispatch(
      archiveReceipt({
        day,
        round,
        receiptNumber: orderRef.current.value,
        shippedOrders,
      })
    );
    dispatch(roundActions.filter(filter));

    orderRef.current.value = "";
  };

  const clearRoundArchive = (day, round) => {
    if (
      confirm(`هل أنت متأكد من أنك تريد محو بيانات شحن ${round} ليوم ${day}؟`)
    ) {
      dispatch(clearRound({ day, round, shippedOrders }));
      dispatch(roundActions.filter(filter));
    }
  };

  return (
    <div>
      <header className="flex flex-wrap gap-2 items-center mt-2 mb-1">
        <h3 className="font-medium">{round}</h3>
        <span className="flex-auto flex justify-between">
          <FontAwesomeIcon
            icon={faPlusCircle}
            title={`إضافة فاتورة مشحونة في ${round} ليوم ${day}`}
            cursor="pointer"
            onClick={() => openArchiveOrder(round)}
          />
          {archiveOrderIsOpen && addingArchiveRound === round && (
            <Modal id="archiveOrder" onBackdropClick={closeArchiveOrder}>
              <Form
                className="bg-primary_300 text-primary_950 p-4 rounded-lg"
                onSubmit={(event) => addShippedReceipt(event, day, round)}
              >
                <fieldset>
                  <legend className="font-semibold text-xl mb-3 text-center">
                    <h3>
                      أضف فاتورة إلى {round} ليوم {day}
                    </h3>
                  </legend>
                  <InputField
                    id="archivedReceipt"
                    className="flex gap-2 items-center justify-between"
                    label="رقم الفاتورة"
                    type="number"
                    ref={orderRef}
                    autoFocus
                    required
                  />
                  <Button
                    type="submit"
                    kind="primary"
                    className="text-foreground w-full mt-4"
                  >
                    أضف الفاتورة
                  </Button>
                </fieldset>
              </Form>
            </Modal>
          )}
          <FontAwesomeIcon
            icon={faBroom}
            title={`حذف بيانات ${round} ليوم ${day}`}
            cursor="pointer"
            onClick={() => clearRoundArchive(day, round)}
          />
        </span>
      </header>
      <div className="flex flex-wrap gap-1 justify-center">
        {shippedOrders[currentDay][round].length > 0
          ? sortAlphabetically(shippedOrders[currentDay][round]).map(
              (receiptNumber) => (
                <RoundHistory_Item
                  key={receiptNumber}
                  day={currentDay}
                  round={round}
                  receiptNumber={receiptNumber}
                >
                  <span className="text-foreground bg-background rounded-full px-1.5">
                    {receiptNumber}
                  </span>
                </RoundHistory_Item>
              )
            )
          : "لا يوجد بيانات متوفرة"}
      </div>
    </div>
  );
}
