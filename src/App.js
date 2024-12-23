import AllCompaniesPage from "./pages/AllCompaniesPage/AllCompaniesPage.jsx"
import CompaniesReportPage from "./pages/CompaniesReportPage/CompaniesReportPage.jsx"
import HomePage from "./pages/HomePage/HomePage.jsx"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer"
import LogIn from "./modals/LogIn/LogIn.jsx"
import { Route,Routes } from "react-router"
import { useState } from "react"
import NotFound from "./pages/NotFound/NotFound.jsx"
function App() {
  const [user, setUser] = useState(undefined);
  const [login, setLogin] = useState(false);
  
  if(!localStorage.getItem('user') && user){
    localStorage.setItem('user',JSON.stringify(user))
    setLogin(true)
  }
  
  if(localStorage.getItem("user")!==undefined&& user===undefined){ 
    setUser(JSON.parse(localStorage.getItem('user')));
    setLogin(true)
  }
  return (
    <>
    <Header user={user}  setUser={setUser}  login={login} setLogin={setLogin}/>
    {user?null: <LogIn setUser={setUser} />}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='*' element={<NotFound/>} />
      <Route path="/reports/:id" element={<CompaniesReportPage user={user}  setLogin={setLogin}/> }/>
      <Route path="/companies" element={<AllCompaniesPage user={user} setUser={setUser}  setLogin={setLogin}/>}/>

    </Routes>
    <Footer/>
    </>
  );
}

export default App;
