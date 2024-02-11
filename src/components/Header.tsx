import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between">

      <Link href="/" className="flex items-center space-x-2">

        <Image
          src="https://play-lh.googleusercontent.com/UXN-Zrp3Ijrne8QE9zAvt67tRaJJXvdP4E5i8ewsyBBW8PLWsdqTWHmphsOphzViqcXM"
          alt="logo"
          width={50}
          height={50}
          className="px-1 py-1"
        />
        <h1 className="font-bold text-xl ">DocVault</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
      
        <ThemeToggle/>
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
