import React from "react";
export default function FilterSidebar({
  isOpen,
  toggleSidebar,
  categories,
  brands,
  selectedFilters,
  setSelectedFilters,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
}) {
  // Allowed Categories
  const allowedCategories = categories.filter((cat) =>
    ["Men's Fashion", "Women's Fashion", "Electronics"].includes(cat.name)
  );

  // Allowed Brands
  const allowedBrands = brands.filter((brand) =>
    ["Puma", "Defacto", "Dell", "Canon"].includes(brand.name)
  );

  // Close icon SVG (circle with arrow + x accent)
  const CloseIcon = (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-200"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        className="stroke-current opacity-30"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M14.5 8.5l-5 5m0-5l5 5"
        className="stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-white border-r border-gray-200 shadow-2xl
          p-4 pt-12
          overflow-y-auto
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <button
          onClick={toggleSidebar}
          aria-label="Close filters"
          className="group absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {CloseIcon}
        </button>

        
        {/* Sort */}
        <div className="mb-6">
          <h3 className="font-bold mb-3 text-darkPrimary text-lg">Sort by Price</h3>
          <label className="flex items-center mb-2 cursor-pointer select-none">
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={() => setSortOrder("asc")}
              className="accent-primary w-4 h-4"
            />
            <span className="ml-2 text-gray-700 text-sm">Low → High</span>
          </label>
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={() => setSortOrder("desc")}
              className="accent-primary w-4 h-4"
            />
            <span className="ml-2 text-gray-700 text-sm">High → Low</span>
          </label>
        </div>



        {/* filter*/}
      <div>
  <h2 className="text-xl font-bold  text-darkPrimary">Filters</h2>
        {/* Price Range */}
        <div className="mb-4">
          <h3 className="font-bold mb-3 text-primary text-lg">Price Range</h3>
          <input
            type="range"
            min="0"
            max="50000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-primary"
          />
          <p className="mt-2 text-sm text-gray-600">
            Up to: <span className="font-semibold text-primary">{priceRange} EGP</span>
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold mb-3 text-primary text-lg">Categories</h3>
          {allowedCategories.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center mb-2 cursor-pointer select-none hover:bg-gray-50 rounded px-1 py-0.5"
            >
              <input
                type="checkbox"
                checked={selectedFilters.categories.includes(cat._id)}
                onChange={() =>
                  setSelectedFilters((prev) => {
                    const exists = prev.categories.includes(cat._id);
                    return {
                      ...prev,
                      categories: exists
                        ? prev.categories.filter((c) => c !== cat._id)
                        : [...prev.categories, cat._id],
                    };
                  })
                }
                className="w-4 h-4 accent-primary border-gray-300 rounded-sm"
              />
              <span className="ml-2 text-gray-700 text-sm">{cat.name}</span>
            </label>
          ))}
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-bold mb-3 text-primary text-lg">Brands</h3>
          {allowedBrands.map((brand) => (
            <label
              key={brand._id}
              className="flex items-center mb-2 cursor-pointer select-none hover:bg-gray-50 rounded px-1 py-0.5"
            >
              <input
                type="checkbox"
                checked={selectedFilters.brands.includes(brand._id)}
                onChange={() =>
                  setSelectedFilters((prev) => {
                    const exists = prev.brands.includes(brand._id);
                    return {
                      ...prev,
                      brands: exists
                        ? prev.brands.filter((b) => b !== brand._id)
                        : [...prev.brands, brand._id],
                    };
                  })
                }
                className="w-4 h-4 accent-primary border-gray-300 rounded-sm"
              />
              <span className="ml-2 text-gray-700 text-sm">{brand.name}</span>
            </label>
          ))}
        </div>

      </div>

      </aside>
    </>
  );
}
