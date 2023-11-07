import React from "react";
import TabView from "../../components/Button Header/TabView";

function Dashboard() {
  return (
    <div>
      <TabView
            title={""}
            tabs={[
              { name: "Inbound", content: 1 },
              { name: "Outbound", content: 2 },
            ]}
          />
    </div>
  );
}

export default Dashboard;
