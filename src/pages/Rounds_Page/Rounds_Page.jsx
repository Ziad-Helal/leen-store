import * as XLSX from "xlsx";
import { Round_List, Round_List_Header } from "../../layouts";
import { InputField } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoundArchive,
  getRoundLimits,
  getRoundsStructure,
  roundActions,
} from "../../store/round";
import { getAllClients } from "../../store/clients";
import { useEffect } from "react";

export default function Rounds_Page() {
  const dispatch = useDispatch();
  const { round: receipts, filter } = useSelector((state) => state.round);
  const { clients, geoClients } = useSelector((state) => state.clients);
  const userEmail = useSelector((state) => state.user.currentUser.email);
  const validRegions = Object.keys(geoClients);

  const fileHandler = (event) => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (event) => {
      const file = event.target.result;
      const workBook = XLSX.read(file, { type: "binary" });
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const round = XLSX.utils.sheet_to_json(workSheet);

      dispatch(roundActions.filterByRegion(validRegions));
      dispatch(roundActions.addReceipt({ round, clients }));
      dispatch(roundActions.filter(filter));
    };
  };

  useEffect(() => {
    dispatch(getAllClients(userEmail));
    dispatch(getRoundArchive());
    dispatch(getRoundLimits(validRegions));
    dispatch(getRoundsStructure(validRegions));
  }, []);

  return (
    <main className="p-2">
      {Object.keys(receipts).length === 0 ? (
        <InputField
          type="file"
          id="file"
          label="فواتير الحركة الحالية"
          accept=".xls, .xlsx"
          inputClassName="hidden"
          className="flex-col text-center mx-auto max-w-xs text-sm border rounded-lg py-1 px-3 my-4 hover:bg-gray-700 hover:border-transparent transition"
          onChange={fileHandler}
        />
      ) : (
        <section className="w-full sm:w-[38rem] mx-auto">
          <Round_List_Header />
          <Round_List />
        </section>
      )}
    </main>
  );
}
