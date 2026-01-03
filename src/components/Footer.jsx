import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-400 p-4">
      <div className="flex justify-center items-center flex-col gap-4 font-semibold text-sm">
        <p className="uppercase">
          Privacy policy | Terms of service | About us
        </p>
        <p>©{new Date().getFullYear()} All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
