import { Main_PageLayout_Header } from "../../../layouts";

export default function Main_PageLayout({ children }) {
    return (
        <>
            <Main_PageLayout_Header />
            {children}
        </>
    );
}
