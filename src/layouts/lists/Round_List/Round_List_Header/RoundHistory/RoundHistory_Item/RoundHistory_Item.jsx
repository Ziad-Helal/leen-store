import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../../../../components";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roundActions, shipReceipt } from "../../../../../../store/round";

export default function RoundHistory_Item({
  children,
  day,
  round,
  receiptNumber,
}) {
  const dispatch = useDispatch();
  const { filter, shippedOrders } = useSelector((state) => state.round);
  const [actionsPosition, setAcionsPosition] = useState("h-0 [&>*]:hidden");

  const showActions = () => {
    setAcionsPosition("h-fit [&>*]:block");
  };

  const hideActions = () => {
    setAcionsPosition("h-0 [&>*]:hidden");
  };

  const removeReceipt = () => {
    const shipped = confirm(
      `هل أنت متأكد أنه تم شحن الفاتورة رقم ${receiptNumber}؟`
    );

    if (shipped) {
      dispatch(shipReceipt({ receiptNumber, day, round, shippedOrders }));
      dispatch(roundActions.filter(filter));
    }
  };

  return (
    <div
      className="relative bg-background text-foreground px-1.5 py-0.5 rounded-lg text-sm"
      onMouseEnter={showActions}
      onMouseLeave={hideActions}
    >
      {children}
      <div
        className={`absolute left-0 bottom-full ${actionsPosition} w-full min-w-fit flex gap-0.5 justify-center items-center bg-primary_300 rounded-t-lg`}
        onMouseEnter={showActions}
        onMouseLeave={hideActions}
      >
        <div>
          <Button
            title={`احذف الفاتورة رقم ${receiptNumber} من ${round} ليوم ${day}`}
            onClick={removeReceipt}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              color="red"
              cursor="pointer"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
