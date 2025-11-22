# 📁 Vercel Root Directory Configuration

## ✅ Correct Root Directory for Backend

**Root Directory: `.` (project root)**

### Why?

Your project structure requires the root directory to be `.` because:

```
EVANIOLTD/                    ← Root Directory = "."
├── api/
│   └── index.js              ← Vercel looks for this at root/api/
├── server/
│   ├── server.js
│   ├── routes/
│   └── ...
├── vercel.json                ← Must be at root
└── package.json
```

### Vercel Configuration

When deploying to Vercel, set:

| Setting | Value | Why |
|---------|-------|-----|
| **Root Directory** | `.` | Vercel needs `api/` folder at root |
| **Framework Preset** | `Other` or blank | Not a standard framework |
| **Build Command** | (empty) | No build needed for serverless |
| **Output Directory** | (empty) | Not serving static files |
| **Install Command** | `cd server && npm install` | Install server dependencies |

### What Vercel Does

1. **Detects `api/` folder** at root → Creates serverless functions
2. **Reads `vercel.json`** at root → Configures routing
3. **Runs `api/index.js`** → Your serverless function entry point
4. **Imports from `server/`** → Your Express app code

### ❌ Common Mistakes

- ❌ Setting Root Directory to `server/` 
  - Vercel won't find `api/index.js`
  - `vercel.json` won't be detected
  
- ❌ Setting Root Directory to `api/`
  - Can't access `server/` directory
  - Missing project structure

- ✅ **Correct: Root Directory = `.`**
  - Everything works as expected

## 🚀 Quick Setup

### In Vercel Dashboard:

1. Go to **Project Settings** → **General**
2. Find **Root Directory**
3. Set to: **`.`** (or leave blank/default)
4. Save

### In Vercel CLI:

```bash
vercel
# When asked "Directory?": 
# Answer: ./
```

## 📋 Verification

After deployment, check:

1. ✅ Functions appear in Vercel Dashboard → Functions tab
2. ✅ `/api/health` endpoint works
3. ✅ No "Module not found" errors in logs
4. ✅ MongoDB connection works

---

**Remember**: Root Directory = `.` (project root) ✅

