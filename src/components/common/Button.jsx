export const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-1 border bg-black text-white rounded-full hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-250 font-semibold ${className}`}
    >
      {children}
    </button>
  );
};
