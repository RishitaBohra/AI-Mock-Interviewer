import { useState } from "react"
import { uploadResume } from "../services/api"
function UploadResume(){
const [file,setFile] = useState(null)
const [role,setRole] = useState("")
const handleUpload = async () => {

    const data = await uploadResume(file)

    console.log(data)

    alert("Resume Uploaded Successfully")

}
return(

<div>

<h1>AI Mock Interviewer</h1>
<select

value={role}

onChange={(e)=>{

setRole(

e.target.value

)

}}

>

<option>

Select Role

</option>

<option>

SDE Intern

</option>

<option>

Frontend Developer

</option>

<option>

Flutter Developer

</option>

<option>

ML Engineer

</option>

<option>

Data Scientist

</option>

</select>
<p>

Selected Role:

{role}

</p>

<input

type="file"

onChange={(e)=>{

setFile(e.target.files[0])

}}

/>
<button onClick={handleUpload}>

Upload

</button>
{

file &&

<p>

Selected File:

{file.name}

</p>

}

</div>

)

}

export default UploadResume