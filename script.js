document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const tools = document.querySelectorAll('.tool');
    const colorPicker = document.getElementById('colorPicker');
    const sizeSlider = document.getElementById('sizeSlider');
    const container = document.querySelector('.container');
    
    let isDrawing = false;
    let currentTool = 'pencil';
    let lastX = 0;
    let lastY = 0;
    let textInput = null;

    // Set canvas size
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width - 40; // Adjust for container padding
        canvas.height = rect.height - 100; // Adjust for toolbar and padding
    }

    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Drawing functions
    function startDrawing(e) {
        if (currentTool === 'text') {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addTextInput(x, y);
            return;
        }
        isDrawing = true;
        [lastX, lastY] = getMousePos(e);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing || currentTool === 'text') return;

        const [x, y] = getMousePos(e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : colorPicker.value;
        ctx.lineWidth = sizeSlider.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        [lastX, lastY] = [x, y];
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top
        ];
    }

    // Text input functions
    function addTextInput(x, y) {
        // Remove existing text input if any
        if (textInput) {
            textInput.remove();
        }

        // Create new text input
        textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.style.position = 'absolute';
        textInput.style.left = `${x + canvas.offsetLeft}px`;
        textInput.style.top = `${y + canvas.offsetTop}px`;
        textInput.style.border = '1px solid #ccc';
        textInput.style.outline = 'none';
        textInput.style.background = 'white';
        textInput.style.fontSize = `${sizeSlider.value}px`;
        textInput.style.color = colorPicker.value;
        textInput.style.fontFamily = 'Arial, sans-serif';
        textInput.style.padding = '5px';
        textInput.style.margin = '0';
        textInput.style.zIndex = '1000';
        textInput.style.minWidth = '100px';
        textInput.style.borderRadius = '4px';
        textInput.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

        // Add text input to container
        container.appendChild(textInput);
        textInput.focus();

        // Handle text input completion
        textInput.addEventListener('blur', () => {
            if (textInput.value) {
                ctx.font = `${sizeSlider.value}px Arial`;
                ctx.fillStyle = colorPicker.value;
                ctx.fillText(textInput.value, x, y + parseInt(sizeSlider.value));
            }
            textInput.remove();
            textInput = null;
        });

        // Handle Enter key
        textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                textInput.blur();
            }
        });

        // Prevent canvas click event from firing when clicking the text input
        textInput.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
    }

    // Tool selection
    tools.forEach(tool => {
        tool.addEventListener('click', () => {
            tools.forEach(t => t.classList.remove('active'));
            tool.classList.add('active');
            currentTool = tool.id;
            
            // Update cursor based on tool
            if (currentTool === 'text') {
                canvas.style.cursor = 'text';
            } else {
                canvas.style.cursor = 'crosshair';
            }
            
            // Remove text input when switching tools
            if (textInput && currentTool !== 'text') {
                textInput.remove();
                textInput = null;
            }
        });
    });

    // Clear canvas
    document.getElementById('clear').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Event listeners
    canvas.addEventListener('click', (e) => {
        if (currentTool === 'text') {
            const [x, y] = getMousePos(e);
            addTextInput(x, y);
        }
    });
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (currentTool === 'text') {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            addTextInput(x, y);
            return;
        }
        startDrawing(e.touches[0]);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });

    canvas.addEventListener('touchend', stopDrawing);
}); 