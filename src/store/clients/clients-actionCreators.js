import { generalActions } from "../../store/general";
import { clientsActions } from "../../store/clients";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export const getAllClients = (userEmail) => {
  let clients = {};

  return async (dispatch) => {
    dispatch(generalActions.loading("clients"));

    const localClientsUpdated = Number(localStorage.getItem("clientsUpdated"));
    const clientsUpdated = (await getDoc(doc(db, "clients/updated"))).data()
      .clientsUpdated;

    if (localClientsUpdated > clientsUpdated)
      try {
        clients = JSON.parse(localStorage.getItem("clients"));

        const { addedClients, deletedClients } = (
          await getDoc(doc(db, "users", userEmail))
        ).data();
        if (addedClients.length) {
          await updateDoc(doc(db, "users", userEmail), {
            addedClients: [],
          });

          addedClients.forEach(async (clientName) => {
            const newClient = (
              await getDoc(doc(db, "clients", clientName))
            ).data();
            clients[clientName] = newClient;
          });
        }

        if (deletedClients.length) {
          await updateDoc(doc(db, "users", userEmail), {
            deletedClients: [],
          });

          deletedClients.forEach((clientName) => {
            delete clients[clientName];
          });
        }

        localStorage.setItem("clients", JSON.stringify(clients));
      } catch (error) {
        console.log(error);
      }
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

        await updateDoc(doc(db, "users", userEmail), {
          addedClients: [],
          deletedClients: [],
        });
      } catch (error) {
        alert(error);
      }

    try {
      const starredClientsNames = (
        await getDoc(doc(db, "users", userEmail))
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
  allUsers,
  clients
) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "clients", name), {
        العنوان: !!address ? address : "",
        المنطقة: !!region ? region : "",
        الموقع: !!location ? location : "",
        تليفون: !!tel1 ? tel1 : "",
        تليفون2: !!tel2 ? tel2 : "",
      });

      Object.keys(allUsers).forEach(async (user) => {
        const addedClients = (await getDoc(doc(db, "users", user))).data()
          .addedClients;
        if (addedClients.find((client) => client === name) === undefined)
          await updateDoc(doc(db, "users", user), {
            addedClients: addedClients.concat(name),
          });
      });
    } catch (error) {
      alert(error);
    }

    const newClients = await JSON.parse(JSON.stringify(clients));
    newClients[name] = {
      العنوان: !!address ? address : "",
      المنطقة: !!region ? region : "",
      الموقع: !!location ? location : "",
      تليفون: !!tel1 ? tel1 : "",
      تليفون2: !!tel2 ? tel2 : "",
    };

    dispatch(clientsActions.setClients(newClients));
    localStorage.setItem("clients", JSON.stringify(newClients));
  };
};

export const deleteClient = (clientName, allUsers) => {
  return async (dispatch) => {
    try {
      Object.keys(allUsers).forEach(async (user) => {
        const deletedClients = (await getDoc(doc(db, "users", user))).data()
          .deletedClients;
        if (
          deletedClients.find((client) => client === clientName) === undefined
        )
          await updateDoc(doc(db, "users", user), {
            deletedClients: deletedClients.concat(clientName),
          });
      });

      await deleteDoc(doc(db, "clients", clientName));

      const newClients = JSON.parse(localStorage.getItem("clients"));
      delete newClients[clientName];

      dispatch(clientsActions.setClients(newClients));
      localStorage.setItem("clients", JSON.stringify(newClients));
    } catch (error) {
      alert(error);
    }
  };
};

export const updateClient = (
  oldName,
  { الاسم, تليفون, تليفون2, المنطقة, العنوان, الموقع },
  allUsers
) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "clients", الاسم), {
        العنوان: !!العنوان ? العنوان : "",
        المنطقة: !!المنطقة ? المنطقة : "",
        الموقع: !!الموقع ? الموقع : "",
        تليفون: !!تليفون ? تليفون : "",
        تليفون2: !!تليفون2 ? تليفون2 : "",
      });

      Object.keys(allUsers).forEach(async (user) => {
        const addedClients = (await getDoc(doc(db, "users", user))).data()
          .addedClients;
        if (addedClients.find((client) => client === الاسم) === undefined)
          await updateDoc(doc(db, "users", user), {
            addedClients: addedClients.concat(الاسم),
          });
      });

      const newClients = JSON.parse(localStorage.getItem("clients"));
      delete newClients[oldName];
      newClients[الاسم] = {
        العنوان: !!العنوان ? العنوان : "",
        المنطقة: !!المنطقة ? المنطقة : "",
        الموقع: !!الموقع ? الموقع : "",
        تليفون: !!تليفون ? تليفون : "",
        تليفون2: !!تليفون2 ? تليفون2 : "",
      };

      dispatch(clientsActions.setClients(newClients));
      localStorage.setItem("clients", JSON.stringify(newClients));
    } catch (error) {
      alert(error);
    }
  };
};
