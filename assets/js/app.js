//* =========================
//* INICIALIZACION
//* =========================

window.addEventListener('DOMContentLoaded', () => {

    //* STATE
    state.canvas = document.getElementById('canvas');
    state.context = state.canvas.getContext('2d');

    //* CONFIG CANVAS
    state.canvas.width = 1000;
    state.canvas.height = 400;

    state.context.fillStyle = state.backgroundColor;
    state.context.fillRect(0, 0, state.canvas.width, state.canvas.height);

    state.canvas.style.border = "2px solid darkgray";

    //* INPUTS INICIALES
    manage_Inputs("X", 1);

    $("#txtAncho").val(state.drawWidth);
    $("#txtAlto").val(state.drawHeight);

    $("#inpColor").val(state.drawColor);

    $("#inpRango").val(state.lineWidth);
    $("#pGrosor").text(state.lineWidth);

    $("#slctTrazo").val(state.lineCap);

    $("#txtDrawText").val(state.drawText);

    $("#slctDrawTextStyle").val(state.textStyle);

    $("#txtDrawTextSize").val(state.textSize);

    $("#slctDrawTextFont").val(state.textFont);

    $("#txtAncho_Image").attr("disabled", true);
    $("#txtAlto_Image").attr("disabled", true);

    //* OFFSET
    getOffset();

    //* EVENTOS CANVAS
    state.canvas.addEventListener("mousedown", start, false);
    state.canvas.addEventListener("mousemove", draw, false);
    state.canvas.addEventListener("mouseup", stop, false);
    state.canvas.addEventListener("mouseout", stop, false);

});


//* =========================
//* FUNCIONES
//* =========================

function getOffset() {

    let canvas_offsets = state.canvas.getBoundingClientRect();

    state.offset_x = canvas_offsets.left;
    state.offset_y = canvas_offsets.top;
}

function start(event) {

    state.isDrawing = true;

    state.context.beginPath();

    state.context.moveTo(
        event.clientX - state.offset_x,
        event.clientY - state.offset_y
    );

    state.startX = event.clientX - state.offset_x;
    state.startY = event.clientY - state.offset_y;

    event.preventDefault();
}

function draw(event) {

    let coordinates =
        "x : " + Number(event.clientX - state.offset_x) +
        ", y : " + Number(event.clientY - state.offset_y);

    $("#pCoordinates").text(coordinates);

    if (state.action === "C") {

        if (state.isDrawing) {

            if (state.shapeType === "LN") {

                state.context.lineTo(
                    Number(event.clientX - state.offset_x),
                    Number(event.clientY - state.offset_y)
                );

                state.context.strokeStyle = state.drawColor;

                state.context.lineWidth = state.lineWidth;

                state.context.lineCap =
                    state.lineCap == "" ? "butt" : state.lineCap;

                state.context.lineJoin =
                    state.lineCap == "" ? "butt" : state.lineCap;

                state.context.fillStyle = state.drawColor;

                state.context.stroke();
            }
        }
    }

    event.preventDefault();
}

function stop(event) {

    if (state.isDrawing) {

        state.context.stroke();
        state.context.closePath();

        state.isDrawing = false;

        event.preventDefault();

        if (state.shapeType === "LN") {

            if (event.type !== "mouseout") {

                state.restoreArray.push(
                    state.context.getImageData(
                        0,
                        0,
                        state.canvas.width,
                        state.canvas.height
                    )
                );

                state.restoreIndex += 1;
            }
        }

        else if (state.shapeType === "SQ") {

            state.context.rect(
                state.startX,
                state.startY,
                state.drawWidth,
                state.drawHeight
            );

            state.context.fillStyle = "transparent";

            state.context.fill();

            state.context.lineWidth = state.lineWidth;

            state.context.strokeStyle = state.drawColor;

            state.context.stroke();

            if (event.type != "mouseout") {

                state.restoreArray.push(
                    state.context.getImageData(
                        0,
                        0,
                        state.canvas.width,
                        state.canvas.height
                    )
                );

                state.restoreIndex += 1;
            }
        }

        else if (state.shapeType == "TX") {

            state.context.fillStyle = state.drawColor;

            state.context.font =
                state.textStyle +
                " " +
                state.textSize +
                "px " +
                state.textFont;

            state.context.textAlign = state.textAlign;

            state.context.fillText(
                state.drawText,
                state.startX,
                state.startY
            );

            if (event.type != "mouseout") {

                state.restoreArray.push(
                    state.context.getImageData(
                        0,
                        0,
                        state.canvas.width,
                        state.canvas.height
                    )
                );

                state.restoreIndex += 1;
            }
        }
    }
}

function clearCanvas() {

    state.context.fillStyle = state.backgroundColor;

    state.context.clearRect(
        0,
        0,
        state.canvas.width,
        state.canvas.height
    );

    state.context.fillRect(
        0,
        0,
        state.canvas.width,
        state.canvas.height
    );

    state.action = "";
    state.shapeType = "";

    state.isDrawing = false;

    state.initialPointX = 0;
    state.initialPointY = 0;

    state.drawWidth = 0;
    state.drawHeight = 0;

    state.canvas.style.cursor = "auto";

    state.restoreArray = [];

    state.restoreIndex = -1;
}

function undoLast() {

    if (state.restoreIndex <= 0) {

        clearCanvas();

    } else {

        state.restoreIndex -= 1;

        state.restoreArray.pop();

        state.context.putImageData(
            state.restoreArray[state.restoreIndex],
            0,
            0
        );
    }
}

function manage_Inputs(type, status) {
    $("#txtAncho").attr(
        "disabled",
        status == 1 ? true : false
    );
}


//* =========================
//* EVENTOS JQUERY
//* =========================

$(window).resize(function () {
    getOffset();
});

$(window).scroll(function () {
    getOffset();
});

$("#txtAncho").on("change", function () {
    state.drawWidth = this.value;
});

$("#txtAlto").on("change", function () {
    state.drawHeight = this.value;
});

$("#inpColor").on("change", function () {
    state.drawColor = this.value;
});

$("#inpRango").on("change", function () {

    state.lineWidth = this.value;

    $("#pGrosor").text(this.value);
});

$("#slctTrazo").on("change", function () {
    state.lineCap = this.value;
});

$("#slctDrawTextAlign").on("change", function () {
    state.textAlign = this.value;
});

$("#slctDrawTextStyle").on("change", function () {
    state.textStyle = this.value;
});

$("#txtDrawTextSize").on("change", function () {
    state.textSize = this.value;
});

$("#slctDrawTextFont").on("change", function () {
    state.textFont = this.value;
});

$("#txtDrawText").on("keyup", function () {
    state.drawText = this.value;
});

$("#btnDrawCuadro").on("click", function () {

    state.action = "C";

    state.shapeType = "SQ";

    state.isDrawing = false;

    state.canvas.style.cursor = "crosshair";

    manage_Inputs("S", 1);
});

$("#btnDrawLinea").on("click", function () {

    state.action = "C";

    state.shapeType = "LN";

    state.isDrawing = false;

    state.canvas.style.cursor = "crosshair";

    manage_Inputs("L", 1);
});

$("#btnDrawTexto").on("click", function () {

    state.action = "C";

    state.shapeType = "TX";

    state.isDrawing = false;

    state.canvas.style.cursor = "crosshair";

    manage_Inputs("T", 1);
});

$("#btnClearTodo").on("click", function () {
    clearCanvas();
});

$("#btnUndo").on("click", function () {
    undoLast();
});

$("#btnSave").on("click", function () {

    state.canvas.toBlob(blob => {

        let anchor = document.createElement("a");

        anchor.download = "canvas.jpg";

        anchor.href = URL.createObjectURL(blob);

        anchor.click();

        URL.revokeObjectURL(anchor.href);

    }, "image/jpeg", 0.9);
});