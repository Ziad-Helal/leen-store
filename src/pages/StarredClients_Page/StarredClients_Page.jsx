import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client_ListItem } from "../../layouts";
import { getAllClients } from "../../store/clients";
import { Loading } from "../../components";

export default function StarredClients_Page() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.general.loading.clients);
  const starredClients = useSelector((state) => state.clients.starredClients);
  const starredClientsNames = Object.keys(starredClients);

  useEffect(() => {
    if (starredClientsNames.length === 0) dispatch(getAllClients());
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <main className="w-96 mx-auto p-4">
      <h2 className="text-xl font-medium text-center">
        قائمة العملاء الخاصة بي
      </h2>
      {starredClientsNames.length ? (
        <ul className="flex flex-col gap-2 py-2">
          {starredClientsNames.map((client) => (
            <Client_ListItem
              key={client}
              الاسم={client}
              تليفون={starredClients[client].تليفون}
              تليفون2={starredClients[client].تليفون2}
              العنوان={starredClients[client].العنوان}
              الموقع={starredClients[client].الموقع}
              المنطقة={starredClients[client].المنطقة}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center my-2 text-primary_400">
          لم أقم بتحديد أي عميل من قائمة العملاء
        </p>
      )}
    </main>
  );
}
