# Patelloscope

**Patient-Specific Knee Digital Twin for Rehabilitation Analysis**

Ever wondered what's really happening inside your knee when you're recovering from an injury? Patelloscope takes MRI scans and turns them into a personalized digital twin of your knee, then uses advanced biomechanical simulations to help clinicians understand exactly how different movements and exercises will affect your recovery.

Think of it as a crystal ball for knee rehabilitation—but powered by real science.

---

## What This Actually Does

Imagine you've torn your ACL. Your doctor wants to know: "Can this patient safely do squats yet? What about running? How much stress will this put on the healing tissue?"

Traditionally, that's a lot of guesswork. Patelloscope changes that by:

1. **Taking your MRI scan** and automatically identifying all the important structures (bones, cartilage, ligaments, menisci)
2. **Building a 3D model** of your specific knee anatomy
3. **Running biomechanical simulations** to see how different movements affect your knee
4. **Calculating risk scores** for various exercises and activities
5. **Providing personalized recommendations** based on your unique anatomy and injury

The result? Clinicians can make data-driven decisions about your rehabilitation, and you can see exactly what's happening in your knee through beautiful 3D visualizations.

---

## The Tech Stack (For the Curious)

This is a full-stack application that brings together some pretty cool technologies:

**Frontend:**

- **Next.js 15** with React 19 - Modern, fast web interface
- **Three.js** - Beautiful 3D visualizations of knee anatomy
- **Tailwind CSS** - Clean, professional clinical UI
- **MongoDB** - Patient data storage

**Backend:**

- **Python** - The heavy lifting happens here
- **MRI Processing** - DICOM/NIfTI file handling
- **Deep Learning** - AI-powered knee segmentation (nnU-Net/MONAI)
- **Finite Element Analysis (FEA)** - Biomechanical simulations
- **FEBio/FEniCS** - Professional FEA solvers

**AI Features:**

- **RAG System** - AI-powered chat that understands medical documentation
- **Moorcheh** - Hosted vector database for knowledge retrieval
- **Google Gemini** - Natural language understanding

---

## Getting Started

### Prerequisites

You'll need:

- **Node.js 18+** (for the frontend)
- **Python 3.7+** (for the backend processing)
- **MongoDB** (for patient data - can use MongoDB Atlas for free)

### Quick Start

1. **Clone and install:**

   ```bash
   git clone <your-repo>
   cd deltahacks12
   npm install
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_MOORCHEH_API_KEY=your_moorcheh_api_key  # Optional, for AI features
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! You should see the landing page. From there, you can:

- Add patients through the dashboard
- Upload MRI data (or use synthetic data for testing)
- Run biomechanical simulations
- View 3D models and biomechanics data
- Get AI-powered exercise recommendations

---

## Project Structure

Here's how everything is organized:

```
deltahacks12/
├── app/                    # Next.js pages (dashboard, viewer, exercises, etc.)
├── components/             # React components
│   ├── clinical/          # Clinical UI components
│   ├── viewer/            # 3D viewer and biomechanics visualization
│   ├── exercises/         # Exercise recommendation UI
│   └── chat/              # AI chat interface
├── synovia_move/          # Python backend - the real magic happens here (legacy name)
│   ├── mri_ingestion.py   # Load and preprocess MRI scans
│   ├── segmentation.py    # AI-powered knee structure identification
│   ├── surface_reconstruction.py  # Build 3D surface meshes
│   ├── volumetric_meshing.py     # Create FEA-ready volume meshes
│   ├── injury_modeling.py        # Model specific injuries (ACL tears, etc.)
│   ├── movement_scenarios.py     # Define movement patterns to simulate
│   ├── fea_solver.py             # Run biomechanical simulations
│   ├── risk_scoring.py           # Calculate exercise risk scores
│   ├── longitudinal_tracking.py  # Track recovery over time
│   └── visualization.py          # Generate 3D visualizations
├── rag_model/             # AI-powered documentation system
├── rag_api/               # API endpoints for RAG queries
├── examples/              # Example scripts to run the pipeline
└── data/                  # Patient data and MRI files
```

---

## Running the Full Pipeline

The Python backend does the heavy computational work. Here's how to run a complete analysis:

### With Synthetic Data (For Testing)

```bash
python examples/pipeline_example.py
```

This will:

- Generate synthetic MRI data
- Run through all 10 processing modules
- Create 3D visualizations
- Output risk scores and recommendations

### With Real MRI Data

1. **Place your MRI file:**

   ```
   data/patient_001/knee_mri.nii.gz
   ```

   Or a DICOM folder:

   ```
   data/patient_001/dicom/
   ```

2. **Edit the example script:**

   ```python
   # In examples/pipeline_example.py
   mri_path = "data/patient_001/knee_mri.nii.gz"
   ```

3. **Run it:**
   ```bash
   python examples/pipeline_example.py
   ```

The pipeline will process your MRI, create the digital twin, run simulations, and generate all the data that the frontend displays.

---

## Key Features

### 🏥 Patient Management

- Add and manage patient records
- Track injury details and affected structures
- Store clinical notes and observations

### 🧠 AI-Powered Segmentation

- Automatically identify knee structures from MRI scans
- Supports both DICOM and NIfTI formats
- Uses state-of-the-art deep learning models

### 🎨 3D Visualization

- Interactive 3D viewer built with Three.js
- Toggle visibility of different structures
- View stress distributions and biomechanics data
- Export STL files for 3D printing

### 📊 Biomechanics Analysis

- Real-time charts showing ligament stress, strain, and stiffness
- Compare different movement scenarios
- Understand how injuries affect joint mechanics

### 💪 Exercise Recommendations

- AI-powered exercise suggestions based on biomechanical analysis
- Safety ratings for each exercise
- Personalized recommendations based on your specific anatomy

### 🤖 AI Chat Assistant

- Ask questions about your condition
- Get explanations of medical terms
- Powered by RAG (Retrieval-Augmented Generation) for accurate, source-cited answers

---

## Configuration

### MongoDB Setup

You can use MongoDB locally or MongoDB Atlas (free tier works great):

1. **Local MongoDB:**

   ```bash
   # Install MongoDB locally, then:
   MONGODB_URI=mongodb://localhost:27017/patelloscope
   ```

2. **MongoDB Atlas (Recommended):**
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Add it to `.env.local`

### AI Features (Optional)

To enable the AI chat and RAG features:

1. **Get a Moorcheh API key:**

   - Visit [console.moorcheh.ai/api-keys](https://console.moorcheh.ai/api-keys)
   - Create an API key

2. **Set it in your environment:**

   ```bash
   NEXT_PUBLIC_MOORCHEH_API_KEY=your_key_here
   ```

3. **Upload medical documentation:**
   ```bash
   cd rag_model
   python upload_pdf.py
   ```

See [`rag_model/README.md`](./rag_model/README.md) for detailed RAG setup instructions.

### FEA Solver (Optional)

For actual finite element analysis (not required for testing):

- **FEBio** (Recommended): Download from [febio.org](https://febio.org/download/)
- **FEniCS**: Follow instructions at [fenicsproject.org](https://fenicsproject.org/download/)

The pipeline will work without these—it'll use stub results for testing.

---

## Development

### Frontend Development

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development

```bash
# Test imports
python test_imports.py

# Run pipeline
python examples/pipeline_example.py

# Run with real data
python examples/pipeline_example.py --mri-path data/patient_001/knee_mri.nii.gz
```

### Code Structure

- **TypeScript** for type safety in the frontend
- **Python type hints** for backend code
- **Modular design** - each module is independent and well-documented
- **Error handling** throughout
- **Comprehensive logging** for debugging

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy the frontend:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

**Note:** The Python backend needs to run separately (on a server, Railway, Render, etc.) or you can use Vercel's serverless functions for lighter processing.

### Railway / Render

For full-stack deployment including the Python backend:

1. **Railway:** Connect your GitHub repo and Railway will auto-detect the setup
2. **Render:** Create a new Web Service and point it to your repo

See [`RAILWAY_DEPLOYMENT.md`](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

### GitHub Pages (Static Only)

For static frontend only (no API routes):

```bash
npm run build:static
```

See [`GITHUB_PAGES_DEPLOYMENT.md`](./GITHUB_PAGES_DEPLOYMENT.md) for details.

---

## What's Real vs. What's a Placeholder

We want to be transparent about what's fully implemented:

### ✅ Fully Working

- **MRI ingestion** - Actually loads DICOM and NIfTI files
- **Surface reconstruction** - Real marching cubes, generates actual 3D meshes
- **Volumetric meshing** - Creates real tetrahedral meshes
- **Injury modeling** - Real constraint modification logic
- **Movement scenarios** - Real parameterization and boundary conditions
- **Risk scoring** - Real calculations and recommendations
- **Frontend UI** - Complete, working interface
- **Patient management** - Full CRUD with MongoDB
- **3D visualization** - Interactive Three.js viewer

### ⚠️ Requires Additional Setup

- **Segmentation model** - Code is ready, but you need a trained nnU-Net or MONAI model
- **FEA solver** - Code is ready, but requires FEBio or FEniCS installation
- **Real MRI data** - Works with synthetic data out of the box, real data needs to be provided

The good news? Everything is structured so you can plug in your own models and data when ready. The architecture is solid.

---

## Contributing

We'd love your help! Here are some areas where contributions would be especially valuable:

- **Segmentation models** - Training or integrating better knee segmentation models
- **FEA optimization** - Making simulations faster and more accurate
- **UI improvements** - Making the interface even more intuitive
- **Documentation** - Helping others understand how to use this
- **Testing** - Adding tests to make the codebase more robust

Feel free to open issues or pull requests!

---

## Documentation

We've got detailed docs for different aspects:

- [`HOW_TO_RUN.md`](./HOW_TO_RUN.md) - Detailed setup and running instructions
- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) - Deep dive into the codebase
- [`rag_model/README.md`](./rag_model/README.md) - RAG system documentation
- [`MONGODB_INTEGRATION.md`](./MONGODB_INTEGRATION.md) - Database setup guide
- [`RAILWAY_DEPLOYMENT.md`](./RAILWAY_DEPLOYMENT.md) - Deployment instructions

---

## License

This project is part of DeltaHacks 12. Check the license file for details.

---

## Support

Having trouble? Here are some resources:

- **Issues:** Open an issue on GitHub
- **Documentation:** Check the docs in the `docs/` folder
- **Moorcheh:** [docs.moorcheh.ai](https://docs.moorcheh.ai) for AI features
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs) for framework questions

---

## Acknowledgments

Built with:

- [Next.js](https://nextjs.org/) - The React framework
- [Three.js](https://threejs.org/) - 3D graphics
- [Moorcheh](https://moorcheh.ai/) - AI infrastructure
- [MongoDB](https://www.mongodb.com/) - Database
- [FEBio](https://febio.org/) - FEA solver
- And many other amazing open-source projects

---

**Remember:** This is a research/educational tool. Always consult with qualified medical professionals for actual clinical decisions. This software is not a substitute for professional medical advice, diagnosis, or treatment.

---

_Built with ❤️ for better knee rehabilitation outcomes_
