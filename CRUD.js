import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { DB } from './firebase'

const App = () => {
  const [GR, setGR] = useState("")
  const [Report_Year, setReport_Year] = useState("")
  // const reference = collection
  const fetchAllData = async () => {
    const CollectionReference = collection(DB, "Try")
    const fetchAllData = await getDocs(CollectionReference)
    let allData = fetchAllData.docs.map(val => val.data())
    console.log(allData) //done
  }

  const fetchData = async () => {
    const CollectionReference = collection(DB, "Try")
    const fetchAllData = await getDoc(doc(CollectionReference, GR))
    let allData = fetchAllData.data()
    console.log(allData) //done
  }

  const fetchReport = async (Home_Collection, GR) => {
    const CollectionReference = collection(DB, `${Home_Collection}/${GR}/Report_Years`)
    const fetchAllData = await getDocs(CollectionReference)
    let Reports_Data = fetchAllData.docs.map((val) => {

      let current_Report_Year_Data = val.data()
      let current_Report_Year = val._document.key.path.segments[8]

      let Obj = { GR, current_Report_Year, ...current_Report_Year_Data }
      return Obj
    })
    let current_Report = Reports_Data.filter(val => val.current_Report_Year === Report_Year)
    console.log("Fetch Report", current_Report[0])
    return current_Report[0]
  }

  const deleteReport = async (Home_Collection, GR) => {
    let Report_Data = await fetchReport(Home_Collection, GR)
    try {
        let response = await deleteDoc(doc(DB, `${Home_Collection}/${Report_Data.GR}/Report_Years`, Report_Data.current_Report_Year ))
        console.log(response)
        console.log("Report Deleted")
    } catch (error) {
      console.log("Error while Deleting", error)
    }

  }

  return (
    <>
      <h1>Hello</h1>
      <TextField value={GR} placeholder='GR Number' onChange={e => setGR(e.target.value)} sx={{margin :'0 8px'}} />
      <TextField value={Report_Year} placeholder='Report Year' onChange={e =>setReport_Year(e.target.value)} sx={{margin :'0 8px'}} />
      <Button sx={{margin :'0 8px'}} onClick={fetchAllData} variant='contained'> fetch All Data</Button>
      <Button sx={{margin :'0 8px'}} onClick={fetchData} variant='contained'> fetch Data</Button>
      <Button sx={{margin :'0 8px'}} onClick={() => {fetchReport("Try", GR)}} variant='contained'> fetch Report</Button>
      <Button sx={{margin :'0 8px'}} onClick={() => {deleteReport("Try", GR)}} variant='contained'> Delete Report</Button>
    </>
  )
}

export default App
