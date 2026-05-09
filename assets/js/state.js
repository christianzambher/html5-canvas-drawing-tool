const state = {
    canvas: null,
    context: null,

    action: "",
    shapeType: "",

    isDrawing: false,

    startX: 0,
    startY: 0,

    offsetX: 0,
    offsetY: 0,

    drawColor: "#000000",
    lineWidth: 2,
    lineCap: "butt",

    drawWidth: 0,
    drawHeight: 0,

    drawText: "",
    textAlign: "start",
    textStyle: "",
    textSize: 16,
    textFont: "Arial",

    restoreArray: [],
    restoreIndex: -1
};