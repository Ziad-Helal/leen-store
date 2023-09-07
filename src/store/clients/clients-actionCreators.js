import { generalActions } from "../../store/general";
import { clientsActions } from "../../store/clients";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export const getAllClients = () => {
  let clients = {};

  return async (dispatch) => {
    dispatch(generalActions.loading("clients"));

    const localClientsUpdated = Number(localStorage.getItem("clientsUpdated"));
    const clientsUpdated = (await getDoc(doc(db, "clients/updated"))).data()
      .clientsUpdated;

    if (localClientsUpdated > clientsUpdated)
      clients = JSON.parse(localStorage.getItem("clients"));
    else
      try {
        const clientsDocs = await getDocs(collection(db, "clients"));

        clientsDocs.docs.forEach((clientDoc) => {
          if (clientDoc.id != "updated")
            clients[clientDoc.id] = clientDoc.data();
        });

        if (clients != {}) {
          localStorage.setItem("clients", JSON.stringify(clients));
          localStorage.setItem("clientsUpdated", Date.now());
        }
      } catch (error) {
        alert(error);
      }

    try {
      const starredClientsNames = (
        await getDoc(doc(db, "users", auth.currentUser.email))
      ).data().starredClients;

      if (starredClientsNames.length > 0)
        Object.keys(clients).forEach((client) => {
          if (starredClientsNames.findIndex((name) => name === client) != -1)
            dispatch(
              clientsActions.addStarredClient({
                الاسم: client,
                starredClient: clients[client],
              })
            );
        });
    } catch (error) {
      alert(error);
    }

    dispatch(clientsActions.setClients(clients));
    dispatch(generalActions.loaded("clients"));
  };
};

export const deleteAllClients = () => {
  return async (dispatch) => {
    try {
      const clientsIds = (await getDocs(collection(db, "clients"))).docs;
      clientsIds.forEach(async (clientId) => {
        if (clientId.id != "updated")
          await deleteDoc(doc(db, "clients", clientId.id));
      });

      await updateDoc(doc(db, "clients", "updated"), {
        clientsUpdated: Date.now(),
      });

      dispatch(clientsActions.clearClients());
    } catch (error) {
      alert(error);
    }
  };
};

export const updateSrarredClients = ({
  الاسم,
  تليفون,
  تليفون2,
  العنوان,
  الموقع,
  المنطقة,
}) => {
  let clientIndex = -1;
  let starredClientsNames = localStorage.getItem("starredClientsNames");

  return async (dispatch) => {
    try {
      if (starredClientsNames != null) {
        starredClientsNames = starredClientsNames.split(",");
        clientIndex = starredClientsNames.findIndex(
          (client) => client === الاسم
        );
      }

      if (clientIndex === -1)
        await updateDoc(doc(db, "users", auth.currentUser.email), {
          starredClients:
            starredClientsNames === null
              ? [الاسم]
              : starredClientsNames.concat(الاسم),
        });
      else {
        starredClientsNames.splice(clientIndex, 1);
        await updateDoc(doc(db, "users", auth.currentUser.email), {
          starredClients: starredClientsNames,
        });
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(
      clientsActions.updateStarredClients({
        الاسم,
        تليفون,
        تليفون2,
        العنوان,
        الموقع,
        المنطقة,
      })
    );
  };
};

export const addClient = (
  { name, tel1, tel2, region, address, location },
  allUsers
) => {
  return async (dispatch) => {
    Object.keys(allUsers).forEach(async (user) => {
      const addedClients = (await getDoc(doc(db, "users", user))).data()
        .addedClients;
      await updateDoc(doc(db, "users", user), {
        addedClients: addedClients.concat(name),
      });
    });
  };
};
