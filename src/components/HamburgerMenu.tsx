import { useState } from "react";
import { RenderMenuOptions } from "./RenderMenuOptions";

export const HamburgerMenu = () => {
  const [isMenuPressed, setIsMenuPressed] = useState(false);

  const menuNotActive = "h-1 w-full rounded-md bg-blue transition-colors duration-150 ease-in z-40 group-hover:bg-white";

  const menuActive = "h-1 w-full rounded-md bg-blue relative duration-150 ease-in z-40 transition-colors duration-150 ease-in z-40 group-hover:bg-white";

  const hamburgurStyling = "h-10 w-10 flex flex-col justify-around cursor-pointer";

  return (
    <>
      <div className="z-50 group"
        onClick={() => {
          setIsMenuPressed(!isMenuPressed);
        }}
      >
        {isMenuPressed ? (
          <div className={hamburgurStyling}>
            {" "}
            <div className={`${menuActive} -rotate-45 translate-y-3 `}></div>
            <div className="opacity-0"></div>
            <div className={`${menuActive} rotate-45 -translate-y-3`}></div>
          </div>
        ) : (
          <div className={hamburgurStyling}>
            {" "}
            <div className={menuNotActive}></div>
            <div className={menuNotActive}></div>
            <div className={menuNotActive}></div>
          </div>
        )}
      </div>
      <RenderMenuOptions isMenuPressed={isMenuPressed} setIsMenuPressed={setIsMenuPressed} />
    </>
  );
};
