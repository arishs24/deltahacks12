from moorcheh_sdk import MoorchehClient

client = MoorchehClient(api_key="CE06GHfppJ3yVbhF7y6J77EaISUGgq2d8lEywSkB")

namespace = client.namespaces.create(
    name="knee_biomechanics_test",
    description="Keyword retrieval test using knee FEA biomechanics paper"
)

client.documents.upload(
    namespace_id=namespace.id,
    file_path="C:\Users\ahyan\OneDrive\Desktop\s13018-025-06583-5_reference.pdf",
    metadata={
        "source": "Biomechanics journal",
        "methods": "FEA",
        "anatomy": "knee"
    }
)

results = client.search(
    namespace_id=namespace.id,
    query="finite element analysis ligament stress",
    search_type="keyword",
    top_k=5
)

for r in results:
    print(r.text)
    print(r.keywords)
    print("----")
