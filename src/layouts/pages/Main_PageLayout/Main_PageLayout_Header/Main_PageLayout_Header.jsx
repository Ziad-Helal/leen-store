import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavigationBar } from "../../../../layouts";
import { Button } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { generalActions } from "../../../../store/general";
import { getAllUsers } from "../../../../store/user";
import { useEffect } from "react";

export default function Main_PageLayout_Header() {
  const dispatch = useDispatch();
  const mainNavIsOpen = useSelector(
    (state) => state.general.lists.mainNavIsOpen
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const openNavigationBar = () => {
    dispatch(generalActions.showList("MainNav"));
  };

  useEffect(() => {
    if (currentUser.userRole === "مشرف" || currentUser.userRole === "مدير")
      dispatch(getAllUsers());
  }, []);

  return (
    <header className="border-b py-1.5 relative z-10">
      <h1 className="text-center text-xl font-medium">
        <Link to="/">Leen</Link>
      </h1>
      {currentUser.email ? (
        <>
          <Button
            title="افتح القائمة الجانبية"
            className="absolute top-2 left-2 hover:scale-110"
            onClick={openNavigationBar}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <NavigationBar
            className={`absolute top-0 left-0 h-screen ${
              mainNavIsOpen ? "w-screen sm:w-72" : "w-0"
            } transition-all z-20`}
          />
        </>
      ) : (
        <div className="absolute top-0 left-0 py-1 px-2 flex items-center justify-between gap-3 w-full sm:w-auto text-sm">
          <Button kind="primary">
            <Link to="/login">تسجيل الدخول</Link>
          </Button>
          <Button kind="secondary">
            <Link to="/register">إنشاء حساب</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
