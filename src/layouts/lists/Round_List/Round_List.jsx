import { useSelector } from "react-redux";

export default function Round_List() {
  const finishedRound = useSelector((state) => state.round.round);

  return (
    <ul className="mx-auto w-fit flex flex-col gap-2">
      {Object.keys(finishedRound).map((clientName) => (
        <li
          key={clientName}
          className="max-w-3xl relative border rounded-2xl px-3 py-2 flex flex-col gap-2"
        >
          <h3
            className={`font-medium ${
              finishedRound[clientName].totalAmount < 500 && "text-red-500"
            }`}
          >
            {clientName}
          </h3>
          <p className="absolute top-1 left-3 text-green-300">
            {Object.keys(finishedRound[clientName].receipts).length}
          </p>
          <section className="flex flex-wrap gap-1">
            {Object.keys(finishedRound[clientName].receipts)
              .sort((a, b) => a - b)
              .map((receiptNumber) => (
                <span
                  key={receiptNumber}
                  className={`border rounded-full px-2 ${
                    finishedRound[clientName].receipts[receiptNumber].net <
                      500 && "text-red-500"
                  }`}
                >
                  {receiptNumber}
                </span>
              ))}
          </section>
        </li>
      ))}
    </ul>
  );
}
