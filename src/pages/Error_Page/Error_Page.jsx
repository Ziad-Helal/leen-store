import { useSelector } from "react-redux";

export default function Error_Page() {
    const userRole = useSelector((state) => state.user.currentUser.userRole);

    return (
        <main className="text-center">
            <h2 className="text-red-600 text-9xl">404</h2>
            <p>درجة حسابك: "{userRole}"</p>
        </main>
    );
}
