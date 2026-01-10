# RAG System Architecture

## 📐 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Next.js Frontend                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Chat UI        │  │  Upload UI      │  │  Namespace Picker  │  │
│  └────────┬────────┘  └────────┬────────┘  └─────────┬──────────┘  │
└───────────┼────────────────────┼──────────────────────┼─────────────┘
            │                    │                      │
            ▼                    ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Next.js API Routes                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  /api/rag       │  │  /api/upload    │  │  /api/namespaces   │  │
│  │  POST           │  │  POST           │  │  GET               │  │
│  └────────┬────────┘  └────────┬────────┘  └─────────┬──────────┘  │
└───────────┼────────────────────┼──────────────────────┼─────────────┘
            │                    │                      │
            └────────────────────┼──────────────────────┘
                                 │
                                 ▼
            ┌────────────────────────────────────────┐
            │   Python Child Process / FastAPI       │
            │   (nextjs_integration.py)              │
            └────────────────────┬───────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
    ┌───────────────────────────┐   ┌────────────────────┐
    │   rag_model Package       │   │  Configuration     │
    │                           │   │  (config.py)       │
    │  ┌─────────────────────┐  │   │                    │
    │  │  Services Layer     │  │   │  - API Keys        │
    │  │  ┌───────────────┐  │  │   │  - Milvus Config   │
    │  │  │ ChatService   │  │  │   │  - RAG Parameters  │
    │  │  │ - answer()    │  │  │   └────────────────────┘
    │  │  │ - stream()    │  │  │
    │  │  └───────────────┘  │  │
    │  │  ┌───────────────┐  │  │
    │  │  │DocumentService│  │  │
    │  │  │ - upload()    │  │  │
    │  │  │ - process()   │  │  │
    │  │  └───────────────┘  │  │
    │  │  ┌───────────────┐  │  │
    │  │  │RetrievalService│ │  │
    │  │  │ - retrieve()  │  │  │
    │  │  └───────────────┘  │  │
    │  └─────────────────────┘  │
    │                           │
    │  ┌─────────────────────┐  │
    │  │  Core Layer         │  │
    │  │  ┌───────────────┐  │  │
    │  │  │ VectorStore   │  │  │
    │  │  │ Manager       │  │  │
    │  │  └───────────────┘  │  │
    │  │  ┌───────────────┐  │  │
    │  │  │ Embeddings    │  │  │
    │  │  └───────────────┘  │  │
    │  │  ┌───────────────┐  │  │
    │  │  │ LLM           │  │  │
    │  │  └───────────────┘  │  │
    │  └─────────────────────┘  │
    │                           │
    │  ┌─────────────────────┐  │
    │  │  Utils              │  │
    │  │  - PDF Processing   │  │
    │  │  - Validation       │  │
    │  └─────────────────────┘  │
    └─────────┬─────────────────┘
              │
              ├─────────────────────────────┐
              │                             │
              ▼                             ▼
    ┌─────────────────────┐    ┌──────────────────────┐
    │  Milvus Vector DB   │    │  Google Gemini API   │
    │  (Moorcheh)         │    │                      │
    │                     │    │  - Embeddings        │
    │  - Namespaces       │    │  - LLM Generation    │
    │  - Vector Search    │    │                      │
    │  - Collections      │    │                      │
    └─────────────────────┘    └──────────────────────┘
```

## 🔄 Data Flow

### Upload Flow
```
1. User uploads PDF via Next.js UI
   ↓
2. Next.js API saves PDF temporarily
   ↓
3. Calls Python: handle_pdf_upload(path, namespace)
   ↓
4. DocumentService.upload_pdf()
   ↓
5. PDF → Load → Chunk → Embed
   ↓
6. VectorStoreManager.add_documents()
   ↓
7. Store in Milvus namespace
   ↓
8. Return success + chunk count
```

### Query Flow
```
1. User asks question via Next.js UI
   ↓
2. Next.js API receives {question, namespace}
   ↓
3. Calls Python: handle_rag_query(question, namespace)
   ↓
4. ChatService.answer_question()
   ↓
5. RetrievalService.retrieve() → Milvus similarity search
   ↓
6. Format context from top-k chunks
   ↓
7. LLM.generate() with strict RAG prompt + context
   ↓
8. Return {answer, sources, context_found}
   ↓
9. Display in Next.js UI with citations
```

## 🏗️ Layer Responsibilities

### **Core Layer** (Low-level abstractions)
- **VectorStoreManager**: Milvus connection, collection operations
- **Embeddings**: Google embedding model wrapper
- **LLM**: Gemini model wrapper

### **Services Layer** (Business logic)
- **DocumentService**: PDF processing, chunking, indexing
- **RetrievalService**: Vector search, context formatting
- **ChatService**: RAG orchestration (retrieve + generate)

### **Utils Layer** (Helpers)
- **pdf_utils**: PDF loading, validation
- **validators**: Input validation (namespace names, queries)

### **Integration Layer** (Next.js bridge)
- **nextjs_integration.py**: Helper functions for API routes
- Serializes/deserializes between TypeScript and Python

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│  Next.js Frontend                   │
│  - User authentication              │
│  - Rate limiting                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Next.js API Routes                 │
│  - Input sanitization               │
│  - File validation                  │
│  - Namespace access control         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Python RAG System                  │
│  - Validators module                │
│  - Type checking                    │
│  - Error handling                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  External Services                  │
│  - Milvus (local/cloud)             │
│  - Google Gemini API (env vars)     │
└─────────────────────────────────────┘
```

## 📦 Module Dependencies

```
nextjs_integration.py
    ├── services/
    │   ├── chat_service.py
    │   │   ├── core/llm.py
    │   │   └── retrieval_service.py
    │   │       └── core/vector_store.py
    │   │           └── core/embeddings.py
    │   │
    │   └── document_service.py
    │       ├── core/vector_store.py
    │       └── utils/pdf_utils.py
    │
    └── config.py
```

## 🚀 Deployment Options

### Option 1: Monolith (Simple)
```
┌────────────────────────────────┐
│  Next.js + Python (same host)  │
│  - Next.js on port 3000        │
│  - Python via child_process    │
│  - Milvus on port 19530        │
└────────────────────────────────┘
```

### Option 2: Microservices (Scalable)
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Next.js     │───▶│  FastAPI     │───▶│  Milvus      │
│  Port 3000   │    │  Port 8000   │    │  Port 19530  │
└──────────────┘    └──────────────┘    └──────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Google       │
                    │ Gemini API   │
                    └──────────────┘
```

### Option 3: Serverless (Cloud)
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Vercel      │───▶│  AWS Lambda  │───▶│  Milvus      │
│  Next.js     │    │  Python RAG  │    │  Cloud       │
└──────────────┘    └──────────────┘    └──────────────┘
```

## 🔧 Configuration Flow

```
Environment Variables (.env)
    ↓
config.py (Dataclasses)
    ↓
Core Layer (embeddings, llm, vector_store)
    ↓
Services Layer (uses config)
    ↓
CLI Tools / Next.js Integration
```

## 📊 Performance Considerations

### Bottlenecks
1. **PDF Processing**: CPU-bound (chunking)
2. **Embedding Generation**: API call latency
3. **Vector Search**: I/O to Milvus
4. **LLM Generation**: API call latency

### Optimizations
- ✅ Batch PDF uploads
- ✅ Cache embeddings
- ✅ Connection pooling (Milvus)
- ✅ Streaming responses (optional)
- ✅ Async processing (future)

---

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Easy testing and maintenance
- ✅ Scalable design
- ✅ Next.js integration ready
- ✅ Production-ready security

