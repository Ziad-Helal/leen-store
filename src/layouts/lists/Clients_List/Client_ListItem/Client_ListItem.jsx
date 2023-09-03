import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components";
import { updateSrarredClients } from "../../../../store/clients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapLocationDot,
  fa1,
  fa2,
  faStar,
  faFileEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useState } from "react";

function Client_ListItem(
  { الاسم, تليفون, تليفون2, العنوان, الموقع, المنطقة },
  key
) {
  const dispatch = useDispatch();
  const [modify, setModify] = useState(false);
  const starredClients = useSelector((state) => state.clients.starredClients);
  const userRole = useSelector((state) => state.user.currentUser.userRole);

  let starred = false;
  Object.keys(starredClients).forEach((starredClientName) => {
    if (starredClientName === الاسم) {
      starred = true;
      return;
    }
  });

  let صيدلية = false;
  if (الاسم.substring(0, 2) === "ص ") صيدلية = true;

  const toggleStarredClients = () => {
    dispatch(
      updateSrarredClients({ الاسم, تليفون, تليفون2, العنوان, الموقع, المنطقة })
    );
  };

  const showModifier = () => {
    setModify(true);
  };

  const hideModifier = () => {
    setModify(false);
  };

  const editClient = () => {};

  const deleteClient = () => {};

  return (
    <li
      key={key}
      className="bg-primary_900 flex gap-2 justify-between items-end p-2 rounded-lg relative"
      onMouseEnter={showModifier}
      onMouseLeave={hideModifier}
    >
      <div>
        <p
          className="font-medium"
          title={المنطقة.trim().length > 0 ? المنطقة : "غير محدد"}
          style={{ color: صيدلية ? "auto" : "yellow" }}
        >
          {الاسم}
        </p>
        <p className="text-sm text-primary_400">
          {العنوان || "--- العنوان غير متوفر ---"}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        {(userRole === "مدير" || userRole === "مشرف") && (
          <>
            {تليفون2 && (
              <div className="relative">
                <Link
                  to={`tel:${تليفون2}`}
                  target="_blank"
                  className="hover:text-primary_300"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </Link>
                <FontAwesomeIcon
                  icon={fa2}
                  size="2xs"
                  className="text-foreground bg-black p-0.5 w-2.5 rounded-full absolute -bottom-1 -right-2.5"
                />
              </div>
            )}
            {تليفون && (
              <div className="relative">
                <Link
                  to={`tel:${تليفون}`}
                  target="_blank"
                  className="hover:text-primary_300"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </Link>
                <FontAwesomeIcon
                  icon={fa1}
                  size="2xs"
                  className="text-foreground bg-black p-0.5 w-2.5 rounded-full absolute -bottom-1 -right-2.5"
                />
              </div>
            )}
          </>
        )}
        {الموقع && (
          <Link to={الموقع} target="_blank" className="hover:text-primary_300">
            <FontAwesomeIcon icon={faMapLocationDot} />
          </Link>
        )}
      </div>
      <Button
        className={`absolute top-1 left-2 ${
          starred
            ? "text-yellow-400 hover:text-yellow-600"
            : "hover:text-primary_300"
        }`}
        onClick={toggleStarredClients}
      >
        <FontAwesomeIcon icon={faStar} />
      </Button>
      {(userRole === "مدير" || userRole === "مشرف") && (
        <section
          className={`absolute top-0 flex flex-col justify-between items-end bg-primary_900 h-full rounded-l-lg ${
            modify ? "-left-10 w-12 py-1 px-3" : "left-0 w-0 opacity-0"
          } transition-all`}
          onMouseEnter={showModifier}
          onMouseLeave={hideModifier}
        >
          <Button
            className={`${modify ? "block" : "hidden"} hover:text-primary_300`}
            title="عدل بيانات العميل"
            onClick={editClient}
          >
            <FontAwesomeIcon icon={faFileEdit} />
          </Button>
          <Button
            className={`${
              modify ? "block" : "hidden"
            } text-red-500 hover:text-red-400`}
            title="احذف بيانات العميل"
            onClick={deleteClient}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </section>
      )}
    </li>
  );
}

export default memo(Client_ListItem);
