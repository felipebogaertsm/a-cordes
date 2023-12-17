import Link from "next/link";

// Constants:
import { ROUTES } from "@/contants/routes";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-3 items-center justify-between bg-white px-4 py-1">
      <h3>à cordes</h3>
      <div className="flex-grow flex justify-center gap-4">
        <Link href={ROUTES.HOME}>Home</Link>
        <Link href={ROUTES.PRODUCTS}>Products</Link>
      </div>
      <div className="flex-grow flex justify-end gap-4">
        <Link href={ROUTES.ACCOUNTS.REGISTER}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
