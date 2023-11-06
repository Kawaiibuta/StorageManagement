import "./App.css";
import NavBar from "./components/SideMenu";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <NavBar />
        <PageContent />
      </div>
    </div>
  );
}
export default App;
