import Link from "next/link";

interface HeaderProps {
  sidebarTrigger?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = async ({ sidebarTrigger }) => {
  return (
    <>
      <div className="bg-stone-700 text-white flex px-4 py-2 md:hidden">
        <div className="flex items-center">
          {sidebarTrigger}
          <Link href={"/"}>
            <h1 className="text-xl font-bold">Vision Board Generator</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
