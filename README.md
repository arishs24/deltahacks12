# Moorcheh Chat Boilerplate

A Next.js boilerplate for building AI-powered chat applications with customizable themes, fonts, and branding.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Get your API key:**
   - Visit [Moorcheh Console API Keys](https://console.moorcheh.ai/api-keys)
   - Copy your API key

3. **Create text namespace and upload documents:**
   - Visit [Moorcheh Console Namespaces](https://console.moorcheh.ai/namespaces)
   - Create a new text namespace
   - Upload your documents to the namespace

4. **Set up environment variable:**
   - Create `.env.local` in your project root (or use your existing env setup)
   - Add your API key:
```bash
NEXT_PUBLIC_MOORCHEH_API_KEY=your_api_key_here
```

5. **Configure API request body:**
   - Visit [Moorcheh Console Playground](https://console.moorcheh.ai/playground)
   - Configure your namespace, model, and settings
   - Export the complete JSON configuration
   - Create `config/api-config.json` and paste the configuration
   - See `config/README.md` for detailed instructions

6. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your chat application.

**Complete setup:** Visit [http://localhost:3000/landing](http://localhost:3000/landing) to configure your chat application through our 4-step interactive setup:
1. **API Key Setup** - Connect to Moorcheh AI services
2. **Branding** - Configure app name, company, and contact info
3. **Theme Selection** - Choose from 10+ beautiful themes
4. **Typography & Complete** - Configure fonts and finish setup

**Test your customizations:** Visit [http://localhost:3000/demo](http://localhost:3000/demo) to test themes and fonts.

**Build your app:** Use `components/ui` for additional UI components throughout your application.

## Features

- **Next.js 15** with React 19 and TypeScript
- **Pre-built chat components** ready to use
- **Moorcheh AI integration** with easy configuration
- **10+ Customizable themes** with Tailwind CSS
- **30+ fonts** with Next.js optimization
- **Tailwind CSS** and Radix UI components
- **Complete branding system** via appearance.json configuration
- **Interactive setup flow** with live preview and automatic configuration saving
- **🆕 RAG System** - Moorcheh-powered knowledge base with Gemini (see `rag_model/`)

## Configuration Guides

- **API Setup**: `config/README.md` - Configure your AI API
- **Branding**: `BRANDING_GUIDE.md` - Customize app name, logo, colors
- **Themes & Fonts**: `customize/README.md` - Change appearance
- **🆕 RAG System**: `rag_model/README.md` - Moorcheh-powered knowledge base

## Project Structure

```
your-project/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── chat/              # Chat components
│   └── ui/                # UI components
├── config/                 # API configuration
├── customize/              # Themes and fonts
├── hooks/                  # React hooks
├── lib/                    # Utilities
├── public/                 # Static files
└── rag_model/             # 🆕 RAG system (Milvus + Gemini)
    ├── core/              # Core abstractions
    ├── services/          # Business logic
    ├── utils/             # Utilities
    ├── upload_pdf.py      # CLI: Upload PDFs
    ├── query.py           # CLI: Query system
    └── README.md          # Full RAG documentation
```

## Customization

### Change Theme
```typescript
// customize/themes/theme-config.ts
export const themeConfig = {
  defaultTheme: 'dark', // 'light', 'dark', 'blue', 'green'
};
```

### Change Fonts  
```typescript
// customize/fonts/font-config.ts
export const fontConfig = {
  primaryFont: 'Inter',
  monoFont: 'Fira Code',
};
```

### Change Chat Mode
```typescript
// lib/chat-config.ts
export const chatConfig = {
  type: 'interface', // 'interface' or 'widget'
};
```

### Change Branding
```json
// config/appearance.json
{
  "branding": {
    "appName": "My Chat App",
    "appTitle": "My Chat",
    "appSubtitle": "Your AI assistant",
    "companyName": "My Company",
    "contactEmail": "support@mycompany.com"
  }
}
```

## 🤖 RAG System (Moorcheh + Gemini)

This project includes a complete RAG (Retrieval-Augmented Generation) system using **Moorcheh's hosted vector database**:

### Quick RAG Setup
```bash
# 1. Install Python dependencies
cd rag_model && pip install -r requirements.txt

# 2. Set Moorcheh API key (get from https://console.moorcheh.ai/api-keys)
# Option A: Use .env file (recommended)
cp rag_model/.env.example rag_model/.env
# Edit rag_model/.env and add your key

# Option B: Export variable
export MOORCHEH_API_KEY="your-moorcheh-api-key"

# 3. Upload PDFs to namespaces
python upload_pdf.py

# 4. Query via CLI
python query.py
```

### Features
- 📄 **PDF Upload** - Automatic chunking and embedding via Moorcheh
- 🗂️ **Namespace Management** - Multiple document collections
- 🎯 **Strict RAG** - Model cites sources, admits when it doesn't know
- 🔌 **Next.js Ready** - Easy API route integration
- 🛠️ **CLI Tools** - Interactive upload and query scripts
- ☁️ **No Infrastructure** - No Docker or vector DB setup needed!

**Moorcheh handles**: Vector storage, embeddings, similarity search, and multi-model AI (Gemini, Claude, etc.)

**Full documentation**: See [`rag_model/README.md`](./rag_model/README.md)

---

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or follow the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

## Support

- [Chat Boilerplate Documentation](https://docs.moorcheh.ai/integrations/chat-boilerplate/overview) - Complete guide and API reference
- [Moorcheh Console](https://console.moorcheh.ai) - API configuration
- [Next.js Documentation](https://nextjs.org/docs) - Framework guide