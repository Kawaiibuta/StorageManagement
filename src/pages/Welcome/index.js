import React from "react";
import welcomeScreen from "../../assets/images/warehouse_screen.png";

function Welcome() {
  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        src={welcomeScreen}
        alt="welcome"
      />
    </div>
  );
}

export default Welcome;
