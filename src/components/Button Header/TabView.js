import React, { useState } from "react";
import "./TabView.css";

function TabView({ tabs = [] }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [allTabs] = useState(tabs);

  const activateTab = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="TabView">
      <div className="body">
        {allTabs.length === 0 ? (
          <div className="tabs">
            <div>No Tabs</div>
          </div>
        ) : (
          <div>
            <div className="tabs">
              {allTabs.map((tab, index) => (
                <label
                  key={index}
                  className={index === activeTabIndex ? "active-tab" : "tab"}
                  onClick={() => activateTab(index)}
                >
                  {tab.name}
                </label>
              ))}
            </div>
            <div className="content" style={{ marginRight: "0px" }}>
              {allTabs[activeTabIndex].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabView;
