from embeddings import get_embedding

from vector_store import (

store_chunks,

search_chunks

)


chunks=[

"Flutter Widgets",

"React Hooks",

"Machine Learning"

]


embeddings=[]


for chunk in chunks:

    embeddings.append(

        get_embedding(chunk)

    )


store_chunks(

chunks,

embeddings

)


query_embedding = get_embedding(

"Flutter Interview"

)


results=search_chunks(

query_embedding

)


print(results)