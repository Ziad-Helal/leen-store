import * as XLSX from "xlsx";
import { Round_List, Round_List_Header } from "../../layouts";
import { InputField } from "../../components";
import { useDispatch } from "react-redux";
import { roundActions } from "../../store/round";

export default function Rounds_Page() {
  const dispatch = useDispatch();

  const fileHandler = (event) => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (event) => {
      const file = event.target.result;
      const workBook = XLSX.read(file, { type: "binary" });
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const round = XLSX.utils.sheet_to_json(workSheet);

      round.forEach((receipt) => {
        // dispatch(roundActions.addReceipt(receipt));
      });
      // const r = {};
      // Object.keys(round).forEach((c) => {
      //   c["المنطقة"].length > 0
      //     ? (r[c["المنطقة"]][c["الاسم"]][c["موقف التعامل"]] = c["موقف التعامل"])
      //     : (r["غير مدون"][c["الاسم"]][c["موقف التعامل"]] = c["موقف التعامل"]);
      // });
      // console.log(r);
    };
  };

  return (
    <main className="p-2">
      <InputField
        type="file"
        id="file"
        label="فواتير الحركة الحالية"
        accept=".xls, .xlsx"
        inputClassName="hidden"
        className="flex-col text-center mx-auto max-w-xs text-sm border rounded-lg py-1 px-3 my-4 hover:bg-gray-700 hover:border-transparent transition"
        onChange={fileHandler}
      />
      <p className="text-center">غير متاح الآن</p>
      {/* <section className="w-fit mx-auto">
                <Round_List_Header />
                <Round_List />
            </section> */}
    </main>
  );
}
