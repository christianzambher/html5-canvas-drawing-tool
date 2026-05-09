//* =========================
//* VARIABLES GLOBALES
//* =========================
let start_background_color = "white";

let offset_x = 0;
let offset_y = 0;

let draw_width = 0;
let draw_height = 0;

let draw_color = "#000000";

let draw_width_line = "2";

let draw_cap = "";

let draw_text = "";
let draw_text_aling = "";
let draw_text_style = "";
let draw_text_size = 2;
let draw_text_font = "";

let draw_width_image = 0;
let draw_height_image = 0;

let action = "";
let shape_type = "";
let is_drawing = false;

let initial_point_X = 0;
let initial_point_Y = 0;

let width_Square = 0;
let height_Square = 0;

let restore_array = [];
let index_restore = -1;


//* =========================
//* INICIALIZACION
//* =========================

window.addEventListener('DOMContentLoaded', () => {

    //* STATE
    state.canvas = document.getElementById('canvas');
    state.context = state.canvas.getContext('2d');

    //* REFERENCIAS
    canvas = state.canvas;
    context = state.context;

    //* CONFIG CANVAS
    canvas.width = 1000;
    canvas.height = 400;

    context.fillStyle = start_background_color;
    context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.style.border = "2px solid darkgray";

    //* INPUTS INICIALES
    manage_Inputs("X", 1);

    $("#txtAncho").val(draw_width);
    $("#txtAlto").val(draw_height);

    $("#inpColor").val(draw_color);

    $("#inpRango").val(draw_width_line);
    $("#pGrosor").text(draw_width_line);

    $("#slctTrazo").val(draw_cap);

    $("#txtDrawText").val(draw_text);

    $("#slctDrawTextAlign").val(draw_text_aling);

    $("#slctDrawTextStyle").val(draw_text_style);

    $("#txtDrawTextSize").val(draw_text_size);

    $("#slctDrawTextFont").val(draw_text_font);

    $("#txtAncho_Image").attr("disabled", true);
    $("#txtAlto_Image").attr("disabled", true);

    //* OFFSET
    get_offset();

    //* EVENTOS CANVAS
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

});


//* =========================
//* FUNCIONES
//* =========================

function get_offset() {

    let canvas_offsets = canvas.getBoundingClientRect();

    offset_x = canvas_offsets.left;
    offset_y = canvas_offsets.top;
}

function start(event) {

    is_drawing = true;

    context.beginPath();

    context.moveTo(
        event.clientX - offset_x,
        event.clientY - offset_y
    );

    initial_point_X = event.clientX - offset_x;
    initial_point_Y = event.clientY - offset_y;

    event.preventDefault();
}

function draw(event) {

    let coordinates =
        "x : " + parseInt(event.clientX - offset_x) +
        ", y : " + parseInt(event.clientY - offset_y);

    $("#pCoordinates").text(coordinates);

    if (action == "C") {

        if (is_drawing) {

            if (shape_type == "LN") {

                context.lineTo(
                    parseInt(event.clientX - offset_x),
                    parseInt(event.clientY - offset_y)
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

    if (is_drawing) {

        context.stroke();
        context.closePath();

        is_drawing = false;

        event.preventDefault();

        if (shape_type == "LN") {

            if (event.type != "mouseout") {

                restore_array.push(
                    context.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    )
                );

                index_restore += 1;
            }
        }

        else if (shape_type == "SQ") {

            context.rect(
                initial_point_X,
                initial_point_Y,
                draw_width,
                draw_height
            );

            state.context.fillStyle = "transparent";

            state.context.fill();

            state.context.lineWidth = state.lineWidth;

            state.context.strokeStyle = state.drawColor;

            state.context.stroke();

            if (event.type != "mouseout") {

                restore_array.push(
                    state.context.getImageData(
                        0,
                        0,
                        state.canvas.width,
                        state.canvas.height
                    )
                );

                index_restore += 1;
            }
        }

        else if (shape_type == "TX") {

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
                initial_point_X,
                initial_point_Y
            );

            if (event.type != "mouseout") {

                restore_array.push(
                    state.context.getImageData(
                        0,
                        0,
                        state.canvas.width,
                        state.canvas.height
                    )
                );

                index_restore += 1;
            }
        }
    }
}

function clear_canvas() {

    state.context.fillStyle = start_background_color;

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

    action = "";
    shape_type = "";

    is_drawing = false;

    initial_point_X = 0;
    initial_point_Y = 0;

    width_Square = 0;
    height_Square = 0;

    canvas.style.cursor = "auto";

    restore_array = [];

    index_restore = -1;
}

function undo_last() {

    if (index_restore <= 0) {

        clear_canvas();

    } else {

        index_restore -= 1;

        restore_array.pop();

        context.putImageData(
            restore_array[index_restore],
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
    get_offset();
});

$(window).scroll(function () {
    get_offset();
});

$("#txtAncho").on("change", function () {
    draw_width = this.value;
});

$("#txtAlto").on("change", function () {
    draw_height = this.value;
});

$("#inpColor").on("change", function () {
    draw_color = this.value;
});

$("#inpRango").on("change", function () {

    draw_width_line = this.value;

    $("#pGrosor").text(this.value);
});

$("#slctTrazo").on("change", function () {
    draw_cap = this.value;
});

$("#txtDrawText").on("keyup", function () {
    draw_text = this.value;
});

$("#btnDrawCuadro").on("click", function () {

    action = "C";

    shape_type = "SQ";

    is_drawing = false;

    canvas.style.cursor = "crosshair";

    manage_Inputs("S", 1);
});

$("#btnDrawLinea").on("click", function () {

    action = "C";

    shape_type = "LN";

    is_drawing = false;

    canvas.style.cursor = "crosshair";

    manage_Inputs("L", 1);
});

$("#btnDrawTexto").on("click", function () {

    action = "C";

    shape_type = "TX";

    is_drawing = false;

    canvas.style.cursor = "crosshair";

    manage_Inputs("T", 1);
});

$("#btnClearTodo").on("click", function () {
    clear_canvas();
});

$("#btnUndo").on("click", function () {
    undo_last();
});

$("#btnSave").on("click", function () {

    canvas.toBlob(blob => {

        let anchor = document.createElement("a");

        anchor.download = "canvas.jpg";

        anchor.href = URL.createObjectURL(blob);

        anchor.click();

        URL.revokeObjectURL(anchor.href);

    }, "image/jpeg", 0.9);
});