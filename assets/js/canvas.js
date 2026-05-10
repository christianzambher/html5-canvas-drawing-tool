function initializeCanvas() {
    state.canvas.width = 1000;
    state.canvas.height = 400;

    state.context.fillStyle = state.backgroundColor;

    state.context.fillRect(
        0,
        0,
        state.canvas.width,
        state.canvas.height
    );

    state.canvas.style.border = "2px solid darkgray";
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

        else if (state.shapeType == "IM") {

            if ($("#inpImage")[0].files.length > 0) {

                let file = $("#inpImage")[0].files[0];

                let reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {

                    let image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {

                        //* REDIMENSIONAR
                        if ($("#chckRedimImage").is(":checked")) {

                            let width = $("#txtAncho_Image").val();

                            let height = $("#txtAlto_Image").val();

                            state.context.drawImage(
                                image,
                                state.startX,
                                state.startY,
                                width,
                                height
                            );

                        } else {

                            //* TAMAÑO ORIGINAL
                            state.context.drawImage(
                                image,
                                state.startX,
                                state.startY
                            );
                        }

                        //* RESTORE
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
                    };
                };
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

function initializeCanvasEvents() {
    state.canvas.addEventListener("mousedown", start, false);
    state.canvas.addEventListener("mousemove", draw, false);
    state.canvas.addEventListener("mouseup", stop, false);
    state.canvas.addEventListener("mouseout", stop, false);
}