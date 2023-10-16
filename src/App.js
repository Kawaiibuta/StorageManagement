import "./App.css";
import NavBar from "./components/SideMenu";
import PageContent from "./components/PageContent";

function App() {
  return (
    <div className="App">
      <div className="SideMenuAndPageContent">
        <NavBar />
        <PageContent />
      </div>
    </div>
  );
}
export default App;
