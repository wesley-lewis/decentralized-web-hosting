import { create } from 'ipfs-http-client'
import { useRef } from 'react';
import { useState } from 'react';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' })
let fileUrl = ""

export default function Form() {
  const fileInputRef = useRef()
  const [hash, setHash] = useState("")

  async function uploadFile() {

    const file = fileInputRef.current.files[0]
    if (!file) {
      console.log('File doesnt exist')
    }
    const added = await ipfs.add(file);
    const hashValue = added.cid.toString()
    setHash(() => hashValue)
    fileUrl = fileUrl + hashValue + "/"
  }


  return (
    <>

      <form >

        <h3>Please upload your file </h3>
        <br />
        <input type="file" ref={fileInputRef} />
        <br />
        <br />
        <br />
        <div style={{ 'height': '60px', 'width': '200px', 'text-align': 'center', 'background-color': 'blue', 'cursor': 'pointer' }} onClick={uploadFile}>Tap to submit</div>
        {/* <button type="submit" onClick={uploadFile}> Submit </button> */}
      </form>


      {hash && <h1><a href={`http://localhost:8080/ipfs/${hash}`} target='_blank'>File Link</a></h1>}

    </>
  )
}

