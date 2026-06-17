from embeddings import get_embedding

from vector_store import search_chunks


query_embedding = get_embedding(

"Flutter Interview"

).tolist()


results = search_chunks(

query_embedding

)


print(

results["documents"]

)
