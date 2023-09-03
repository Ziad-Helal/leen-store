import { memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../../store/general";
import { clientsActions, getAllClients } from "../../../store/clients";
import { Button, InputField, Loading } from "../../../components";
import {
  Client_ListItem,
  ClientsFilter_List,
  ClientsOptions_List,
} from "../../../layouts";

function Clients_List() {
  const dispatch = useDispatch();
  const { clientsOptionsIsOpen, clientsFilterIsOpen } = useSelector(
    (state) => state.general.lists
  );
  const loading = useSelector((state) => state.general.loading.clients);
  const { filteredClients, clients } = useSelector((state) => state.clients);
  const numberOfClients = Object.keys(clients).length;
  const { currentPageNumber, clientsPerPage } = useSelector(
    (state) => state.clients
  );
  const currentLastClientIndex = currentPageNumber * clientsPerPage;
  const currentFirstClientIndex = currentLastClientIndex - clientsPerPage;
  const currentClientsPage = filteredClients.slice(
    currentFirstClientIndex,
    currentLastClientIndex
  );
  const ClientsPagesNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredClients.length / clientsPerPage);
    i++
  ) {
    ClientsPagesNumbers.push(i);
  }
  const lastPageNumber = ClientsPagesNumbers[ClientsPagesNumbers.length - 1];
  if (currentPageNumber > lastPageNumber)
    dispatch(clientsActions.setPageNumber(lastPageNumber));

  useEffect(() => {
    if (numberOfClients === 0) dispatch(getAllClients());
  }, []);

  const filterClients = (event) => {
    const searchQuery = event.target.value;
    dispatch(clientsActions.filterClients({ filterBy: "الاسم", searchQuery }));
  };

  const toggleClientsOptions = () => {
    clientsOptionsIsOpen
      ? dispatch(generalActions.hideList("clientsOptions"))
      : dispatch(generalActions.showList("clientsOptions"));
  };

  const toggleClientsFilter = () => {
    clientsFilterIsOpen
      ? dispatch(generalActions.hideList("clientsFilter"))
      : dispatch(generalActions.showList("clientsFilter"));
  };

  const goToNextClientsPage = () => {
    dispatch(clientsActions.nextPage());
  };

  const goToPreviousClientsPage = () => {
    dispatch(clientsActions.prevPage());
  };

  const goToFirstPage = () => {
    dispatch(clientsActions.setPageNumber(1));
  };

  const goToLastPage = () => {
    dispatch(clientsActions.setPageNumber(lastPageNumber));
  };

  const changeNumOfClientsPerPage = (event) => {
    dispatch(clientsActions.setClientsPerPage(event.target.value));
  };

  return loading ? (
    <Loading />
  ) : numberOfClients === 0 ? (
    <p className="text-center">لا يوجد عملاء</p>
  ) : (
    <section>
      <header className="flex justify-between w-full">
        <section className="flex gap-10">
          <InputField
            label={<FontAwesomeIcon icon={faSearch} id="search" />}
            className="relative right-8"
            labelClassName="bg-primary_800 py-0.5 px-2 w-fit rounded-r-lg absolute text-sm left-full border-l border-primary_700"
            inputClassName="rounded-r-none"
            autoFocus
            autoComplete="off"
            onChange={filterClients}
          />
          <p>{filteredClients.length}</p>
        </section>
        <section className="flex items-center gap-3">
          <div className="relative">
            <FontAwesomeIcon
              icon={faFilter}
              className="cursor-pointer"
              onClick={toggleClientsFilter}
            />
            <ClientsFilter_List show={clientsFilterIsOpen} />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="text-lg cursor-pointer"
              onClick={toggleClientsOptions}
            />
            <ClientsOptions_List show={clientsOptionsIsOpen} />
          </div>
        </section>
      </header>
      <section className="border-y flex justify-between mt-2">
        <div className="flex gap-3">
          <p className="w-10 text-center">1</p>
          <Button title="اذهب لبداية القائمة" onClick={goToFirstPage}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button
            title="الصفحة السابقة"
            onClick={goToPreviousClientsPage}
            disabled={currentPageNumber === 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
          <p title="رقم الصفحة الحالية" className="w-10 text-center">
            {currentPageNumber}
          </p>
          <Button
            title="الصفحة التالية"
            onClick={goToNextClientsPage}
            disabled={currentPageNumber === lastPageNumber}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button title="اذهب لنهاية القائمة" onClick={goToLastPage}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <p className="w-10 text-center">{lastPageNumber}</p>
        </div>
      </section>
      <ul className="flex flex-col gap-2 py-2">
        {currentClientsPage.map(
          ({ الاسم, تليفون2, العنوان, صيدلية, تليفون, الموقع, المنطقة }) => (
            <Client_ListItem
              key={الاسم}
              الاسم={الاسم}
              تليفون={تليفون}
              تليفون2={تليفون2}
              العنوان={العنوان}
              الموقع={الموقع}
              صيدلية={صيدلية}
              المنطقة={المنطقة}
            />
          )
        )}
      </ul>
      <div className="flex items-center justify-center gap-2">
        <p>عرض عدد</p>
        <InputField type="select" onChange={changeNumOfClientsPerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </InputField>
        <p>عميل في كل صفحة</p>
      </div>
    </section>
  );
}

export default memo(Clients_List);
