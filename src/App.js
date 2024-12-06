import AllCompaniesPage from "./pages/AllCompaniesPage/AllCompaniesPage.jsx"
import CompaniesReportPage from "./pages/CompaniesReportPage/CompaniesReportPage.jsx"
import HomePage from "./pages/HomePage/HomePage.jsx"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer"
import LogIn from "./modals/LogIn/LogIn.jsx"
import { Route,Routes } from "react-router"
import { useState } from "react"

function App() {
  const [user, setUser] = useState(undefined);
  
  if(!localStorage.getItem('user') && user){
    localStorage.setItem('user',JSON.stringify(user))
  }
  
  if(localStorage.getItem("user")!==undefined&& user===undefined){ 
    setUser(JSON.parse(localStorage.getItem('user')));
  }
  return (
    <>
    <Header user={user}  setUser={setUser}/>
    {user?null: <LogIn setUser={setUser} />}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/companies" element={<AllCompaniesPage/>}/>
      <Route path="/reports/:id" element={<CompaniesReportPage/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
