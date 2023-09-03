import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useSelector } from "react-redux";

export default function Home_Page() {
  const userRole = useSelector((state) => state.user.currentUser.userRole);

  return (
    <main className="flex-auto p-4">
      <section className="flex flex-col gap-2 mx-auto w-full sm:w-60 transition-all">
        <h2 className="text-xl font-semibold text-center">اختصارات</h2>
        <Button kind="primary">
          <Link to="/clients/starredClients" className="block">
            قائمتي
          </Link>
        </Button>
        <Button kind="primary">
          <Link to="/clients" className="block">
            العملاء
          </Link>
        </Button>
        {(userRole === "مدير" || userRole === "مشرف") && (
          <>
            <Button kind="primary">
              <Link to="/clients/create-client" className="block">
                إضافة عميل
              </Link>
            </Button>
            <Button kind="primary">
              <Link to="/rounds" className="block">
                الحركة
              </Link>
            </Button>
            <Button kind="primary">
              <Link to="/users" className="block">
                المستخدمين
              </Link>
            </Button>
          </>
        )}
      </section>
    </main>
  );
}
