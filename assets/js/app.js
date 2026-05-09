window.addEventListener('DOMContentLoaded', () => {
    //* STATE
    state.canvas = document.getElementById('canvas');
    state.context = state.canvas.getContext('2d');

    initializeCanvas();
    initializeUI();
    initializeCanvasEvents();
    getOffset();
});