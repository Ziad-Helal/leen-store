import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../store/user";
import { InputField } from "../../../components";
import { changeUserRole } from "../../../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function UsersList() {
  const dispatch = useDispatch();
  const { allUsers, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(allUsers).length === 0) dispatch(getAllUsers());
  }, []);

  const changeAUserRole = (event, userEmail) => {
    dispatch(changeUserRole({ email: userEmail, newRole: event.target.value }));
  };

  const deleteUserAccount = () => {};

  return (
    <ul className="max-w-lg mx-auto p-2 flex flex-col gap-2">
      <h2 className="text-center text-xl font-medium my-4">مستخدمين الموقع</h2>
      {Object.keys(allUsers).map((user) => (
        <li key={user} className="border rounded-lg py-2 px-4">
          <figure>
            <div className="flex gap-2 items-center">
              {allUsers[user].photoURL ? (
                <img
                  src={allUsers[user].photoURL}
                  className="rounded-full mx-0 w-10"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-10 text-4xl" />
              )}
              <p>{allUsers[user].displayName}</p>
              {/* {allUsers[user].displayName != currentUser.displayName && (
                <div className="flex-auto text-end">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-red-500 cursor-pointer"
                    onClick={deleteUserAccount}
                  />
                </div>
              )} */}
            </div>
            <figcaption className="my-2 flex flex-wrap flex-1 flex-row-reverse gap-2 justify-between">
              <p>{user}</p>
              {allUsers[user].displayName === currentUser.displayName ? (
                <p className="font-medium">{allUsers[user].userRole}</p>
              ) : (
                <InputField
                  type="select"
                  defaultValue={allUsers[user].userRole}
                  onChange={(event) => changeAUserRole(event, user)}
                >
                  <option value="مستخدم جديد">مستخدم جديد</option>
                  <option value="مندوب">مندوب</option>
                  <option value="مشرف">مشرف</option>
                  <option value="مدير">مدير</option>
                </InputField>
              )}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
