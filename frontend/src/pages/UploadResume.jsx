import { useState } from "react"
function UploadResume(){
const [file,setFile] = useState(null)
return(

<div>

<h1>AI Mock Interviewer</h1>

<input

type="file"

onChange={(e)=>{

setFile(e.target.files[0])

}}

/>
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