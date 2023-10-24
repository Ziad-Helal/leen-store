import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../../components";
import { RoundArchive } from "../../../../../layouts";
import { generalActions } from "../../../../../store/general";
import { roundActions } from "../../../../../store/round";
import { sortAlphabetically } from "../../../../../lib/utils";

export default function RoundHistory() {
  const dispatch = useDispatch();
  const roundHistoryIsOpen = useSelector(
    (state) => state.general.lists.roundHistoryIsOpen
  );
  const { shippedOrders, currentDay } = useSelector((state) => state.round);

  const week = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];

  const closeRoundHistory = () => {
    dispatch(generalActions.hideList("roundHistory"));
  };

  const changeDay = (event) => {
    dispatch(roundActions.changeDay(event.target.innerText));
  };

  return (
    roundHistoryIsOpen && (
      <Modal id="roundHistory" onBackdropClick={closeRoundHistory}>
        <section className="bg-primary_300 text-primary_950 p-4 rounded-lg sm:w-min">
          <h2 className="font-semibold text-xl mb-3 text-center">
            الفواتير المشحونة خلال أسبوع
          </h2>
          <ul className="text-sm flex flex-wrap sm:flex-nowrap gap-0.5 items-start justify-center">
            {week.map((day) => (
              <li
                key={day}
                className={`bg-background text-foreground px-2 py-1 cursor-pointer hover:pb-2.5 hover:rounded-b-lg transition-all ${
                  currentDay === day && "pb-2.5 rounded-b-lg bg-primary_800"
                }`}
                onClick={changeDay}
              >
                {day}
              </li>
            ))}
          </ul>
          <section>
            {Object.keys(shippedOrders).map(
              (day) =>
                currentDay === day &&
                sortAlphabetically(Object.keys(shippedOrders[currentDay])).map(
                  (round) => (
                    <RoundArchive key={round} day={day} round={round} />
                  )
                )
            )}
          </section>
        </section>
      </Modal>
    )
  );
}
