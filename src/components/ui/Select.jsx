export function Select({ children, ...props }) {
  return (
    <select className="field" {...props}>
      {children}
    </select>
  );
}
