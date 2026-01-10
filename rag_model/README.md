# RAG Model - Milvus + Google Gemini

A modular, production-ready RAG (Retrieval-Augmented Generation) system using **Milvus** (Moorcheh) vector database and **Google Gemini** LLM. Designed for easy integration with **Next.js API routes**.

## 📁 Project Structure

```
rag_model/
├── __init__.py              # Package exports
├── config.py                # Centralized configuration
├── requirements.txt         # Python dependencies
│
├── core/                    # Core abstractions
│   ├── __init__.py
│   ├── embeddings.py       # Google embeddings wrapper
│   ├── llm.py              # Gemini LLM wrapper
│   └── vector_store.py     # Milvus connection manager
│
├── services/                # Business logic services
│   ├── __init__.py
│   ├── document_service.py # PDF processing & indexing
│   ├── retrieval_service.py # Vector similarity search
│   └── chat_service.py     # RAG orchestration
│
├── utils/                   # Utilities
│   ├── __init__.py
│   ├── pdf_utils.py        # PDF processing helpers
│   └── validators.py       # Input validation
│
├── upload_pdf.py           # 🛠️ CLI: Upload PDFs to namespace
└── query.py                # 🛠️ CLI: Query RAG system
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd rag_model
pip install -r requirements.txt
```

### 2. Start Milvus

```bash
# Using Docker
docker run -d \
  --name milvus-standalone \
  -p 19530:19530 \
  -p 9091:9091 \
  milvusdb/milvus:latest
```

### 3. Set Environment Variables

```bash
# Linux/Mac
export GOOGLE_API_KEY="your-gemini-api-key"

# Windows CMD
set GOOGLE_API_KEY=your-gemini-api-key

# Windows PowerShell
$env:GOOGLE_API_KEY="your-gemini-api-key"
```

### 4. Upload PDFs

```bash
python upload_pdf.py
```

The script will:
- List all available namespaces (collections)
- Let you create a new namespace or select existing
- Upload and index your PDF into the namespace

### 5. Query the System

```bash
python query.py
```

Interactive CLI for asking questions!

---

## 🔧 Configuration

Edit `config.py` or use environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `GOOGLE_API_KEY` | *(required)* | Google Gemini API key |
| `MILVUS_HOST` | `localhost` | Milvus server host |
| `MILVUS_PORT` | `19530` | Milvus server port |
| `GEMINI_MODEL` | `gemini-1.5-flash` | Gemini model name |

---

## 🌐 Next.js Integration

### Example 1: Upload PDF API Route

Create `app/api/upload-pdf/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { spawn } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const namespace = formData.get('namespace') as string;

    if (!file || !namespace) {
      return NextResponse.json(
        { error: 'Missing file or namespace' },
        { status: 400 }
      );
    }

    // Save PDF temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = join('/tmp', file.name);
    await writeFile(tempPath, buffer);

    // Call Python service
    const result = await uploadPdfToPython(tempPath, namespace);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function uploadPdfToPython(pdfPath: string, namespace: string) {
  return new Promise((resolve, reject) => {
    const pythonScript = `
import sys
sys.path.insert(0, './rag_model')
from rag_model.services.document_service import DocumentService

doc_service = DocumentService()
result = doc_service.upload_pdf('${pdfPath}', '${namespace}')
print(result)
`;

    const python = spawn('python3', ['-c', pythonScript]);
    let output = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(output));
      } else {
        reject(new Error('Upload failed'));
      }
    });
  });
}
```

### Example 2: Query API Route

Create `app/api/rag-query/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { question, namespace } = await request.json();

    if (!question || !namespace) {
      return NextResponse.json(
        { error: 'Missing question or namespace' },
        { status: 400 }
      );
    }

    // Call Python RAG service
    const pythonScript = `
import sys
import json
sys.path.insert(0, './rag_model')
from rag_model.services.chat_service import ChatService

chat_service = ChatService()
result = chat_service.answer_question(
    question='${question.replace(/'/g, "\\'")}',
    namespace='${namespace}'
)
print(json.dumps(result))
`;

    const { stdout } = await execAsync(
      `python3 -c "${pythonScript.replace(/"/g, '\\"')}"`,
      {
        env: {
          ...process.env,
          GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
        }
      }
    );

    const result = JSON.parse(stdout);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Example 3: Direct Python Integration (Recommended)

For better performance, use a Python child process or FastAPI bridge:

**Option A: Child Process (Simple)**

```typescript
// lib/rag-client.ts
import { spawn } from 'child_process';

export async function queryRAG(question: string, namespace: string) {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [
      '-c',
      `
import sys
import json
sys.path.insert(0, './rag_model')
from rag_model.services.chat_service import ChatService

chat_service = ChatService()
result = chat_service.answer_question(
    question=sys.argv[1],
    namespace=sys.argv[2]
)
print(json.dumps(result))
      `,
      question,
      namespace
    ]);

    let output = '';
    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(output));
      } else {
        reject(new Error('Query failed'));
      }
    });
  });
}
```

**Option B: FastAPI Bridge (Production)**

Create `rag_model/api.py`:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

from services.chat_service import ChatService
from services.document_service import DocumentService

app = FastAPI()

chat_service = ChatService()
doc_service = DocumentService()


class QueryRequest(BaseModel):
    question: str
    namespace: str
    top_k: Optional[int] = None


class UploadRequest(BaseModel):
    pdf_path: str
    namespace: str
    create_new: bool = False


@app.post("/query")
async def query(request: QueryRequest):
    try:
        result = chat_service.answer_question(
            question=request.question,
            namespace=request.namespace,
            top_k=request.top_k
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload")
async def upload(request: UploadRequest):
    try:
        result = doc_service.upload_pdf(
            pdf_path=request.pdf_path,
            namespace=request.namespace,
            create_new=request.create_new
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/namespaces")
async def list_namespaces():
    try:
        namespaces = doc_service.list_namespaces()
        return {"namespaces": namespaces}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

Run FastAPI:

```bash
cd rag_model
uvicorn api:app --reload --port 8000
```

Then in Next.js:

```typescript
// lib/rag-client.ts
export async function queryRAG(question: string, namespace: string) {
  const response = await fetch('http://localhost:8000/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, namespace })
  });
  return response.json();
}
```

---

## 📚 Usage Examples

### Python Direct Usage

```python
from rag_model import ChatService, DocumentService

# Upload a PDF
doc_service = DocumentService()
result = doc_service.upload_pdf(
    pdf_path="./data/document.pdf",
    namespace="my_knowledge_base"
)
print(f"Uploaded {result['chunks_created']} chunks")

# Query the system
chat_service = ChatService()
result = chat_service.answer_question(
    question="What is the main topic?",
    namespace="my_knowledge_base"
)
print(result['answer'])
print(result['sources'])
```

### Streaming Responses

```python
from rag_model.services.chat_service import ChatService

chat_service = ChatService()

for chunk in chat_service.stream_answer(
    question="Explain the key concepts",
    namespace="my_knowledge_base"
):
    if chunk['type'] == 'content':
        print(chunk['content'], end='', flush=True)
    elif chunk['type'] == 'sources':
        print("\n\nSources:", chunk['sources'])
```

---

## 🔐 Security Notes

1. **Never expose the Python process directly** - Always wrap with API routes
2. **Validate all inputs** - Use the built-in validators
3. **Sanitize file uploads** - Check file types and sizes
4. **Use environment variables** - Never hardcode API keys
5. **Namespace isolation** - Consider user-specific namespaces for multi-tenant apps

---

## 🧪 Testing

```bash
# Test PDF upload
python -c "
from rag_model import DocumentService
ds = DocumentService()
print(ds.list_namespaces())
"

# Test query
python -c "
from rag_model import ChatService
cs = ChatService()
result = cs.answer_question('test', 'your_namespace')
print(result)
"
```

---

## 📊 Performance Tips

1. **Chunk Size**: Adjust `CHUNK_SIZE` in config for your documents
   - Larger (1500+): Better for technical docs
   - Smaller (500-800): Better for Q&A style content

2. **Top-K**: More chunks = better context but slower
   - Start with 3-5 chunks
   - Increase if answers lack detail

3. **Embedding Caching**: Consider caching embeddings for repeated queries

4. **Connection Pooling**: Reuse Milvus connections in production

---

## 🐛 Troubleshooting

### "GOOGLE_API_KEY not set"
```bash
export GOOGLE_API_KEY="your-key-here"
```

### "Cannot connect to Milvus"
```bash
# Check if Milvus is running
docker ps | grep milvus

# Restart Milvus
docker restart milvus-standalone
```

### "Collection not found"
Make sure you've uploaded PDFs to that namespace first:
```bash
python upload_pdf.py
```

---

## 🚢 Production Deployment

### Using Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  milvus:
    image: milvusdb/milvus:latest
    ports:
      - "19530:19530"
      - "9091:9091"
    volumes:
      - milvus_data:/var/lib/milvus

  rag_api:
    build: ./rag_model
    ports:
      - "8000:8000"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - MILVUS_HOST=milvus
    depends_on:
      - milvus

volumes:
  milvus_data:
```

---

## 📄 License

MIT

---

## 🤝 Contributing

Feel free to extend and customize for your needs!

