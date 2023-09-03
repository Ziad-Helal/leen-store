import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/user";
import { Button } from "../../components";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile_Page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userRole = useSelector((state) => state.user.currentUser.userRole);

  const logOut = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <main className="text-center">
      <figure className="flex flex-col gap-4 p-4 sm:flex-row-reverse sm:flex-wrap sm:items-end justify-center">
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            className="rounded-full mx-auto sm:mx-0"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-9xl" />
        )}
        <figcaption className="text-center sm:text-start">
          <p>{currentUser.userRole}</p>
          <p>{currentUser.displayName}</p>
          <p>{currentUser.email}</p>
        </figcaption>
      </figure>
      <ul className="flex flex-col gap-2">
        {(userRole === "مدير" || userRole === "مشرف") && (
          <>
            <li>
              <Button kind="secondary">
                <Link to="/users">مستخدمين الموقع</Link>
              </Button>
            </li>
          </>
        )}
        <li>
          <Button kind="primary" className="bg-red-800" onClick={logOut}>
            تسحيل الخروج
          </Button>
        </li>
      </ul>
    </main>
  );
}
