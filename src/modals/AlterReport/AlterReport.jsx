import React from 'react'
import { useState,useEffect } from 'react'
import './AlterReport.css'

const AlterReport = ({closeModal,rep,token,setLogin}) => {
  const [candidates, setCandidates] = useState([]);
  const [phase,setPhase]=useState(rep.phase);
  const [status,setStatus]=useState(rep.status);
  const [note, setNote]=useState(rep.note);
  

  useEffect(() => {
    const CANDIDATES_URL = `http://localhost:3333/api/candidates?id=${rep.candidateId}`;
    fetch(CANDIDATES_URL)
      .then((res) => res.json())
      .then((data) => setCandidates(data[0]));
  }, []);

  return (
    <div className='alter-body' onClick={()=>{
      closeModal(false)
      
    }}>
      <div className="alter-main-div" onClick={(e)=>{e.stopPropagation()}}>
      <div className="report-data">
          <div className="report-data-left">
            <h2>Candidate Information</h2>

            <p>
              <strong>Name:</strong> {candidates.name}
            </p>
            <p>
              <strong>Birthday:</strong> {candidates?.birthday}
            </p>
            <p>
              <strong>Education:</strong> {candidates.education}
            </p>
            <p>
              <strong>Email:</strong> {candidates.email}
            </p>
          </div>
          <div className="report-data-right">
            <h2>Report Information</h2>
            <p>
              <strong>Phase:</strong> <input type="text" placeholder={rep.phase} onChange={(e)=>{
                setPhase(e.target.value)
              }}/>
            </p>
            <p>
              <strong>Status:</strong> <input type="text" placeholder={rep.status} onChange={(e)=>{
                setStatus(e.target.value)
              }}/>
            </p>
            <p>
              <strong>Interview Date: </strong>
              {new Date(rep.interviewDate).toLocaleString()}
            </p>
            <p>
              <strong>Note: </strong> <textarea cols="30" rows="10" defaultValue={note} onChange={(e)=>{
                setNote(e.target.value)
              }}></textarea>
            </p>
            {rep.note!==note || rep.status !==status || rep.phase!==phase ?
             <button onClick={()=>{
              fetch(`http://localhost:3333/api/reports/${rep.id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  method: "put",
                  body: JSON.stringify({
                    candidateId: candidates.id,
                    candidateName: candidates.name,
                    companyId: rep.companyId,
                    companyName: rep.companyName,
                    interviewDate: Date(),
                    phase: phase,
                    status: status,
                    note: note,
                  }),
                }).then((res) => res.json()).then(data => {
                  if (data === "jwt expired") {
                    setLogin(false);
                  }
                });
                closeModal(false);
             }}>Submit Change</button>
            :null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlterReport
