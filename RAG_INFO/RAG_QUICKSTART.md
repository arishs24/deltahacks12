# 🚀 RAG System Quick Start

This project now includes a modular RAG system in the `rag_model/` folder.

## 📦 What's Included

- **Modular Architecture**: Clean separation of concerns (core, services, utils)
- **PDF Processing**: Upload and index PDFs into vector namespaces
- **Milvus Vector Store**: Efficient similarity search
- **Google Gemini**: Strict RAG-based answer generation
- **CLI Tools**: Interactive upload and query scripts
- **Next.js Ready**: Easy integration with API routes

## 🏃 Quick Start

### 1. Install Dependencies

```bash
cd rag_model
pip install -r requirements.txt
```

### 2. Start Milvus

```bash
docker run -d --name milvus-standalone -p 19530:19530 milvusdb/milvus:latest
```

### 3. Set API Key

```bash
export GOOGLE_API_KEY="your-gemini-api-key-here"
```

### 4. Upload PDFs

```bash
python rag_model/upload_pdf.py
```

- Lists all available namespaces (collections)
- Create new or select existing namespace  
- Upload your PDF file
- Automatic chunking and indexing

### 5. Query the System

```bash
python rag_model/query.py
```

- Select namespace to query
- Ask questions interactively
- Get answers with source citations

## 📖 Full Documentation

See [`rag_model/README.md`](./rag_model/README.md) for:
- Detailed architecture
- Next.js integration examples
- API route implementations
- FastAPI bridge setup
- Configuration options
- Production deployment

## 🌐 Next.js Integration

The RAG system is designed to work seamlessly with Next.js API routes. See the README for:

1. **Upload PDF API Route** - Handle file uploads from frontend
2. **Query API Route** - Process questions and return answers
3. **FastAPI Bridge** - Production-ready Python service layer

## 🎯 Key Features

✅ **Strict RAG**: Model only uses retrieved context, cites sources  
✅ **Multi-Namespace**: Separate collections for different document sets  
✅ **PDF Support**: Automatic page extraction and chunking  
✅ **Streaming**: Real-time answer generation (optional)  
✅ **Production Ready**: Error handling, validation, logging  

## 📁 Project Structure

```
rag_model/
├── core/          # Core abstractions (embeddings, LLM, vector store)
├── services/      # Business logic (document, retrieval, chat)
├── utils/         # Helpers (PDF processing, validation)
├── upload_pdf.py  # CLI: Upload PDFs
├── query.py       # CLI: Query system
└── README.md      # Full documentation
```

## 🔗 Integration Points

- **Document Upload**: `DocumentService.upload_pdf()`
- **Query RAG**: `ChatService.answer_question()`
- **List Namespaces**: `DocumentService.list_namespaces()`
- **Streaming**: `ChatService.stream_answer()`

---

Happy building! 🎉

