import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../../../store/general";
import { Round_List_Filter, Round_List_AreaFilter } from "../../../../layouts";
import { InputField } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Round_List_Header() {
    const dispatch = useDispatch();
    const { roundFiltersIsOpen, roundAreaFilterIsOpen } = useSelector(
        (state) => state.general.lists
    );

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

    return (
        <header className="flex justify-between items-center">
            <InputField
                label={<FontAwesomeIcon icon={faSearch} id="search" />}
                className="relative right-8"
                labelClassName="bg-primary_800 py-0.5 px-2 w-fit rounded-r-lg absolute text-sm left-full border-l border-primary_700"
                inputClassName="rounded-r-none"
            />
            <div className="flex gap-2">
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
