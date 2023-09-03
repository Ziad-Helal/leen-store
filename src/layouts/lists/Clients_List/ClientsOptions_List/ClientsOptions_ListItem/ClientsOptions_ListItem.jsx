import { useDispatch } from "react-redux";
import { generalActions } from "../../../../../store/general";

export default function ClientsOptions_ListItem({
    children,
    critical = false,
    onClick = () => {},
}) {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(generalActions.hideList("clientsOptions"));

        onClick();
    };

    return (
        <li
            className={`${
                critical
                    ? "text-foreground bg-red-500 hover:bg-red-600"
                    : "text-background bg-foreground hover:bg-primary_200"
            } first:rounded-t-xl last:rounded-b-xl whitespace-nowrap cursor-pointer`}
            onClick={clickHandler}
        >
            {children}
        </li>
    );
}
