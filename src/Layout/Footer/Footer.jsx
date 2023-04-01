import React from "react";
import LogoIcon from "./../../Components/shared/LogoIcon/LogoIcon";

export default function Footer() {
  return (
    <>
      <footer className="footer footer-center p-8 bg-formColor text-base-content">
        <div className="flex">
          <LogoIcon />
          <p>Copyright © 2023 - All right reserved</p>
        </div>
      </footer>
    </>
  );
}
