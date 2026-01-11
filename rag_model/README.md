# RAG Model - Moorcheh + Google Gemini

A modular, production-ready RAG (Retrieval-Augmented Generation) system using **Moorcheh's hosted vector database** and **Google Gemini** (or other AI models). Designed for easy integration with **Next.js API routes**.

## 🎯 What's Moorcheh?

**Moorcheh** is a hosted RAG service that handles:

- ✅ PDF processing and chunking
- ✅ Automatic embedding generation
- ✅ Vector storage and similarity search
- ✅ Multi-model AI support (Gemini, Claude, etc.)
- ✅ Context retrieval with relevance scoring

**You don't need to run Milvus or any vector database locally** - Moorcheh handles everything via API!

---

## 📁 Project Structure

```
rag_model/
├── __init__.py              # Package exports
├── config.py                # Centralized configuration
├── requirements.txt         # Python dependencies
│
├── upload_pdf.py           # 🛠️ Main CLI: Upload PDFs (TEXT or VECTOR)
├── chat_test.py            # 🛠️ Main CLI: Interactive chat test
│
├── core/                    # Core abstractions
│   ├── __init__.py
│   └── moorcheh_client.py  # Moorcheh API client
│
├── services/                # Business logic services
│   ├── __init__.py
│   ├── document_service.py # PDF upload to Moorcheh
│   └── chat_service.py     # RAG queries
│
├── utils/                   # Utilities
│   ├── __init__.py
│   ├── pdf_utils.py        # PDF validation
│   └── validators.py       # Input validation
│
├── scripts/                 # Utility scripts
│   ├── __init__.py
│   ├── create_and_upload.py    # Create TEXT namespace & upload
│   ├── direct_upload.py        # Direct upload (no prompts)
│   ├── direct_query.py         # Direct query (no prompts)
│   ├── query.py                # Interactive query interface
│   └── nextjs_integration.py   # Next.js helper functions
│
└── README.md               # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd rag_model
pip install -r requirements.txt
```

**No Docker needed!** Moorcheh is a hosted service.

### 2. Get Your Moorcheh API Key

1. Visit [Moorcheh Console](https://console.moorcheh.ai/api-keys)
2. Copy your API key

### 3. Set Environment Variables

**Create `rag_model/.env` file:**

```bash
# Required
MOORCHEH_API_KEY=your-moorcheh-api-key-here

# Optional: Configure model and settings
AI_MODEL=gemini-1.5-flash
TEMPERATURE=0.0
TOP_K=15
THRESHOLD=0.01
KIOSK_MODE=true

# For VECTOR namespaces (optional - only if using vector namespace)
GOOGLE_API_KEY=your-google-api-key-here
```

**Option 2: Export environment variable**

```bash
# Linux/Mac
export MOORCHEH_API_KEY="your-moorcheh-api-key"

# Windows CMD
set MOORCHEH_API_KEY=your-moorcheh-api-key

# Windows PowerShell
$env:MOORCHEH_API_KEY="your-moorcheh-api-key"
```

### 4. Upload PDFs

```bash
# Interactive mode (recommended)
python upload_pdf.py

# Command-line mode (TEXT namespace - recommended)
python upload_pdf.py "path/to/file.pdf" "MyNamespace" --type text

# Command-line mode (VECTOR namespace - requires GOOGLE_API_KEY)
python upload_pdf.py "path/to/file.pdf" "MyNamespace" --type vector
```

The script will:

- List all available namespaces from Moorcheh
- Let you choose between TEXT or VECTOR namespace type
- Let you create a new namespace or select existing
- Upload and process your PDF automatically

### 5. Test the System

```bash
# Interactive chat test
python chat_test.py

# Direct query (non-interactive)
python scripts/direct_query.py MyNamespace "What is this document about?"
```

---

## 🔧 Configuration

Edit `config.py` or use environment variables:

| Variable                       | Default                                 | Description                                 |
| ------------------------------ | --------------------------------------- | ------------------------------------------- |
| `MOORCHEH_API_KEY`             | _(required)_                            | Your Moorcheh API key                       |
| `MOORCHEH_API_ENDPOINT`        | `https://api.moorcheh.ai/v1/answer`     | Query endpoint                              |
| `MOORCHEH_UPLOAD_ENDPOINT`     | `https://api.moorcheh.ai/v1/upload`     | Upload endpoint                             |
| `MOORCHEH_NAMESPACES_ENDPOINT` | `https://api.moorcheh.ai/v1/namespaces` | Namespaces endpoint                         |
| `AI_MODEL`                     | `gemini-1.5-flash`                      | AI model (Claude, Gemini, etc.)             |
| `TEMPERATURE`                  | `0.0`                                   | LLM temperature (0=deterministic)           |
| `TOP_K`                        | `15`                                    | Number of context chunks                    |
| `THRESHOLD`                    | `0.01`                                  | Minimum relevance threshold                 |
| `KIOSK_MODE`                   | `true`                                  | Filter irrelevant results                   |
| `GOOGLE_API_KEY`               | _(optional)_                            | Google API key (only for VECTOR namespaces) |

---

## 📚 TEXT vs VECTOR Namespaces

Moorcheh supports two types of namespaces: **TEXT** and **VECTOR**. Understanding the difference is crucial for choosing the right approach.

### Text Namespaces (Recommended for Most Use Cases)

**What They Are:**

- Text namespaces store documents as text
- Moorcheh automatically handles chunking, embedding, and indexing
- You simply upload text/PDFs and Moorcheh does the rest

**Advantages:**

- ✅ **Simplest to use** - Just upload text or PDFs
- ✅ **Automatic processing** - Moorcheh handles chunking and embeddings
- ✅ **RAG with LLM** - Can use `answer.generate()` for full RAG with AI responses
- ✅ **No external dependencies** - No need for embedding models
- ✅ **Cost effective** - Moorcheh manages embeddings efficiently

**Querying Text Namespaces:**

1. **`answer.generate()`** - Full RAG with LLM-generated answers
2. **`search()`** - Similarity search returning relevant chunks

### Vector Namespaces (Advanced Use Cases)

**What They Are:**

- Vector namespaces store pre-computed vector embeddings
- You provide the vectors directly (not text)
- More control but more complexity

**Advantages:**

- ✅ **Custom embeddings** - Use your own embedding model
- ✅ **Fine-grained control** - Manage embedding dimensions
- ✅ **Specialized use cases** - When you need specific embedding strategies

**Disadvantages:**

- ❌ **Complex setup** - Must generate embeddings yourself
- ❌ **External dependencies** - Need Google Gemini or other embedding API
- ❌ **No automatic RAG** - Only returns similarity search results, not LLM answers
- ❌ **More expensive** - Pay for embedding API calls separately

**Querying Vector Namespaces:**

- Only **`search()`** with vector queries - Returns similar chunks based on vector similarity
- ⚠️ **Note**: `answer.generate()` does NOT work with vector namespaces. You only get raw search results, not LLM-generated answers.

### Comparison Table

| Feature                   | Text Namespace               | Vector Namespace                    |
| ------------------------- | ---------------------------- | ----------------------------------- |
| **Setup Complexity**      | Simple                       | Complex                             |
| **Upload Format**         | Text/PDFs                    | Pre-computed vectors                |
| **Embedding**             | Automatic                    | Manual (your responsibility)        |
| **RAG with LLM**          | ✅ Yes (`answer.generate()`) | ❌ No (only similarity search)      |
| **External Dependencies** | None                         | Embedding API (e.g., Google Gemini) |
| **Cost**                  | Lower (bundled)              | Higher (separate embedding costs)   |
| **Full Text Storage**     | ✅ Yes                       | ❌ No (metadata preview only)       |
| **AI Answers**            | ✅ Yes                       | ❌ No                               |
| **Use Case**              | Most applications            | Specialized/custom embeddings       |

### Recommendation

**Use TEXT namespaces** unless you have a specific reason to use vectors:

- Simpler setup
- Automatic processing
- Full RAG with LLM answers
- Lower cost
- Easier maintenance

**Use VECTOR namespaces** only if:

- You need a specific embedding model not supported by Moorcheh
- You have existing vector data
- You require custom embedding strategies
- You're doing advanced similarity search

---

## 🌐 Next.js Integration

See `scripts/nextjs_integration.py` for helper functions and examples.

### Example API Route

Create `app/api/rag/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { question, namespace } = await request.json();

    const script = `
import sys
import json
sys.path.insert(0, './rag_model')
from scripts.nextjs_integration import handle_rag_query

result = handle_rag_query('${question.replace(/'/g, "\\'")}', '${namespace}')
print(json.dumps(result))
    `;

    const { stdout } = await execAsync(`python3 -c "${script}"`, {
      env: { ...process.env, MOORCHEH_API_KEY: process.env.MOORCHEH_API_KEY },
    });

    return NextResponse.json(JSON.parse(stdout));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

See `scripts/nextjs_integration.py` for more examples.

---

## 📚 Python Direct Usage

```python
from rag_model import ChatService, DocumentService

# Upload a PDF
doc_service = DocumentService()
result = doc_service.upload_pdf(
    pdf_path="./data/document.pdf",
    namespace="my_knowledge_base"
)
print(f"Uploaded: {result['filename']}")

# Query the system
chat_service = ChatService()
result = chat_service.answer_question(
    question="What is the main topic?",
    namespace="my_knowledge_base"
)
print(result['answer'])
print(result['sources'])
```

---

## 🎨 Supported AI Models

Moorcheh supports multiple AI models. Configure via `AI_MODEL` env var:

- `gemini-1.5-flash` (default - fast Google Gemini)
- `gemini-1.5-pro` (more capable Gemini)
- `anthropic.claude-sonnet-4-20250514-v1:0` (AWS Bedrock Claude)
- `claude-sonnet-4` (Anthropic Claude direct)
- And more!

Check [Moorcheh Console](https://console.moorcheh.ai/playground) for available models.

---

## 🆚 vs. Local Vector DB

### Moorcheh Advantages

✅ **No infrastructure** - No Docker, no Milvus setup  
✅ **Automatic scaling** - Handles any document volume  
✅ **Multi-model** - Switch between Gemini, Claude, etc.  
✅ **Managed service** - Updates, security handled for you  
✅ **Built-in chunking** - Optimal document processing  
✅ **Relevance scoring** - Advanced ranking algorithms

### When to Use Local DB

- Privacy requirements (data must stay on-premise)
- No internet access
- Custom embedding models
- Very high query volume (cost optimization)

---

## 📊 How Moorcheh RAG Works

```
┌─────────────┐
│   PDF File  │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│  Upload to Moorcheh  │ (via API)
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────┐
│  Moorcheh Processing:    │
│  - Extract text          │
│  - Chunk intelligently   │
│  - Generate embeddings   │
│  - Store in vector DB    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────┐
│  User Question       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────┐
│  Moorcheh RAG:           │
│  - Semantic search       │
│  - Retrieve top-k chunks │
│  - Rank by relevance     │
│  - Generate answer (LLM) │
│  - Include sources       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────┐
│  Answer + Sources    │
└──────────────────────┘
```

---

## 🐛 Troubleshooting

### "MOORCHEH_API_KEY not set"

Create `rag_model/.env` file with your API key:

```bash
MOORCHEH_API_KEY=your-key-here
```

### "No namespaces found"

- Check your Moorcheh Console: https://console.moorcheh.ai/namespaces
- Create a namespace in the console
- Or use `upload_pdf.py` to create one

### "Upload failed"

- Check PDF is not corrupted or password-protected
- Verify file size is within Moorcheh limits
- Check API key has upload permissions

### "No relevant context found"

- Upload relevant documents first
- Try adjusting `TOP_K` and `THRESHOLD` settings
- Check namespace has documents

### Vector Namespace Issues

**"GOOGLE_API_KEY not set" (for vector namespaces)**

- Vector namespaces require Google API key for embeddings
- Get one from: https://makersuite.google.com/app/apikey
- Add to `.env`: `GOOGLE_API_KEY=your-google-api-key`
- **Or use TEXT namespaces instead** (recommended - no Google API key needed)

**"Quota limit exceeded" (for vector namespaces)**

- Google Gemini embedding API has rate limits
- Wait for quota to reset (check Google Cloud Console)
- Consider using TEXT namespaces instead (no quota limits)

**"Dimension mismatch" (for vector namespaces)**

- Vector namespaces must match embedding dimension (768 for Gemini embedding-001)
- When creating vector namespace, ensure `vector_dimension=768`
- Or use TEXT namespaces (no dimension concerns)

---

## 🔐 Security Notes

1. **API Keys** - Never commit API keys to git
2. **Environment Variables** - Use `.env` files (gitignored)
3. **Input Validation** - All inputs are validated
4. **Namespace Isolation** - Users can only access their namespaces
5. **HTTPS** - All API calls use encrypted connections

---

## 🚢 Production Deployment

### Environment Variables (Production)

```bash
# Required
MOORCHEH_API_KEY=prod-api-key-here

# Optional tuning
AI_MODEL=gemini-1.5-pro  # More capable model
TOP_K=20  # More context
TEMPERATURE=0.1  # Slightly more creative
KIOSK_MODE=true  # Filter irrelevant results

# Only if using VECTOR namespaces
GOOGLE_API_KEY=prod-google-api-key-here
```

### Next.js Deployment

Your Next.js app needs:

1. Python 3.10+ installed
2. `MOORCHEH_API_KEY` in environment variables
3. API routes from examples above

**Vercel/Netlify**: Python is supported! Just add `runtime.txt`:

```
python-3.10
```

---

## 📄 License

MIT

---

## 🤝 Resources

- [Moorcheh Console](https://console.moorcheh.ai) - Manage namespaces and API keys
- [Moorcheh Docs](https://docs.moorcheh.ai) - Full API documentation
- [Playground](https://console.moorcheh.ai/playground) - Test your RAG system

---

## 💡 Next Steps

1. ✅ Setup complete - Test CLI tools
2. 🌐 Integrate with Next.js - Add API routes
3. 🎨 Build UI - Create chat interface
4. 🚀 Deploy - Push to production

---

**Built for Delta Hacks 12** 🚀
