import { userActions } from "../../store/user";
import { generalActions } from "../../store/general";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, googleProvider } from "../../config/firebase";

export const authUser = ({ type, name, email, password }, navigate) => {
  let userDoc;

  return async (dispatch) => {
    dispatch(generalActions.loading("formSubmition"));

    try {
      switch (type) {
        case "createUserWithEmailAndPassword":
          await createUserWithEmailAndPassword(auth, email, password);
          updateProfile(auth.currentUser, {
            displayName: name,
          });
          await setDoc(doc(db, "users", email), {
            displayName: name,
            userRole: "مستخدم جديد",
            starredClients: [],
            addedClients: [],
            deletedClients: [],
          });
          break;

        case "signInWithEmailAndPassword":
          await signInWithEmailAndPassword(auth, email, password);
          auth.onAuthStateChanged(async (user) => {
            userDoc = await getDoc(doc(db, "users", user.email));
          });
          break;

        case "singInWithGoogle":
          await signInWithPopup(auth, googleProvider);
          auth.onAuthStateChanged(async (user) => {
            userDoc = await getDoc(doc(db, "users", user.email));
            if (userDoc.data() === undefined)
              await setDoc(doc(db, "users", user.email), {
                displayName: user.displayName,
                photoURL: user.photoURL,
                userRole: "مستخدم جديد",
                starredClients: [],
                addedClients: [],
                deletedClients: [],
              });
          });
          break;

        default:
          console.log("Undefined way of logging in!");
          break;
      }

      auth.onAuthStateChanged(async (user) => {
        dispatch(
          userActions.setCurrentUser({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            userRole: userDoc ? userDoc.data().userRole : "مستخدم جديد",
          })
        );
      });

      navigate("/");
    } catch (error) {
      alert(error);
    }

    dispatch(generalActions.loaded("formSubmition"));
  };
};

export const logOutUser = (navigate) => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(userActions.clearCurrentUser());
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = {};
    const usersDocs = (await getDocs(collection(db, "users"))).docs;
    usersDocs.forEach((user) => (users[user.id] = user.data()));
    dispatch(userActions.setAllUsers(users));
  };
};

export const changeUserRole = ({ email, newRole }) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "users", email), { userRole: newRole });
      dispatch(userActions.modifyAUserRole({ email, newRole }));
    } catch (error) {
      alert(error);
    }
  };
};
