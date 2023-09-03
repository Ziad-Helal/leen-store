export default function Form({
  children,
  className = "",
  onSubmit = () => {},
}) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
