import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../../../store/general";
import {
  Round_List_Filter,
  Round_List_AreaFilter,
  Round_List_Settings,
  Round_Summary,
  RoundHistory,
} from "../../../../layouts";
import { InputField } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarth,
  faFilter,
  faSearch,
  faFileDownload,
  faGear,
  faClipboardList,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { sortAlphabetically } from "../../../../lib/utils";
import { roundActions } from "../../../../store/round";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";

export default function Round_List_Header() {
  const dispatch = useDispatch();
  const { roundFiltersIsOpen, roundAreaFilterIsOpen } = useSelector(
    (state) => state.general.lists
  );
  const { toBeFiltered, filterRegions, roundsStructure, shippedOrders } =
    useSelector((state) => state.round);

  const toggleFilterOptions = () => {
    roundFiltersIsOpen
      ? dispatch(generalActions.hideList("roundFilters"))
      : dispatch(generalActions.showList("roundFilters"));
  };

  const toggleAreaFilter = () => {
    roundAreaFilterIsOpen
      ? dispatch(generalActions.hideList("roundAreaFilter"))
      : dispatch(generalActions.showList("roundAreaFilter"));
  };

  const openRoundSettings = () => {
    dispatch(generalActions.showList("roundSettings"));
  };

  const roundSearch = (event) => {
    dispatch(roundActions.roundSearch({ query: event.target.value }));
  };

  const openRoundSummary = () => {
    dispatch(generalActions.showList("roundSummary"));
  };

  const openRoundHistory = () => {
    dispatch(generalActions.showList("roundHistory"));
  };

  const archiveRound = async () => {
    if (confirm("هل تريد تأكيد شحن الفواتير في القائمة الحالية؟")) {
      const receiptNumbers = [];
      Object.keys(toBeFiltered).forEach((clientName) => {
        receiptNumbers.push(...Object.keys(toBeFiltered[clientName].receipts));
      });

      dispatch(
        roundActions.setCurrentRoundArchive(
          receiptNumbers.sort((a, b) => a - b)
        )
      );

      try {
        await setDoc(doc(db, "round", "archive"), shippedOrders);
      } catch (error) {
        alert(error);
      }
    }
  };

  // PREPARE FILE TO DOWNLOAD
  const dataHeader = {};
  const dataStructure = {};
  const currentRoundsStructure = sortAlphabetically(
    Object.keys(roundsStructure)
  );
  currentRoundsStructure.forEach((round, i) => {
    dataHeader[round] = "إسم العميل";
    dataHeader[`__EMPTY_${i}`] = "عدد";
    dataHeader[`__EMPTY_${i}_${i}`] = "أرقام الفواتير";

    if (dataStructure[round] === undefined) dataStructure[round] = {};
  });
  const sortedLayout = {};
  currentRoundsStructure.forEach((round) => {
    sortedLayout[round] = {};
    roundsStructure[round].forEach((region) => {
      sortedLayout[round][region] = [];
    });
  });
  const readyRound = {};
  Object.keys(toBeFiltered).forEach((client) => {
    if (filterRegions.includes(toBeFiltered[client].region)) {
      readyRound[client] = toBeFiltered[client];

      const receipts = Object.keys(readyRound[client].receipts);
      currentRoundsStructure.forEach((round) => {
        if (roundsStructure[round].includes(readyRound[client].region)) {
          sortedLayout[round][readyRound[client].region].push(client);

          dataStructure[round][client] = {
            عدد: receipts.length,
            الفواتير: receipts.join(" | "),
          };
        }
      });
    }
  });
  const roundData = [dataHeader];
  for (let j = 0; j < Object.keys(readyRound).length; j++) {
    const dataRow = {};
    currentRoundsStructure.forEach((round, i) => {
      let roundClients = [];
      sortAlphabetically(Object.keys(sortedLayout[round])).forEach((region) => {
        roundClients = roundClients.concat(
          ...sortAlphabetically(sortedLayout[round][region])
        );
      });
      const clientName = roundClients[j] || "";
      dataRow[round] = clientName;
      dataRow[`__EMPTY_${i}`] = dataStructure[round][clientName]?.عدد || "";
      dataRow[`__EMPTY_${i}_${i}`] =
        dataStructure[round][clientName]?.الفواتير || "";
    });
    const br = Object.keys(dataRow).filter((item) => dataRow[item] != "");
    if (br.length === 0) break;
    else roundData.push(dataRow);
  }
  const workSheet = XLSX.utils.json_to_sheet(roundData);
  const workBook = {
    Sheets: { "الراوند الحلي": workSheet },
    SheetNames: ["الراوند الحلي"],
  };
  const file = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
  const data = new Blob([file], { type: "fileType" });

  return (
    <header className="flex justify-between items-center mb-2">
      <InputField
        label={<FontAwesomeIcon icon={faSearch} id="search" />}
        className="relative right-8"
        labelClassName="bg-primary_800 py-0.5 px-2 w-fit rounded-r-lg absolute text-sm left-full border-l border-primary_700"
        inputClassName="rounded-r-none"
        onChange={roundSearch}
      />
      <div className="flex flex-wrap gap-2 justify-end mr-10">
        <div>
          <a
            href={URL.createObjectURL(data)}
            download={`${Date.now()}.xlsx`}
            onClick={archiveRound}
          >
            <FontAwesomeIcon icon={faFileDownload} className="cursor-pointer" />
          </a>
          <RoundHistory />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faTruck}
            cursor="pointer"
            onClick={openRoundHistory}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faClipboardList}
            cursor="pointer"
            onClick={openRoundSummary}
          />
          <Round_Summary />
        </div>
        <div className="relative">
          <FontAwesomeIcon
            icon={faGear}
            className="cursor-pointer"
            onClick={openRoundSettings}
          />
          <Round_List_Settings />
        </div>
        <div className="relative">
          <FontAwesomeIcon
            icon={faFilter}
            className="cursor-pointer"
            onClick={toggleFilterOptions}
          />
          <Round_List_Filter />
        </div>
        <div className="relative">
          <FontAwesomeIcon
            icon={faEarth}
            className="cursor-pointer"
            onClick={toggleAreaFilter}
          />
          <Round_List_AreaFilter />
        </div>
      </div>
    </header>
  );
}
