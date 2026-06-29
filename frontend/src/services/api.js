const BASE_URL = "https://interviewer-backend-mnq2.onrender.com";


export const uploadResume = async (file) => {

    const formData = new FormData()

    formData.append(

        "file",

        file

    )


    const response = await fetch(

        `${BASE_URL}/upload`,

        {

            method: "POST",

            body: formData

        }

    )


    return response.json()

}


export const generateQuestions =

async(

role,

difficulty

)=>{


const response =

await fetch(

"http://127.0.0.1:8000/generate-questions",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

role,

difficulty

})

}

)


return response.json()

}

export const evaluateAnswer =

async(

question,

answer

)=>{


const response =

await fetch(

"http://127.0.0.1:8000/evaluate-answer",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

question,

answer

})

}

)


return response.json()

}