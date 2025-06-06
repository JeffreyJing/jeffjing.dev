export default function Layout({ children }) {
  return (
    <div className="w-full flex flex-col items-center text-center pt-10 px-4">
      {children}
    </div>
  );
}