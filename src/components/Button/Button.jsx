export default function Button({
    children = "Button",
    type = "button",
    kind = "button",
    title = "",
    className = "",
    disabled = false,
    onClick = () => {},
}) {
    const styles = {
        button: "",
        primary: "border-transparent bg-gray-800 hover:bg-gray-700 py-1 px-3 rounded-lg",
        secondary: "border hover:bg-gray-700 hover:border-transparent  py-1 px-3 rounded-lg",
    };

    return (
        <button
            type={type}
            title={title}
            className={`transition ${styles[kind]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
