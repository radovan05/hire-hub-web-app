import AllCompaniesPage from "./pages/AllCompaniesPage/AllCompaniesPage.jsx"
import CompaniesReportPage from "./pages/CompaniesReportPage/CompaniesReportPage.jsx"
import HomePage from "./pages/HomePage/HomePage.jsx"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer"
import { Route,Routes } from "react-router"

function App() {
  return (
    <>
    <Header/>
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
