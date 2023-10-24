import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../../components";
import { generalActions } from "../../../../../store/general";
import { sortAlphabetically } from "../../../../../lib/utils";

export default function Round_Summary() {
  const dispatch = useDispatch();
  const roundSummaryIsOpen = useSelector(
    (state) => state.general.lists.roundSummaryIsOpen
  );
  const { toBeFiltered: finishedRound, excludedOrders } = useSelector(
    (state) => state.round
  );
  const excluded = Object.keys(excludedOrders);

  let totalAmount = 0,
    numberOfOrders = 0,
    numberOfClients = 0;
  Object.keys(finishedRound).forEach((clientName) => {
    totalAmount += finishedRound[clientName].totalAmount;
    numberOfOrders += Object.keys(finishedRound[clientName].receipts).length;
    numberOfClients++;
  });

  const closeRoundSummary = () => {
    dispatch(generalActions.hideList("roundSummary"));
  };

  return (
    roundSummaryIsOpen && (
      <Modal id="roundSummary" onBackdropClick={closeRoundSummary}>
        <div className="bg-primary_300 text-primary_950 p-4 rounded-lg">
          <section>
            <h2 className="font-semibold text-xl mb-2">
              معلومات حول الراوند الحالي
            </h2>
            <p className="text-sm">
              إجمالي عدد عملاء الراوند:{" "}
              <span className="font-medium">{numberOfClients}</span> عميل
            </p>
            <p className="text-sm">
              إجمالي عدد فواتير الراوند:{" "}
              <span className="font-medium">{numberOfOrders}</span> فاتورة
            </p>
            <p className="text-sm">
              إجمالي قيمة فواتير الراوند:{" "}
              <span className="font-medium">{totalAmount.toFixed(2)}</span> جنيه
              مصري
            </p>
          </section>
          {excluded.length > 0 && (
            <section className="text-sm">
              <h3 className="font-semibold text-lg m-2">
                فواتير في الراوند ولكن تم شحنها بالفعل
              </h3>
              <ul className="flex flex-col gap-1">
                {sortAlphabetically(excluded).map((clientName) => (
                  <li
                    key={clientName}
                    className="max-w-3xl border border-background rounded-2xl px-3 py-2 flex gap-2 justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium">{clientName}</h3>
                      <section className="flex flex-wrap gap-1">
                        {Object.keys(excludedOrders[clientName].receipts)
                          .sort((a, b) => a - b)
                          .map((receiptNumber) => (
                            <span
                              key={receiptNumber}
                              title={`تم شحن هذه الفاتورة يوم ${excludedOrders[clientName].receipts[receiptNumber].day} في ${excludedOrders[clientName].receipts[receiptNumber].round}`}
                              className="border rounded-full px-2"
                            >
                              {receiptNumber}
                            </span>
                          ))}
                      </section>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Modal>
    )
  );
}
