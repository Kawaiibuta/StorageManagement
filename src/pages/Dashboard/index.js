import React from "react";
import TabView from "../../components/Button Header/TabView";

const inbound = (
  1
)

const outbound = (
  2
)
const inbound_and_outbound = (
  3
)

function Dashboard() {
  return (
    <div>
      <TabView
            tabs={[
              { name: "Inbound", content: inbound },
              { name: "Outbound", content: outbound },
              { name: "Inbound and Outbound", content: inbound_and_outbound },
            ]}
          />
    </div>
  );
}

export default Dashboard;
