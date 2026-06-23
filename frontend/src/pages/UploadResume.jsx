import { useState } from "react"
import {

uploadResume,

generateQuestions,

evaluateAnswer

}

from "../services/api"
function UploadResume(){
const [file,setFile] = useState(null)
const [role,setRole] = useState("")
const [difficulty,setDifficulty] = useState("")
const [questions,setQuestions] = useState("")
const [answer,setAnswer] = useState("")
const [evaluation,setEvaluation] = useState("")
const handleGenerateQuestions = async () => {

    const data = await generateQuestions(

        role,

        difficulty

    )

    console.log(data)

    setQuestions(

        data.questions

    )

}
const handleEvaluate = async ()=>{

    const data = await evaluateAnswer(

        questions,

        answer

    )

    console.log(data)

    setEvaluation(

        data.evaluation

    )

}
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

<select

value={difficulty}

onChange={(e)=>{

setDifficulty(

e.target.value

)

}}

>

<option>

Select Difficulty

</option>

<option>

Easy

</option>

<option>

Medium

</option>

<option>

Hard

</option>

</select>

<p>

Selected Difficulty:

{difficulty}

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
<button

onClick={handleGenerateQuestions}

>

Generate Questions

</button>
{

questions &&

<div>

<h2>

Interview Questions

</h2>

<pre>

{questions}

</pre>
<textarea

placeholder="Write your answer here..."

rows="8"

cols="60"

value={answer}

onChange={(e)=>{

setAnswer(

e.target.value

)

}}

>

</textarea>
<button

onClick={handleEvaluate}

>

Evaluate Answer

</button>
</div>


}
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