import { useSelector } from "react-redux";
import { InputField } from "../../../../../components";

export default function Round_List_AreaFilter() {
    const roundAreaFilterIsOpen = useSelector((state) => state.general.lists.roundAreaFilterIsOpen);

    const changeHandler = (event) => {
        console.log(event.currentTarget.checked);
    };

    return (
        <ul
            className={`bg-primary_700 px-4 py-2 flex flex-col gap-0.5 rounded-lg absolute left-0 top-full ${
                roundAreaFilterIsOpen ? "block" : "hidden"
            }`}
        >
            <li>
                <InputField
                    label="الشروق"
                    type="checkbox"
                    id="الشروق"
                    className="flex gap-1.5 justify-end flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    onChange={changeHandler}
                />
            </li>
            <li>
                <InputField
                    label="العبور"
                    type="checkbox"
                    id="العبور"
                    className="flex gap-1.5 justify-end flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    onChange={changeHandler}
                />
            </li>
            <li>
                <InputField
                    label="المستقبل"
                    type="checkbox"
                    id="المستقبل"
                    className="flex gap-1.5 justify-end flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    onChange={changeHandler}
                />
            </li>
            <li>
                <InputField
                    label="الرحاب"
                    type="checkbox"
                    id="الرحاب"
                    className="flex gap-1.5 justify-end flex-row-reverse items-center"
                    inputClassName="cursor-pointer"
                    onChange={changeHandler}
                />
            </li>
        </ul>
    );
}
