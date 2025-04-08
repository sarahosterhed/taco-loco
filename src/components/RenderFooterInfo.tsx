import { Link } from "react-router";
import { Logo } from "../assets/Logo";

export const RenderFooterInfo = () => {
  return (
    <div className="h-full flex items-center justify-between p-5 text-white">
      <Link to={"/"}>
        <Logo className="w-33" />
      </Link>

      <div className="flex flex-col gap-2">
        <Link to={"booking"} className="font-rajdhani font-medium text-base cursor-pointer transition duration-250 ease-in-out hover:text-yellow">Book table</Link>
        <Link to={"contact"} className="font-rajdhani font-medium text-base cursor-pointer transition duration-250 ease-in-out hover:text-yellow">Contact us</Link>
      </div>
    </div>
  );
};
