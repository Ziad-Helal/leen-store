import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  children,
  id,
  dir = "rtl",
  onBackdropClick = () => {},
  onRender = () => {},
}) {
  useEffect(() => {
    onRender();
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div
          id={id}
          dir={dir}
          className="overflow-y-auto fixed top-0 left-0 w-full h-screen grid place-items-center p-2 z-20"
        >
          <div
            className="fixed top-0 left-0 w-full h-full bg-primary_950 opacity-50"
            onClick={onBackdropClick}
          ></div>
          <div className="z-10">{children}</div>
        </div>,
        document.getElementById("modals_root")
      )}
    </>
  );
}
