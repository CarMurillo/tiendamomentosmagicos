import React, { useState } from 'react';

const FilterChange = ({ onFilterChange }) => {
  const initialFilters = {
    Peluches: false,
    Chocolates: false,
    Licores: false,
    Tazas: false,
    Desayunos: false,
    Flores: false,
    Detalles: false,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (filter) => {
    const newFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFilter = () => {
    setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
  };

  return (
    <>
    <link rel="stylesheet" href="https://cdn.lineicons.com/3.0/lineicons.css"></link>
    <button className="button-filter" onClick={toggleFilter}>
      <i class="lni lni-funnel lni-2x"></i>&nbsp;{isFilterOpen ? 'Ocultar Filtro' : 'Mostrar Filtro'}
    </button>
      {isFilterOpen && (
        <div className="sidebar">
          <div>
            <h3>Filtrar por categoría</h3>
          </div>
          {Object.keys(filters).map((filter) => (
            <div key={filter}>
              <label>
                <input
                  type="checkbox"
                  checked={filters[filter]}
                  onChange={() => handleFilterChange(filter)}
                />
                {filter}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterChange;