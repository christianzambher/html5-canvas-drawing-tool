
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

$("#btnDrawImage").on("click", function () {
    state.action = "C";
    state.shapeType = "IM";
    state.isDrawing = false;
    state.canvas.style.cursor = "crosshair";
    manage_Inputs("I", 1);
});

$("#chckRedimImage").on("change", function () {
    let checked = $(this).is(":checked");
    $("#txtAncho_Image").attr("disabled", !checked);
    $("#txtAlto_Image").attr("disabled", !checked);
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