export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <img src="/logo.svg" height="40" width="40" alt="Logo" className="dark:hidden" />
      <img src="/logo-dark.svg" height="40" width="40" alt="Logo" className="hidden dark:block" />
      <p className="font-semibold">JustNotion</p>
    </div>
  );
};
