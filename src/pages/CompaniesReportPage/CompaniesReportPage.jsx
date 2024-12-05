import React from 'react'
import './CompaniesReportPage.css'
import { useState, useEffect } from 'react'; 



const REPORTS_URL = 'http://localhost:3333/api/reports';

const CompaniesReportPage = () => {
  const [reports, setReports] = useState([])
  
  
  const id = (window.location.search).slice(2);
  
  useEffect(() => {
    fetch(REPORTS_URL).then((res) => res.json()).then((data) => console.log(data))
  }, [])

  return (
    <div>
      {id}
    </div>
  )
}

export default CompaniesReportPage
