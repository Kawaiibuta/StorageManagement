import React from "react";
import TabView from "../../components/Button Header/TabView";


const all = (
  1
)

const order = (
  2
)
const delivery = (
  3
)

function InBound() {
  return (
    <div>
       <TabView
            tabs={[
              { name: "ALL", content: all },
              { name: "Order", content: order },
              { name: "Delivery", content: delivery },
            ]}
          />
    </div>
  );
}

export default InBound;
