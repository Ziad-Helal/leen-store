import { useSelector } from "react-redux";
import { InputField } from "../../../../../components";

export default function Round_List_Filter() {
    const roundFiltersIsOpen = useSelector((state) => state.general.lists.roundFiltersIsOpen);

    const changeHandler = (event) => {
        console.log(event.currentTarget.checked);
    };

    return (
        <ul
            className={`bg-primary_700 px-4 py-2 flex flex-col gap-3 rounded-lg absolute left-0 top-full ${
                roundFiltersIsOpen ? "block" : "hidden"
            }`}
        >
            <li className="flex gap-4">
                <InputField
                    type="checkbox"
                    label="مطبوعة"
                    id="printed"
                    className="flex gap-1 justify-between flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    onChange={changeHandler}
                />
                <InputField
                    type="checkbox"
                    label="غير مطبوعة"
                    id="unPrinted"
                    className="flex gap-1 justify-between flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    labelClassName="whitespace-nowrap"
                    onChange={changeHandler}
                />
            </li>
            <li className="flex gap-4">
                <InputField
                    type="checkbox"
                    label="تحت الحد"
                    id="underLimit"
                    className="flex gap-1 justify-between flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    labelClassName="whitespace-nowrap"
                    onChange={changeHandler}
                />
                <InputField
                    type="checkbox"
                    label="فوق الحد"
                    id="aboveLimit"
                    className="flex gap-1 justify-between flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    labelClassName="whitespace-nowrap"
                    onChange={changeHandler}
                />
            </li>
        </ul>
    );
}
