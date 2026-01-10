# 🤖 RAG System Integration Guide

## ✅ What Was Built

A complete, production-ready **RAG (Retrieval-Augmented Generation)** system has been created in the `rag_model/` folder with:

### 🏗️ Architecture (Option C - Modular)

```
rag_model/
├── core/                    # Core abstractions
│   ├── embeddings.py       # Google embeddings
│   ├── llm.py              # Gemini LLM
│   └── vector_store.py     # Milvus manager
│
├── services/                # Business logic
│   ├── document_service.py # PDF upload & indexing
│   ├── retrieval_service.py# Vector search
│   └── chat_service.py     # RAG orchestration
│
├── utils/                   # Utilities
│   ├── pdf_utils.py        # PDF processing
│   └── validators.py       # Input validation
│
├── upload_pdf.py           # 🛠️ CLI: Upload PDFs
├── query.py                # 🛠️ CLI: Query system
├── nextjs_integration.py   # 🌐 Next.js helpers
└── README.md               # Full documentation
```

### 🎯 Key Features

✅ **PDF Processing** - Automatic chunking and embedding  
✅ **Vector Namespaces** - Multiple collections (like "user_docs", "company_kb")  
✅ **Strict RAG** - Model cites sources, admits when it doesn't know  
✅ **CLI Tools** - Interactive upload and query scripts  
✅ **Next.js Ready** - Easy API route integration  
✅ **Production Code** - Error handling, validation, type hints  

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd rag_model
pip install -r requirements.txt
```

### 2. Start Milvus (Vector Database)

```bash
# Using Docker
docker run -d --name milvus-standalone -p 19530:19530 milvusdb/milvus:latest
```

### 3. Set Environment Variables

```bash
# Copy example env file
cp rag_model/.env.example rag_model/.env

# Edit with your API key
# GOOGLE_API_KEY=your-actual-api-key-here
```

Or export directly:

```bash
export GOOGLE_API_KEY="your-gemini-api-key"
```

### 4. Upload PDFs to Vector Namespace

```bash
python rag_model/upload_pdf.py
```

**Interactive prompts will guide you:**
1. List all available namespaces (or create new)
2. Select namespace or create one (e.g., "knowledge_base")
3. Choose PDF file to upload
4. Confirm and upload

**Example session:**

```
📚 Available Namespaces:
  [1] company_docs
  [2] product_manuals

🔖 Choose namespace:
  [0] Create new namespace
  Or select existing namespace by number

Your choice: 0

📝 Create New Namespace
Namespace name: my_documents

📄 Select PDF File
Enter path to PDF file: ./data/guide.pdf

✅ Upload Successful!
  Chunks created: 47
```

### 5. Query the System

```bash
python rag_model/query.py
```

**Interactive CLI:**
- Select namespace to query
- Ask questions
- Get answers with source citations

**Example:**

```
📚 Available Namespaces:
  [1] my_documents

🔖 Select namespace: 1

🤔 Your question: What is the main topic of the document?

📚 Sources:
  [1] guide.pdf (score: 0.234)

🤖 Answer:
According to guide.pdf, the main topic is...
```

---

## 🌐 Next.js Integration

### Option 1: Simple API Route (Quick)

Create `app/api/rag-query/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  const { question, namespace } = await request.json();

  const script = `
import sys
sys.path.insert(0, './rag_model')
from nextjs_integration import handle_rag_query
import json

result = handle_rag_query('${question.replace(/'/g, "\\'")}', '${namespace}')
print(json.dumps(result))
  `;

  try {
    const { stdout } = await execAsync(`python3 -c "${script}"`, {
      env: { ...process.env, GOOGLE_API_KEY: process.env.GOOGLE_API_KEY }
    });
    
    return NextResponse.json(JSON.parse(stdout));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Option 2: FastAPI Bridge (Production)

**More efficient for production - keeps Python process running**

1. Create `rag_model/api.py` (see README)
2. Run FastAPI: `uvicorn rag_model.api:app --reload`
3. Call from Next.js:

```typescript
export async function queryRAG(question: string, namespace: string) {
  const response = await fetch('http://localhost:8000/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, namespace })
  });
  return response.json();
}
```

See `rag_model/README.md` for complete FastAPI implementation.

---

## 📖 Documentation

| File | Description |
|------|-------------|
| [`rag_model/README.md`](./rag_model/README.md) | Full documentation with Next.js examples |
| [`RAG_QUICKSTART.md`](./RAG_QUICKSTART.md) | Quick reference guide |
| [`rag_model/nextjs_integration.py`](./rag_model/nextjs_integration.py) | Helper functions for Next.js |

---

## 🔧 Configuration

Edit `rag_model/config.py` or use environment variables:

```bash
# Required
GOOGLE_API_KEY=your-gemini-api-key

# Optional (with defaults)
MILVUS_HOST=localhost
MILVUS_PORT=19530
GEMINI_MODEL=gemini-1.5-flash
```

**Tune RAG parameters in `config.py`:**

```python
chunk_size: int = 1000      # Characters per chunk
chunk_overlap: int = 200    # Overlap between chunks
top_k: int = 3              # Number of chunks to retrieve
```

---

## 🧪 Testing

```bash
# Test listing namespaces
python -c "
from rag_model import DocumentService
print(DocumentService().list_namespaces())
"

# Test query
python -c "
from rag_model import ChatService
result = ChatService().answer_question('test question', 'your_namespace')
print(result)
"

# Test via integration helper
python rag_model/nextjs_integration.py list
python rag_model/nextjs_integration.py query my_namespace "What is this about?"
```

---

## 🎯 Use Cases

### 1. **Document Q&A Chatbot**
- Upload company docs to namespace "company_knowledge"
- Users ask questions via your Next.js app
- Get accurate answers with source citations

### 2. **Multi-Tenant Knowledge Base**
- Each user/organization gets their own namespace
- Upload user-specific PDFs
- Query only their documents

### 3. **Product Documentation Assistant**
- Upload product manuals to "product_docs"
- Customer support can query for answers
- Reduces support ticket load

### 4. **Research Paper Assistant**
- Upload academic papers
- Query across multiple papers
- Get synthesized answers with citations

---

## 📊 How It Works

```
┌─────────────┐
│   PDF File  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Chunk & Embed  │ (Google Embeddings)
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Milvus Vector  │ (Namespace: "my_docs")
│    Database     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  User Question  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Similarity      │ (Retrieve top-k chunks)
│ Search          │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Gemini LLM      │ (Generate answer from context)
│ (Strict RAG)    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Answer +       │
│  Sources        │
└─────────────────┘
```

---

## 🚢 Next Steps

1. ✅ **Test CLI tools** - Upload PDFs and query locally
2. 🌐 **Integrate with Next.js** - Add API routes
3. 🎨 **Build UI** - Create chat interface in your Next.js app
4. 🔐 **Add authentication** - Namespace per user
5. 📈 **Monitor performance** - Track query response times
6. 🚀 **Deploy** - Use Docker Compose for production

---

## ❓ Troubleshooting

**"GOOGLE_API_KEY not set"**
```bash
export GOOGLE_API_KEY="your-key"
```

**"Cannot connect to Milvus"**
```bash
docker restart milvus-standalone
```

**"Collection not found"**
- Upload PDFs first using `upload_pdf.py`

**"No module named 'rag_model'"**
```bash
cd rag_model
python upload_pdf.py
```

---

## 📞 Support

- Full docs: `rag_model/README.md`
- Integration examples: `rag_model/nextjs_integration.py`
- Quick start: `RAG_QUICKSTART.md`

---

**Built with ❤️ for easy Next.js integration**

