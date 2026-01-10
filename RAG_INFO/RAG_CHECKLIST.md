# ✅ RAG System - Getting Started Checklist

Follow this checklist to get your RAG system up and running!

---

## 📋 Setup Checklist

### ⚙️ Prerequisites
- [ ] Python 3.10+ installed (`python --version`)
- [ ] Docker installed (`docker --version`)
- [ ] Node.js 18+ installed (for Next.js) (`node --version`)
- [ ] Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

---

## 🚀 Step 1: Install Python Dependencies

```bash
cd rag_model
pip install -r requirements.txt
```

**Verify installation:**
```bash
python -c "import langchain; import pymilvus; print('✓ Dependencies installed')"
```

- [ ] Dependencies installed successfully

---

## 🐳 Step 2: Start Milvus Vector Database

**Option A: Docker (Recommended)**
```bash
docker run -d \
  --name milvus-standalone \
  -p 19530:19530 \
  -p 9091:9091 \
  milvusdb/milvus:latest
```

**Option B: Docker Compose**
```bash
wget https://github.com/milvus-io/milvus/releases/download/v2.3.4/milvus-standalone-docker-compose.yml -O docker-compose.yml
docker-compose up -d
```

**Verify Milvus is running:**
```bash
docker ps | grep milvus
```

- [ ] Milvus is running on port 19530

---

## 🔑 Step 3: Set Environment Variables

**Option A: Export directly**
```bash
export GOOGLE_API_KEY="your-gemini-api-key-here"
```

**Option B: Create .env file**
```bash
cp rag_model/.env.example rag_model/.env
# Edit rag_model/.env and add your API key
```

**Verify:**
```bash
python -c "import os; print('✓ API key set' if os.getenv('GOOGLE_API_KEY') else '✗ API key missing')"
```

- [ ] Google API key configured

---

## 📄 Step 4: Upload Your First PDF

```bash
python rag_model/upload_pdf.py
```

**What to do:**
1. Choose option `[0]` to create new namespace
2. Enter namespace name (e.g., `test_docs`)
3. Enter path to a PDF file
4. Confirm upload

**Expected output:**
```
✅ Upload Successful!
  Chunks created: 42
```

- [ ] Successfully uploaded at least one PDF
- [ ] Namespace created: `________________`

---

## 💬 Step 5: Test Query System

```bash
python rag_model/query.py
```

**What to do:**
1. Select your namespace
2. Ask a question related to your PDF
3. Review answer and sources

**Expected output:**
```
📚 Sources:
  [1] your-file.pdf (score: 0.234)

🤖 Answer:
[Your answer with citations]
```

- [ ] Successfully queried the system
- [ ] Answer includes source citations

---

## 🧪 Step 6: Test Python Integration

```bash
# List namespaces
python rag_model/nextjs_integration.py list

# Query
python rag_model/nextjs_integration.py query your_namespace "test question"
```

- [ ] Integration script works

---

## 🌐 Step 7: Add Next.js API Routes (Optional)

### Create Query API Route

**File:** `app/api/rag/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { question, namespace } = await request.json();

    const script = `
import sys
sys.path.insert(0, './rag_model')
from nextjs_integration import handle_rag_query
import json

result = handle_rag_query('${question.replace(/'/g, "\\'")}', '${namespace}')
print(json.dumps(result))
    `;

    const { stdout } = await execAsync(`python3 -c "${script}"`, {
      env: { ...process.env, GOOGLE_API_KEY: process.env.GOOGLE_API_KEY }
    });

    return NextResponse.json(JSON.parse(stdout));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Test API Route

```bash
# Start Next.js dev server
npm run dev

# In another terminal, test the API
curl -X POST http://localhost:3000/api/rag \
  -H "Content-Type: application/json" \
  -d '{"question":"test","namespace":"your_namespace"}'
```

- [ ] API route created
- [ ] API route tested successfully

---

## 📚 Step 8: Read Documentation

- [ ] Read `rag_model/README.md` for detailed docs
- [ ] Read `RAG_INTEGRATION.md` for integration guide
- [ ] Read `RAG_ARCHITECTURE.md` for architecture overview

---

## 🎯 Next Steps Checklist

### Basic Usage ✓
- [x] Setup complete
- [x] PDF uploaded
- [x] Query tested

### Integration
- [ ] Create Next.js query API route
- [ ] Create Next.js upload API route
- [ ] Create Next.js namespaces API route
- [ ] Build chat UI component
- [ ] Test end-to-end flow

### Advanced Features
- [ ] Add user authentication
- [ ] Implement namespace-per-user
- [ ] Add streaming responses
- [ ] Set up FastAPI bridge
- [ ] Add rate limiting
- [ ] Implement caching

### Production
- [ ] Set up Docker Compose
- [ ] Configure production Milvus
- [ ] Add monitoring/logging
- [ ] Set up CI/CD
- [ ] Deploy to cloud

---

## 🐛 Troubleshooting

### Issue: "GOOGLE_API_KEY not set"
**Solution:**
```bash
export GOOGLE_API_KEY="your-key-here"
# Or add to .env file
```

### Issue: "Cannot connect to Milvus"
**Solution:**
```bash
# Check if Milvus is running
docker ps | grep milvus

# Restart Milvus
docker restart milvus-standalone

# Check logs
docker logs milvus-standalone
```

### Issue: "Collection not found"
**Solution:**
Upload PDFs first:
```bash
python rag_model/upload_pdf.py
```

### Issue: "ModuleNotFoundError: No module named 'rag_model'"
**Solution:**
Make sure you're running from the correct directory:
```bash
# Run from project root
python rag_model/upload_pdf.py

# Or add parent to path
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

### Issue: "PDF processing failed"
**Solution:**
- Check PDF is not corrupted
- Check PDF is not password-protected
- Try a different PDF
- Check file permissions

---

## 📊 Verification Commands

```bash
# Check Python version
python --version  # Should be 3.10+

# Check Docker
docker --version

# Check Milvus
docker ps | grep milvus

# Check API key
echo $GOOGLE_API_KEY

# Test Python imports
python -c "from rag_model import ChatService, DocumentService; print('✓ All good')"

# List namespaces
python -c "from rag_model import DocumentService; print(DocumentService().list_namespaces())"
```

---

## 📖 Quick Reference

### Upload PDF
```bash
python rag_model/upload_pdf.py
```

### Query System
```bash
python rag_model/query.py
```

### List Namespaces (Python)
```bash
python -c "from rag_model import DocumentService; print(DocumentService().list_namespaces())"
```

### Test Query (Python)
```bash
python -c "
from rag_model import ChatService
cs = ChatService()
result = cs.answer_question('test', 'your_namespace')
print(result)
"
```

---

## ✅ Final Checklist

- [ ] All dependencies installed
- [ ] Milvus running
- [ ] API key configured
- [ ] At least one PDF uploaded
- [ ] Query system tested
- [ ] Documentation reviewed
- [ ] Ready to integrate with Next.js!

---

## 🎉 You're Ready!

If all items are checked, your RAG system is ready to use!

**Next:** Start building your chat UI in Next.js and connect it to the RAG system via API routes.

For detailed integration examples, see:
- `rag_model/README.md` - Complete documentation
- `RAG_INTEGRATION.md` - Next.js integration guide
- `RAG_ARCHITECTURE.md` - System architecture

---

**Need help?** Check the troubleshooting section or review the documentation files.

Happy building! 🚀

