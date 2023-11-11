import React from "react";
import TabView from "../../components/Button Header/TabView";


const inventory = (
  1
)

const inventory_report = (
  2
)


function Inventory() {
  return (
    <div>
       <TabView
            tabs={[
              { name: "Inventory", content: inventory},
              { name: "Inventory Report", content: inventory_report },
            ]}
          />
    </div>
  );
}

export default Inventory;
