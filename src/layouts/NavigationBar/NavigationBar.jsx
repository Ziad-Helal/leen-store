import { useDispatch } from "react-redux";
import { Button } from "../../components";
import { generalActions } from "../../store/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { navigation } from "../../assets/navigation";
import { NavLink } from "react-router-dom";

export default function NavigationBar({ className = "" }) {
    const dispatch = useDispatch();

    const closeNavigationBar = () => {
        dispatch(generalActions.hideList("MainNav"));
    };

    return (
        <nav className={`bg-primary_800 ${className}`}>
            <h2 className="hidden">Navigation</h2>
            <Button
                title="اغلق القائمة الجانبية"
                className="m-4 hover:scale-110"
                onClick={closeNavigationBar}
            >
                <FontAwesomeIcon icon={faX} />
            </Button>
            <aside>
                <ul className="flex flex-col gap-0.5">
                    {navigation.map(({ navItem, link }) => (
                        <li key={link}>
                            <NavLink
                                to={link}
                                className={({ isActive }) =>
                                    (isActive
                                        ? "bg-primary_600 text-foreground"
                                        : "bg-primary_300 text-background") +
                                    " block px-4 py-2 cursor-pointer font-medium hover:bg-primary_200 hover:text-background whitespace-nowrap"
                                }
                                onClick={closeNavigationBar}
                            >
                                {navItem}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
        </nav>
    );
}
