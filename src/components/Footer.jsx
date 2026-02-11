import React from "react";
import { FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-400 p-4">
      <div className="flex justify-center items-center flex-col gap-4 font-semibold text-sm">
        <p>
          Made with <FaHeart className="inline" color="red" size={18} /> by
          Yogesh.
        </p>
        <a href="https://github.com/BCYogesh" target="_blank">
          <FaGithub size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
