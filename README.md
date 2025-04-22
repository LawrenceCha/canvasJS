
# 🎨 Drawing Web App (Figma-style Canvas)

This project is a lightweight web application that lets users draw freely and insert text on a canvas using mouse or touch input — similar to the Figma interface.

---

## 📁 Project Structure

```
drawing-web/
├── index.html      # Main HTML layout and UI elements
├── styles.css      # Styling and layout design
└── script.js       # JavaScript for interactivity and tools
```

---

## 🔧 How It Works

### 1. `index.html` – HTML Layout

```html
<div class="container">
  <div class="toolbar">
    <button id="pencil" class="tool active">✏️</button>
    <button id="text" class="tool">📝</button>
    <button id="eraser" class="tool">🧹</button>
    <button id="clear" class="tool">🗑️</button>
    <input type="color" id="colorPicker" value="#000000">
    <input type="range" id="sizeSlider" min="1" max="50" value="5">
  </div>
  <canvas id="drawingCanvas"></canvas>
</div>
```

- Includes a toolbar for tools (pencil, text, eraser, clear), a color picker, and a size slider
- A canvas element for drawing

---

### 2. `styles.css` – Styling & Layout

- Uses Flexbox for responsive design
- Defines styles for the toolbar, buttons, canvas
- Adds hover/active states for tools
- Ensures the canvas scales correctly with screen size

---

### 3. `script.js` – JavaScript Logic

#### a) Initialization

Sets up canvas context and initializes state variables.

#### b) Responsive Canvas Sizing

Dynamically resizes the canvas based on window/container size.

#### c) Drawing Functions

Handles freehand drawing and erasing behavior using mouse or touch.

#### d) Text Input Functionality

Allows users to click and add text directly to the canvas.

#### e) Tool Selection Logic

Switches between tools and updates the cursor accordingly.

#### f) Event Listeners

Supports both mouse and touch input for better compatibility.

---

## ✅ Key Features

- ✏️ Freehand drawing
- 📝 Add text to canvas
- 🧹 Eraser tool
- 🗑️ Clear canvas
- 🎨 Color and size selection
- 📱 Mobile and touch support
- 🧩 Easy to extend with new tools

---

## 🚀 Getting Started

1. Clone this repo or download the ZIP:
    ```bash
    git clone https://github.com/yourusername/drawing-web.git
    ```
2. Open `index.html` in your browser.

---

## 📄 License

This project is licensed under the MIT License.
