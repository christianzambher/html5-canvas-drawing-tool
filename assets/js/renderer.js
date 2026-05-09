function clearCanvas() {
    state.context.clearRect(
        0,
        0,
        state.canvas.width,
        state.canvas.height
    );
}

function renderCanvas() {
    clearCanvas();

    state.shapes.forEach(shape => {
        drawShape(shape);
    });
}

function drawShape(shape) {

    switch (shape.type) {

        case 'rectangle':

            state.context.beginPath();

            state.context.rect(
                shape.x,
                shape.y,
                shape.width,
                shape.height
            );

            state.context.strokeStyle = shape.color;
            state.context.lineWidth = shape.lineWidth;

            state.context.stroke();

            break;
    }
}