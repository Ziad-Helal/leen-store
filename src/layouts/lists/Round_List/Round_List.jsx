import { useSelector } from "react-redux";
import { sortAlphabetically } from "../../../lib/utils";

export default function Round_List() {
  const {
    filterRegions: regions,
    limits: regionsLimits,
    toBeSearched: finishedRound,
  } = useSelector((state) => state.round);

  return (
    <ul className="mx-auto w-full flex flex-col gap-2">
      {sortAlphabetically(Object.keys(finishedRound)).map(
        (clientName) =>
          regions.includes(finishedRound[clientName].region) && (
            <li
              key={clientName}
              className="max-w-3xl border rounded-2xl px-3 py-2 flex gap-2 justify-between"
            >
              <div className="flex flex-col gap-2">
                <h3
                  className={`font-medium ${
                    finishedRound[clientName].totalAmount <
                      regionsLimits[finishedRound[clientName].region] &&
                    "text-red-500"
                  }`}
                  title={finishedRound[clientName].region}
                >
                  {clientName}
                </h3>
                <section className="flex flex-wrap gap-1">
                  {Object.keys(finishedRound[clientName].receipts)
                    .sort((a, b) => a - b)
                    .map((receiptNumber) => (
                      <span
                        key={receiptNumber}
                        className={`border rounded-full px-2 ${
                          finishedRound[clientName].receipts[receiptNumber]
                            .net <
                            regionsLimits[finishedRound[clientName].region] &&
                          "text-red-500"
                        }`}
                        title={`عدد مرات الطباعة: ${
                          finishedRound[clientName].receipts[receiptNumber]
                            .numberOfPrints
                        }\nوقيمة الفاتورة: ${finishedRound[clientName].receipts[
                          receiptNumber
                        ].net.toFixed(2)} جنيه مصري`}
                      >
                        {receiptNumber}
                      </span>
                    ))}
                </section>
              </div>
              <div className="flex flex-col gap-2 justify-between items-end text-sm">
                <span title="عدد فواتير العميل في الراوند">
                  {Object.keys(finishedRound[clientName].receipts).length}
                </span>
                <span
                  title="إجمالي قيمة فواتير العميل بالجنيه المصري"
                  className={`whitespace-nowrap ${
                    finishedRound[clientName].totalAmount <
                    regionsLimits[finishedRound[clientName].region]
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {finishedRound[clientName].totalAmount.toFixed(2)}{" "}
                  <span
                    className="text-foreground"
                    title="الحد الأدنى لشحن الفواتير لهذا العميل"
                  >
                    / {regionsLimits[finishedRound[clientName].region]}
                  </span>
                </span>
              </div>
            </li>
          )
      )}
    </ul>
  );
}
