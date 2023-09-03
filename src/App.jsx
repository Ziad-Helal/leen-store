import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./components";
import { Main_PageLayout } from "./layouts";
import {
  Home,
  Profile_Page,
  Clients_Page,
  Rounds_Page,
  Login_Page,
  Register_Page,
  CreateClient_Page,
  Users_Page,
  Error_Page,
  StarredClients_Page,
} from "./pages";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { generalActions } from "./store/general";
import { userActions } from "./store/user";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.currentUser.userRole);
  const loading = useSelector((state) => state.general.loading.user);

  useEffect(() => {
    dispatch(generalActions.loading("user"));

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.email));
        dispatch(
          userActions.setCurrentUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userRole:
              userDoc.data() === undefined
                ? "مستخدم جديد"
                : userDoc.data().userRole,
          })
        );
      } else {
        dispatch(userActions.setCurrentUser({ userRole: "مستخدم بدون حساب" }));
        navigate("/login");
      }

      dispatch(generalActions.loaded("user"));
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Main_PageLayout>
      <Routes>
        {(userRole === "مستخدم بدون حساب" ||
          userRole === "مستخدم جديد" ||
          userRole === "مندوب" ||
          userRole === "مشرف" ||
          userRole === "مدير") && (
          <>
            <Route path="/login" element={<Login_Page />} />
            <Route path="/register" element={<Register_Page />} />
          </>
        )}
        {(userRole === "مستخدم جديد" ||
          userRole === "مندوب" ||
          userRole === "مشرف" ||
          userRole === "مدير") && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile_Page />} />
          </>
        )}
        {(userRole === "مندوب" ||
          userRole === "مشرف" ||
          userRole === "مدير") && (
          <>
            <Route path="/clients" element={<Clients_Page />} />
            <Route
              path="/clients/starredClients"
              element={<StarredClients_Page />}
            />
          </>
        )}
        {(userRole === "مشرف" || userRole === "مدير") && (
          <>
            <Route
              path="/clients/create-client"
              element={<CreateClient_Page />}
            />
            <Route path="/rounds" element={<Rounds_Page />} />
          </>
        )}
        {userRole === "مدير" && (
          <Route path="/users" element={<Users_Page />} />
        )}
        <Route path="*" element={<Error_Page />} />
      </Routes>
    </Main_PageLayout>
  );
}

export default App;
