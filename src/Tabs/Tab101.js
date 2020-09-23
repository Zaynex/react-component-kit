import React, { useState } from "react";

export const Tab101 = () => {
  const [value, setValue] = useState(0);
  const getClassName = (baseName, isSelected) =>
    (isSelected ? [baseName].concat("selected") : [baseName]).join(" ");
  return (
    <div className="tabs">
      <div className="tablist">
        <div
          className={getClassName("tab-list-item", value === 0)}
          onClick={() => setValue(0)}
        >
          tab0
        </div>
        <div
          className={getClassName("tab-list-item", value === 1)}
          onClick={() => setValue(1)}
        >
          tab1
        </div>
        <div
          className={getClassName("tab-list-item", value === 2)}
          onClick={() => setValue(2)}
        >
          tab2
        </div>
      </div>
      <div className="tabpanel">
        {value === 0 && <div className="tab-panel-item">TabContent 0</div>}
        {value === 1 && <div className="tab-panel-item">TabContent 1</div>}
        {value === 2 && <div className="tab-panel-item">TabContent 2</div>}
      </div>
    </div>
  );
};
