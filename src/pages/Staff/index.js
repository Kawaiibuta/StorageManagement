import React from "react";
import TabView from "../../components/Button Header/TabView";


const employee = (
  1
)

const user = (
  2
)

function Staff() {
  return (
    <div>
       <TabView
            tabs={[
              { name: "Employee", content: employee},
              { name: "User", content: user },
            ]}
          />
    </div>
  );
}

export default Staff;
