import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../../../../components";
import { roundActions } from "../../../../../store/round";
import { useEffect } from "react";
import { sortAlphabetically } from "../../../../../lib/utils";

export default function Round_List_AreaFilter() {
  const dispatch = useDispatch();
  const roundAreaFilterIsOpen = useSelector(
    (state) => state.general.lists.roundAreaFilterIsOpen
  );
  const regions = Object.keys(useSelector((state) => state.clients.geoClients));
  const regionsInFilter = useSelector((state) => state.round.filterRegions);

  const changeHandler = (event) => {
    let newRegions;
    if (regionsInFilter.includes(event.target.id))
      newRegions = regionsInFilter.filter(
        (region) => region != event.target.id
      );
    else newRegions = regionsInFilter.concat(event.target.id);

    dispatch(roundActions.filterByRegion(newRegions));
  };

  const resetFilter = () => {
    if (regions.length != regionsInFilter.length)
      dispatch(roundActions.filterByRegion(regions));
    else dispatch(roundActions.filterByRegion([]));
  };

  useEffect(() => {
    dispatch(roundActions.filterByRegion(regions));
  }, []);

  return (
    <ul
      className={`bg-primary_700 px-4 py-2 flex flex-col gap-0.5 rounded-lg absolute left-0 top-full ${
        roundAreaFilterIsOpen ? "block" : "hidden"
      } z-10`}
    >
      <li>
        <InputField
          label="الكل"
          type="checkbox"
          id="الكل"
          className="flex gap-1.5 justify-end flex-row-reverse items-center whitespace-nowrap"
          checked={regions.length === regionsInFilter.length}
          onChange={resetFilter}
        />
      </li>
      {sortAlphabetically(regions).map((region) => (
        <li key={region}>
          <InputField
            label={region}
            type="checkbox"
            id={region}
            className="flex gap-1.5 justify-end flex-row-reverse items-center whitespace-nowrap"
            checked={regionsInFilter.includes(region)}
            inputClassName="cursor-pointer"
            onChange={changeHandler}
          />
        </li>
      ))}
    </ul>
  );
}
