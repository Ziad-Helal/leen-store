import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UsersList() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    if (Object.keys(allUsers).length === 0) dispatch(getAllUsers());
  }, []);

  return (
    <ul className="max-w-lg mx-auto p-2 flex flex-col gap-2">
      <h2 className="text-center text-xl font-medium my-4">مستخدمين الموقع</h2>
      {Object.keys(allUsers).map((user) => (
        <li key={user} className="border rounded-lg py-2 px-4">
          <figure className="flex gap-2 items-center">
            {allUsers[user].photoURL ? (
              <img
                src={allUsers[user].photoURL}
                className="rounded-full mx-auto sm:mx-0 w-10"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="w-10 text-4xl sm:text-2xl"
              />
            )}
            <figcaption className="my-2 flex flex-1 flex-row-reverse gap-2 justify-between">
              <p>{user}</p>
              <div className="max-w-sm sm:flex gap-6 justify-between">
                <p>{allUsers[user].displayName}</p>
                <p className="font-medium">{allUsers[user].userRole}</p>
              </div>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
