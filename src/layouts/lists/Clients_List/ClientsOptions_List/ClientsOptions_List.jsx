import { Link } from "react-router-dom";
import { ClientsOptions_ListItem } from "../../../../layouts";
import { Button } from "../../../../components";
import { deleteAllClients } from "../../../../store/clients";
import { useDispatch, useSelector } from "react-redux";

export default function ClientsOptions_List({ className = "", show = false }) {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.currentUser.userRole);

  const eraseAllClients = () => {
    dispatch(deleteAllClients());
  };

  return (
    <ul
      className={`absolute bg-primary_950 top-full left-0 rounded-lg flex flex-col gap-0.5 ${
        show ? "opacity-100 z-10" : "opacity-0 -z-10"
      } ${className}`}
    >
      <ClientsOptions_ListItem>
        <Link to="/clients/starredClients" className="block px-3 py-1">
          قائمتي
        </Link>
      </ClientsOptions_ListItem>
      {(userRole === "مدير" || userRole === "مشرف") && (
        <>
          <ClientsOptions_ListItem>
            <Link to="/clients/create-client" className="block px-3 py-1">
              إضافة عميل
            </Link>
          </ClientsOptions_ListItem>
          <ClientsOptions_ListItem onClick={eraseAllClients} critical>
            <Button className="px-3 py-1">حذف جميع العملاء</Button>
          </ClientsOptions_ListItem>
        </>
      )}
    </ul>
  );
}
