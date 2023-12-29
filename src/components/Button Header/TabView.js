import React, { useState } from "react";
import "./TabView.css";
import { Avatar, Flex, Segmented } from "antd";

function TabView({ tabs = [] }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const allTabs = tabs;

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

                // <div
                //   style={{
                //     padding: 4,
                //   }}
                // >

                //   <div>User 1</div>
                // </div>
              ))}
            </div>
            <div className="content">{allTabs[activeTabIndex].content}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabView;
