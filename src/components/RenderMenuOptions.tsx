import { NavLink } from "react-router";
import { SwirlElement } from "../assets/SwirlElement";
import { Logo } from "../assets/Logo";

interface IRenderMenuOptionsProps {
  isMenuPressed: boolean;
  setIsMenuPressed: (isMenuPressed: boolean) => void;
}

export const RenderMenuOptions = (props: IRenderMenuOptionsProps) => {
  const handleLinkClick = () => {
    props.setIsMenuPressed(false);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/booking", label: "Book table" },
    { to: "/contact", label: "Contact us" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full h-full bg-purple text-white duration-300 ease-in opacity-95 z-20 
          ${props.isMenuPressed ? "-translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex">
          <NavLink to={"/"} onClick={handleLinkClick}>
            <Logo className="w-33 m-5" />
          </NavLink>
        </div>

        <ul className="flex flex-col items-center justify-around h-[50%] w-full">
          {menuItems.map((m, i) => (
            <li key={i} className="flex gap-2 cursor-pointer group">
              <SwirlElement className="w-12 fill-yellow rotate-180 relative top-2.5 transition-all duration-200   group-hover:-scale-y-100 group-hover:-top-2.5" />
              <NavLink to={m.to} onClick={handleLinkClick} className="font-rajdhani font-medium text-2xl transition-all duration-250 group-hover:text-orange">
                {m.label}
              </NavLink>
              <SwirlElement className="w-12 fill-yellow relative bottom-2.5 transition-all duration-200   group-hover:-scale-y-100 group-hover:-bottom-2.5" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
