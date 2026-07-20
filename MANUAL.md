# Mandap Events - Workflow & Branching Manual

This documentation explains how the repository is structured, how the branches work, and how to update either the traditional version of the site or the dynamic, configuration-driven version.

---

## 1. Repository Architecture & Branches

The repository has three key branches:

### A. The Live Website Pipeline
*   **`main`**: This is the production branch. The code here is what is served live at `mandap.com.np` (via GitHub Pages). You should never edit code directly on this branch.
*   **`dev`**: This is the working branch for the traditional website. All layout updates, text refinements, styles, and asset adjustments are made here, tested locally, and then merged into `main` for deployment.

### B. The Modular Refactor Pipeline
*   **`modular-config`**: This is a standalone branch containing the modern config-driven refactor of the website. Instead of editing raw HTML to change photos or text, you simply modify the centralized `config.js` file.

---

## 2. Working on the Live Website (`dev` & `main` branches)

If you need to make changes to the live site as it is currently structured:

### Step 1: Switch to the `dev` branch
```bash
git checkout dev
```

### Step 2: Test your changes locally
Run a local Python server in the project directory:
```bash
python3 -m http.server 8010
```
Open `http://localhost:8010` in your web browser.

### Step 3: Commit and Push your changes
When you are satisfied with your local edits:
```bash
git add .
git commit -m "brief description of your edits"
git push origin dev
```

### Step 4: Deploy Live (Merge into `main`)
To publish your updates to the live domain:
```bash
git checkout main
git merge dev
git push origin main
git checkout dev
```

---

## 3. Working on the Modular Version (`modular-config` branch)

If you want to work on or test the config-driven structure (where the entire layout is generated dynamically from a single file):

### Step 1: Switch to the `modular-config` branch
```bash
git checkout modular-config
```

### Step 2: Edit `config.js`
Open `config.js` in your editor. You can easily:
*   Add, remove, or reorder images in the **Carousel** (`carouselImages` array).
*   Edit title text, paragraphs, or swap photos in the **Editorial Split Sections** (`editorialSections` array).
*   Add or remove images in the **See More Grid** (`galleryGrid` array). The grid automatically resizes and structures them in a beautiful layout.

### Step 3: Test locally
Start a local server:
```bash
python3 -m http.server 8012
```
Open `http://localhost:8012` to verify your changes.

### Step 4: Commit and Push to the branch
Save and push your updates to the remote branch:
```bash
git add .
git commit -m "updated config.js with new photos/texts"
git push origin modular-config
```

*(Note: Do not merge `modular-config` into `main` unless you want the live website to transition fully to this configuration-driven structure.)*
