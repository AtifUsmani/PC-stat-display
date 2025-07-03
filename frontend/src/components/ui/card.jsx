export function Card({ className, children }) {
  return (
    <div className={`rounded-2xl border border-gray-700 bg-gray-900 p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
