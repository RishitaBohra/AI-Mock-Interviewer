const BASE_URL = "http://127.0.0.1:8000"


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