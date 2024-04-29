import { addDoc, doc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { DB } from './firebase'

const App = () => {


  const uploadData = async () => {
    try {
      await setDoc(doc(DB, "NewTry", "NewDoc"),{
        name:"hello"
      })
      console.log("done")
    } catch (error) {
      console.log("dfsf",error)
    }
  }

  return (
    <>
    <button onClick={uploadData}>upload</button>
    </>
  )
}

export default App