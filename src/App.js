import "./App.css";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import SideMenu from "./components/SideMenu";

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);

  if (user) {
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
  return <Authentication></Authentication>;
}
export default App;
