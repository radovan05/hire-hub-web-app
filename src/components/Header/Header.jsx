import React from 'react'
import "./Header.css"
import { Navigate, useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate();
  let classSelectedHome; 
  let classSelectedCompanies; 
  
  if(window.location.pathname==='/'){
    classSelectedHome="header-selected"; 
    classSelectedCompanies=""; 
  }else if(window.location.pathname==='/companies'){
    classSelectedCompanies="header-selected"; 
    classSelectedHome=""; 
  }
  return (
    <>
      <div className="header-main-div">
        <img src={require("../../resources/pictures/logo.png")}  onClick={()=>{navigate('/')}}/>
        <div className="header-pages"> <p className={classSelectedHome} onClick={()=>{navigate('/')}}>Home</p>{" "} <span>|</span> <p className={classSelectedCompanies}  onClick={()=>{navigate('/companies')}}>Companies</p> </div>
        <div className='header-username'>Username</div>
      </div>
    </>
  )
}

export default Header
