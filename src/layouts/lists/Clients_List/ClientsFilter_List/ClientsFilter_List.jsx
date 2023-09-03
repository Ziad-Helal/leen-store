import { useDispatch, useSelector } from "react-redux";
import { clientsActions } from "../../../../store/clients";
import { generalActions } from "../../../../store/general";
import { memo } from "react";

function ClientsFilter_List({ className = "", show = false }) {
  const dispatch = useDispatch();
  const { geoClients, region: chosenRegion } = useSelector(
    (state) => state.clients
  );
  const regions = Object.keys(geoClients);
  regions.unshift("الكل");

  const toggleRegion = (event) => {
    dispatch(clientsActions.updateRegion(event.target.innerText));
    dispatch(generalActions.hideList("clientsFilter"));
  };

  return (
    <ul
      className={`absolute bg-primary_950 top-full left-0 rounded-lg flex flex-col gap-0.5 h-60 overflow-y-auto ${
        show ? "opacity-100 z-10" : "opacity-0 -z-10"
      } ${className}`}
    >
      <li
        className={`px-3 py-1 ${
          chosenRegion === "الكل"
            ? "bg-primary_600 text-foreground hover:bg-primary_200 hover:text-background"
            : "text-background bg-foreground hover:bg-primary_200"
        } first:rounded-tr-xl last:rounded-br-xl whitespace-nowrap cursor-pointer`}
      >
        الكل
      </li>
      {Object.keys(geoClients)
        .sort((a, b) => a.localeCompare(b))
        .map((region) => (
          <li
            key={region}
            className={`px-3 py-1 ${
              chosenRegion === region
                ? "bg-primary_600 text-foreground hover:bg-primary_200 hover:text-background"
                : "text-background bg-foreground hover:bg-primary_200"
            } first:rounded-tr-xl last:rounded-br-xl whitespace-nowrap cursor-pointer ${
              region === "غير محدد" && "font-medium"
            }`}
            onClick={toggleRegion}
          >
            {region}
          </li>
        ))}
    </ul>
  );
}

export default memo(ClientsFilter_List);
