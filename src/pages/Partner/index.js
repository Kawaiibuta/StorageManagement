import React from "react";
import TabView from "../../components/Button Header/TabView";


const supplier = (
  1
)

const customer = (
  2
)

function Partner() {
  return (
    <div>
       <TabView
            tabs={[
              { name: "Supplier", content: supplier},
              { name: "Customer", content: customer },
            ]}
          />
    </div>
  );
}

export default Partner;
