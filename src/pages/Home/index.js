import React from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import PageContent from "../../components/PageContent";

function Home() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
    </div>
  );
}

export default Home;
