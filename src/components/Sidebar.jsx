import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { CategoryContext } from "../context/CategoryContext";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const { categories } = useContext(CategoryContext);
  return (
    isSidebar && (
      <aside className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1 className="text-lg font-semibold">All Categories</h1>
          <button
            onClick={() => setIsSidebar(false)}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* CATEGORY LIST */}
        <ul className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
          {categories.map((category, idx) => (
            <li key={idx}>
              <Link
                to={`/category/${category.name}`}
                onClick={() => setIsSidebar(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium
                     hover:bg-orange-100 hover:text-orange-600 transition"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    )
  );
};

export default Sidebar;
