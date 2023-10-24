import { useDispatch, useSelector } from "react-redux";
import { roundActions } from "../../../../../store/round";
import { InputField } from "../../../../../components";

export default function Round_List_Filter() {
  const dispatch = useDispatch();

  const roundFiltersIsOpen = useSelector(
    (state) => state.general.lists.roundFiltersIsOpen
  );
  const { printed, notPrinted, aboveLimit, underLimit } = useSelector(
    (state) => state.round.filter
  );

  const togglePrintedReceipts = (event) => {
    if (notPrinted)
      dispatch(
        roundActions.filter({
          printed: event.currentTarget.checked,
          notPrinted,
          aboveLimit,
          underLimit,
        })
      );
    else event.preventDefault();
  };

  const toggleNotPrintedReceipts = (event) => {
    if (printed)
      dispatch(
        roundActions.filter({
          notPrinted: event.currentTarget.checked,
          printed,
          aboveLimit,
          underLimit,
        })
      );
    else event.preventDefault();
  };

  const toggleAboveLimitReceipts = (event) => {
    if (underLimit)
      dispatch(
        roundActions.filter({
          aboveLimit: event.currentTarget.checked,
          printed,
          notPrinted,
          underLimit,
        })
      );
    else event.preventDefault();
  };

  const toggleUnderLimitReceipts = (event) => {
    if (aboveLimit)
      dispatch(
        roundActions.filter({
          underLimit: event.currentTarget.checked,
          printed,
          notPrinted,
          aboveLimit,
        })
      );
    else event.preventDefault();
  };

  return (
    <ul
      className={`bg-primary_700 px-4 py-2 flex flex-col gap-3 rounded-lg absolute left-0 top-full ${
        roundFiltersIsOpen ? "block" : "hidden"
      } z-10`}
    >
      <li className="flex gap-4">
        <InputField
          type="checkbox"
          label="مطبوعة"
          id="printed"
          className="flex gap-1 justify-between flex-row-reverse items-center"
          inputClassName="cursor-pointer"
          checked={printed}
          onChange={togglePrintedReceipts}
        />
        <InputField
          type="checkbox"
          label="غير مطبوعة"
          id="unPrinted"
          className="flex gap-1 justify-between flex-row-reverse items-center"
          inputClassName="cursor-pointer"
          labelClassName="whitespace-nowrap"
          checked={notPrinted}
          onChange={toggleNotPrintedReceipts}
        />
      </li>
      <li className="flex gap-4">
        <InputField
          type="checkbox"
          label="تحت الحد"
          id="underLimit"
          className="flex gap-1 justify-between flex-row-reverse items-center"
          inputClassName="cursor-pointer"
          labelClassName="whitespace-nowrap"
          checked={underLimit}
          onChange={toggleUnderLimitReceipts}
        />
        <InputField
          type="checkbox"
          label="فوق الحد"
          id="aboveLimit"
          className="flex gap-1 justify-between flex-row-reverse items-center"
          inputClassName="cursor-pointer"
          labelClassName="whitespace-nowrap"
          checked={aboveLimit}
          onChange={toggleAboveLimitReceipts}
        />
      </li>
    </ul>
  );
}
