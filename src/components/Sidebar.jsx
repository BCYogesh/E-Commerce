import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { CategoryContext } from "../context/CategoryContext";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const { categories } = useContext(CategoryContext);
  return (
    isSidebar && (
      <aside className="w-72 bg-white h-screen fixed z-50 p-4">
        <div className="flex items-center justify-between  text-[18px]">
          <h1>All categories</h1>
          <button
            className="cursor-pointer"
            onClick={() => setIsSidebar(false)}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="my-2 overflow-y-scroll h-[calc(100vh-64px)]">
          {categories.map((category, idx) => (
            <li
              key={idx}
              onClick={() => setIsSidebar(false)}
              className="py-1 border-b-2 border-orange-400 cursor-pointer"
            >
              <Link to={"/category/" + category?.name}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    )
  );
};

export default Sidebar;
