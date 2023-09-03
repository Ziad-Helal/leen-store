import { useSelector } from "react-redux";

export default function Round_List() {
    // const finishedRound = useSelector((state) => state.round.round);

    return (
        <ul className="mx-auto w-fit">
            {/* {Object.keys(finishedRound).map(
        (اسم_العميل) =>
          finishedRound[اسم_العميل]["عدد الفواتير المطبوعة"] > 0 && (
            <li
              key={اسم_العميل}
              className="flex flex-col sm:flex-row gap-4 my-2 p-2 pr-4 border border-primary_500 rounded-3xl"
            >
              <h3
                className={`w-64 font-medium whitespace-nowrap ${
                  finishedRound[اسم_العميل]["إجمالي الفواتير"] < 500 &&
                  "text-red-500"
                }`}
              >
                {اسم_العميل}{" "}
                <span className="text-green-300">
                  {finishedRound[اسم_العميل]["الفواتير"].length}
                </span>
              </h3>
              <section className="flex flex-wrap gap-2">
                {finishedRound[اسم_العميل]["الفواتير"].map(
                  (فاتورة) =>
                    فاتورة["عدد مرات الطباعه"] > 0 && (
                      <span
                        key={فاتورة["مسلسل"]}
                        className={`border border-primary_600 px-2 rounded-full ${
                          فاتورة["صافي الفاتورة"] < 500 && "text-red-400"
                        }`}
                      >
                        {فاتورة["مسلسل"]}
                      </span>
                    )
                )}
              </section>
            </li>
          )
      )} */}
        </ul>
    );
}
