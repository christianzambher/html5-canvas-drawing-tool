let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let start_background_color = "white";//TODO Definicion de Color de Fondo

//*Bloqueo de Campos
manage_Inputs("X", 1);

//*Definicion de Tamaño del CANVAS
canvas.width = 1000;
canvas.height = 400;

//*Datos Iniciales
let offset_x = 0;
let offset_y = 0;

let draw_width = 0;
$("#txtAncho").val(draw_width);
let draw_height = 0;
$("#txtAlto").val(draw_height);

let draw_color = "#000000";
$("#inpColor").val(draw_color);

let draw_width_line = "2";
$("#inpRango").val(draw_width_line);
$("#pGrosor").text(draw_width_line);

let draw_cap = "";
$("#slctTrazo").val(draw_cap);

let draw_text = "";
$("#txtDrawText").val(draw_text);

let draw_text_aling = "";
$("#slctDrawTextAlign").val(draw_text_aling);

let draw_text_style = "";
$("#slctDrawTextStyle").val(draw_text_style);

let draw_text_size = 2;
$("#txtDrawTextSize").val(draw_text_size);

let draw_text_font = "";
$("#slctDrawTextFont").val(draw_text_font);

$("#txtAncho_Image").attr("disabled", true);
$("#txtAlto_Image").attr("disabled", true);

let draw_width_image = 0;
let draw_height_image = 0;

let action = "";
let shape_type = "";
let is_drawing = false;

let initial_point_X = 0;
let initial_point_Y = 0;

// let final_point_X = 0;
// let final_point_Y = 0;

let width_Square = 0;
let height_Square = 0;

let restore_array = [];
let index_restore = -1;

//*Definicion de 1er Shape de CANVAS
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);
canvas.style.border = "2px solid darkgray";

//*Funciones
function get_offset() {
    let canvas_offsets = canvas.getBoundingClientRect();
    offset_x = canvas_offsets.left;
    offset_y = canvas_offsets.top;
}
function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - offset_x, event.clientY - offset_y);

    initial_point_X = event.clientX - offset_x;
    initial_point_Y = event.clientY - offset_y;
    event.preventDefault();
}
function draw(event) {
    var coordinates = "x : " + parseInt(event.clientX - offset_x) + ", y : " + parseInt(event.clientY - offset_y);
    // context.fillStyle = "transparent";
    // context.fillRect((event.clientX - offset_x), (event.clientY - offset_y), 100, 30);
    // context.fillStyle = "black";
    // context.font = "bold 15px Arial";
    // context.fillText(coordinates, (event.clientX - offset_x), (event.clientY - offset_y));
    $("#pCoordinates").text(coordinates);
    if (action == "C") {
        if (is_drawing) {
            if (shape_type == "LN") {
                context.lineTo(parseInt(event.clientX - offset_x), parseInt(event.clientY - offset_y));
                context.strokeStyle = draw_color;
                context.lineWidth = draw_width_line;
                context.lineCap = draw_cap == "" ? "butt" : draw_cap;
                context.lineJoin = draw_cap == "" ? "butt" : draw_cap;
                context.fillStyle = draw_color;
                context.stroke();
            }
        }
    } else if (action == "M") {

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
                restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
                index_restore += 1;
            }
        }
        else if (shape_type == "SQ") {
            // final_point_X = event.clientX - offset_x;
            // final_point_Y = event.clientX - offset_y;

            // width_Square = parseInt(final_point_X - initial_point_X);
            // height_Square = parseInt(final_point_Y - initial_point_Y);

            // context.rect(initial_point_X, initial_point_Y, width_Square, height_Square);
            context.rect(initial_point_X, initial_point_Y, draw_width, draw_height);
            context.fillStyle = "transparent";
            context.fill();
            context.lineWidth = draw_width_line;
            context.strokeStyle = draw_color;
            context.stroke();

            if (event.type != "mouseout") {
                restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
                index_restore += 1;
            }
        }
        else if (shape_type == "TX") {
            context.fillStyle = draw_color;
            context.font = draw_text_style + " " + draw_text_size + "px " + draw_text_font;
            context.textAlign = draw_text_aling;
            context.fillText(draw_text, initial_point_X, initial_point_Y);

            if (event.type != "mouseout") {
                restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
                index_restore += 1;
            }
        }
        else if (shape_type == "IM") {
            if ($("#inpImage")[0].files.length > 0) {
                let file = $("#inpImage")[0].files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function (ev) {
                        if ($("#chckRedimImage").is(":checked")) {
                            draw_width_image = $("#txtAncho_Image").val();
                            draw_height_image = $("#txtAlto_Image").val();
                            context.drawImage(image, initial_point_X, initial_point_Y, draw_width_image, draw_height_image);
                        } else {
                            context.drawImage(image, initial_point_X, initial_point_Y);
                        }

                        if (event.type != "mouseout") {
                            restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
                            index_restore += 1;
                        }
                    }
                }
            }
        }
    }
}
function clear_canvas() {
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    action = "";
    shape_type = "";
    is_drawing = false;

    initial_point_X = 0;
    initial_point_Y = 0;

    // final_point_X = 0;
    // final_point_Y = 0;

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
        context.putImageData(restore_array[index_restore], 0, 0);
    }
}
function manage_Inputs(type, status) {
    if (type == "L") {
        $("#txtAncho").attr("disabled", status == 1 ? true : false);
        $("#txtAlto").attr("disabled", status == 1 ? true : false);

        $("#inpColor").attr("disabled", status == 1 ? false : true);
        $("#inpRango").attr("disabled", status == 1 ? false : true);
        $("#slctTrazo").attr("disabled", status == 1 ? false : true);

        $("#txtDrawText").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextAlign").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextStyle").attr("disabled", status == 1 ? true : false);
        $("#txtDrawTextSize").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextFont").attr("disabled", status == 1 ? true : false);

        $("#inpImage").attr("disabled", status == 1 ? true : false);
        $("#chckRedimImage").attr("disabled", status == 1 ? true : false);
    } else if (type == "S") {
        $("#txtAncho").attr("disabled", status == 1 ? false : true);
        $("#txtAlto").attr("disabled", status == 1 ? false : true);

        $("#inpColor").attr("disabled", status == 1 ? false : true);
        $("#inpRango").attr("disabled", status == 1 ? false : true);
        $("#slctTrazo").attr("disabled", status == 1 ? true : false);

        $("#txtDrawText").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextAlign").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextStyle").attr("disabled", status == 1 ? true : false);
        $("#txtDrawTextSize").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextFont").attr("disabled", status == 1 ? true : false);

        $("#inpImage").attr("disabled", status == 1 ? true : false);
        $("#chckRedimImage").attr("disabled", status == 1 ? true : false);
    }
    else if (type == "T") {
        $("#txtAncho").attr("disabled", status == 1 ? true : false);
        $("#txtAlto").attr("disabled", status == 1 ? true : false);

        $("#inpColor").attr("disabled", status == 1 ? false : true);
        $("#inpRango").attr("disabled", status == 1 ? true : false);
        $("#slctTrazo").attr("disabled", status == 1 ? true : false);

        $("#txtDrawText").attr("disabled", status == 1 ? false : true);
        $("#slctDrawTextAlign").attr("disabled", status == 1 ? false : true);
        $("#slctDrawTextStyle").attr("disabled", status == 1 ? false : true);
        $("#txtDrawTextSize").attr("disabled", status == 1 ? false : true);
        $("#slctDrawTextFont").attr("disabled", status == 1 ? false : true);

        $("#inpImage").attr("disabled", status == 1 ? true : false);
        $("#chckRedimImage").attr("disabled", status == 1 ? true : false);
    } else if (type == "I") {
        $("#txtAncho").attr("disabled", status == 1 ? true : false);
        $("#txtAlto").attr("disabled", status == 1 ? true : false);

        $("#inpColor").attr("disabled", status == 1 ? true : false);
        $("#inpRango").attr("disabled", status == 1 ? true : false);
        $("#slctTrazo").attr("disabled", status == 1 ? true : false);

        $("#txtDrawText").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextAlign").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextStyle").attr("disabled", status == 1 ? true : false);
        $("#txtDrawTextSize").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextFont").attr("disabled", status == 1 ? true : false);

        $("#inpImage").attr("disabled", status == 1 ? false : true);
        $("#chckRedimImage").attr("disabled", status == 1 ? false : true);
    }
    else {
        $("#txtAncho").attr("disabled", status == 1 ? true : false);
        $("#txtAlto").attr("disabled", status == 1 ? true : false);

        $("#inpColor").attr("disabled", status == 1 ? true : false);
        $("#inpRango").attr("disabled", status == 1 ? true : false);
        $("#slctTrazo").attr("disabled", status == 1 ? true : false);

        $("#txtDrawText").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextAlign").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextStyle").attr("disabled", status == 1 ? true : false);
        $("#txtDrawTextSize").attr("disabled", status == 1 ? true : false);
        $("#slctDrawTextFont").attr("disabled", status == 1 ? true : false);

        $("#inpImage").attr("disabled", status == 1 ? true : false);
        $("#chckRedimImage").attr("disabled", status == 1 ? true : false);
    }
}

//*Seleccion del Ancho
$("#txtAncho").on("change", function () {
    draw_width = this.value;
});
//*Seleccion del Alto
$("#txtAlto").on("change", function () {
    draw_height = this.value;
});
//*Seleccion de Color
$("#inpColor").on("change", function () {
    draw_color = this.value;
});
//*Seleccion de Tamaño de Grosor
$("#inpRango").on("change", function () {
    draw_width_line = this.value;
    $("#pGrosor").text(this.value);
});
//*Seleccion de Trazo
$("#slctTrazo").on("change", function () {
    draw_cap = this.value;
});
//*Escritura de Texto
$("#txtDrawText").on("keyup", function () {
    draw_text = this.value;
});
//*Boton de Dibujo de Cuadro
$("#btnDrawCuadro").on("click", function () {
    action = "C";
    shape_type = "SQ";
    is_drawing = false;
    canvas.style.cursor = "crosshair";
    $(this).removeClass("btn-secondary").addClass("btn-primary");
    $("#btnDrawLinea").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawTexto").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawImage").addClass("btn-secondary").removeClass("btn-primary");
    manage_Inputs("S", 1);
});
//*Boton de Dibujo de Linea
$("#btnDrawLinea").on("click", function () {
    action = "C";
    shape_type = "LN";
    is_drawing = false;
    canvas.style.cursor = "crosshair";
    $(this).removeClass("btn-secondary").addClass("btn-primary");
    $("#btnDrawCuadro").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawTexto").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawImage").addClass("btn-secondary").removeClass("btn-primary");
    manage_Inputs("L", 1)
});
//*Boton de Dibujo de Text
$("#btnDrawTexto").on("click", function () {
    action = "C";
    shape_type = "TX";
    is_drawing = false;
    canvas.style.cursor = "crosshair";
    $(this).removeClass("btn-secondary").addClass("btn-primary");
    $("#btnDrawCuadro").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawLinea").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawImage").addClass("btn-secondary").removeClass("btn-primary");
    manage_Inputs("T", 1)
});
//*Boton de Dibujo Imagen
$("#btnDrawImage").on("click", function () {
    action = "C";
    shape_type = "IM";
    is_drawing = false;
    canvas.style.cursor = "crosshair";
    $(this).removeClass("btn-secondary").addClass("btn-primary");
    $("#btnDrawCuadro").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawLinea").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawTexto").addClass("btn-secondary").removeClass("btn-primary");
    manage_Inputs("I", 1)
});
//*Input de Imagen
$("#inpImage").on("change", function () {
    if ($(this)[0].files.length > 0) {
        let file = $(this)[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function (ev) {
                $("#txtAncho_Image").val(this.width)
                $("#txtAlto_Image").val(this.height)
            }
        }
    }
});
//*Check de Redimension
$("#chckRedimImage").on("change", function () {
    $("#txtAncho_Image").attr("disabled", !$(this).is(":checked"));
    $("#txtAlto_Image").attr("disabled", !$(this).is(":checked"));
    draw_width_image = $(this).is(":checked") ? 0 : null;
    draw_height_image = $(this).is(":checked") ? 0 : null;
});
//*Boton de Limpiar Todo
$("#btnClearTodo").on("click", function () {
    clear_canvas();
    $("#btnDrawCuadro").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawLinea").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawTexto").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawImage").addClass("btn-secondary").removeClass("btn-primary");
    manage_Inputs("X", 1);
});
//*Boton de Deshacer
$("#btnUndo").on("click", function () {
    undo_last();
    $("#btnDrawCuadro").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawLinea").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawTexto").addClass("btn-secondary").removeClass("btn-primary");
    $("#btnDrawImage").addClass("btn-secondary").removeClass("btn-primary");
});
//*Boton de Guardar
$("#btnSave").on("click", function () {
    canvas.toBlob(
        blob => {
            let anchor = document.createElement("a");
            anchor.download = "canvas.jpg";
            anchor.href = URL.createObjectURL(blob);
            anchor.click();
            URL.revokeObjectURL(anchor.href);
        }, "image/jpeg", 0.9
    )
});

//*Select de Alineaion del Text
$("#slctDrawTextAlign").on("change", function () {
    draw_text_aling = this.value;
});
//*Select de Estilo del Text
$("#slctDrawTextStyle").on("change", function () {
    draw_text_style = this.value
});
//*Seleccion del Tamaño del Texto
$("#txtDrawTextSize").on("change", function () {
    draw_text_size = this.value;
});
//*Seleccion de la Fuente del Texto
$("#slctDrawTextFont").on("change", function () {
    draw_text_font = this.value;
});
//*Definicion de Eventos
$(document).ready(function () {
    get_offset();
});
$(window).resize(function () {
    get_offset();
});
$(window).scroll(function () {
    get_offset();
});
$("#canvas").resize(function () {
    get_offset();
});
get_offset();
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);
