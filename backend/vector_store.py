import chromadb

client = chromadb.PersistentClient(

path="chroma_db"

)


collection = client.get_or_create_collection(

name="resume_chunks"

)

def store_chunks(

chunks,

embeddings

):

    ids=[]

    for i in range(

        len(chunks)

    ):

        ids.append(

            str(i)

        )


    collection.add(

        ids=ids,

        documents=chunks,

        embeddings=embeddings

    )

def search_chunks(

query_embedding,

n_results=3

):

    results = collection.query(

        query_embeddings=[query_embedding],

        n_results=n_results

    )

    return results