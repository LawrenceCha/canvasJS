// Constants
const CANVAS_SIZE = 800;
const DEFAULT_LINE_WIDTH = 5;
const DEFAULT_FONT = "68px 'Press Start 2P'";

// DOM Elements
const elements = {
    canvas: document.getElementById("canvas"),
    lineWidth: document.getElementById("line-width"),
    color: document.getElementById("color"),
    modeBtn: document.getElementById("mode-btn"),
    eraserBtn: document.getElementById("eraser-btn"),
    clearBtn: document.getElementById("clear-btn"),
    saveBtn: document.getElementById("save-btn"),
    fileInput: document.getElementById("file"),
    textInput: document.getElementById("text"),
    colorOptions: Array.from(document.getElementsByClassName("color-option"))
};

// Canvas setup
const ctx = elements.canvas.getContext("2d");
elements.canvas.width = CANVAS_SIZE;
elements.canvas.height = CANVAS_SIZE;
ctx.lineWidth = DEFAULT_LINE_WIDTH;
ctx.lineCap = "round";

// State
const state = {
    isPainting: false,
    isFilling: false
};

// Helper function to get correct mouse coordinates
function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

// Drawing functions
const drawing = {
    start(event) {
        state.isPainting = true;
        const pos = getMousePos(elements.canvas, event);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    },

    move(event) {
        if (!state.isPainting) return;
        
        const pos = getMousePos(elements.canvas, event);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    },

    end() {
        state.isPainting = false;
    },

    fill() {
        if (state.isFilling) {
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
    }
};

// Tool functions
const tools = {
    setLineWidth(width) {
        ctx.lineWidth = width;
    },

    setColor(color) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        elements.color.value = color;
    },

    toggleMode() {
        state.isFilling = !state.isFilling;
        elements.modeBtn.innerText = state.isFilling ? "Draw" : "Fill";
    },

    clear() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    },

    save() {
        const url = elements.canvas.toDataURL();
        const a = document.createElement("a");
        a.href = url;
        a.download = "myDrawing.png";
        a.click();
    },

    eraser() {
        tools.setColor("white");
        state.isFilling = false;
        elements.modeBtn.innerText = "Fill";
    },

    addText(event) {
        const text = elements.textInput.value;
        if (text !== "") {
            const pos = getMousePos(elements.canvas, event);
            ctx.save();
            ctx.lineWidth = 1;
            ctx.font = DEFAULT_FONT;
            ctx.fillText(text, pos.x, pos.y);
            ctx.restore();
        }
    },

    loadImage(event) {
        const file = event.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const image = new Image();
        image.src = url;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
            elements.fileInput.value = null;
        };
    }
};

// Event Listeners
const setupEventListeners = () => {
    // Canvas events
    elements.canvas.addEventListener("mousemove", drawing.move);
    elements.canvas.addEventListener("mousedown", drawing.start);
    elements.canvas.addEventListener("mouseup", drawing.end);
    elements.canvas.addEventListener("mouseleave", drawing.end);
    elements.canvas.addEventListener("click", drawing.fill);
    elements.canvas.addEventListener("dblclick", tools.addText);

    // Control events
    elements.lineWidth.addEventListener("change", (e) => tools.setLineWidth(e.target.value));
    elements.color.addEventListener("change", (e) => tools.setColor(e.target.value));
    elements.colorOptions.forEach((color) => 
        color.addEventListener("click", (e) => tools.setColor(e.target.dataset.color))
    );

    // Button events
    elements.modeBtn.addEventListener("click", tools.toggleMode);
    elements.eraserBtn.addEventListener("click", tools.eraser);
    elements.clearBtn.addEventListener("click", tools.clear);
    elements.saveBtn.addEventListener("click", tools.save);
    elements.fileInput.addEventListener("change", tools.loadImage);
};

// Initialize
setupEventListeners();

