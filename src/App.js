import "./App.css";
import NavBar from "./components/SideMenu";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
import Authentication from "./pages/Authentication";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <NavBar />
        <PageContent />
      </div>
    </div>
    // <Authentication></Authentication>
  );
}
export default App;
