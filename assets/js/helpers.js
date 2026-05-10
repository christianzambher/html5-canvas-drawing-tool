function getOffset() {
    let canvas_offsets = state.canvas.getBoundingClientRect();

    state.offset_x = canvas_offsets.left;
    state.offset_y = canvas_offsets.top;
}
function manage_Inputs(type, status) {

    const isDisabled = status == 1 ? false : true;

    //* =========================
    //* LINEA
    //* =========================
    if (type == "L") {

        $("#txtAncho").attr("disabled", true);
        $("#txtAlto").attr("disabled", true);

        $("#inpColor").attr("disabled", false);
        $("#inpRango").attr("disabled", false);
        $("#slctTrazo").attr("disabled", false);

        $("#txtDrawText").attr("disabled", true);
        $("#slctDrawTextStyle").attr("disabled", true);
        $("#txtDrawTextSize").attr("disabled", true);
        $("#slctDrawTextFont").attr("disabled", true);

        $("#inpImage").attr("disabled", true);
        $("#chckRedimImage").attr("disabled", true);

        $("#txtAncho_Image").attr("disabled", true);
        $("#txtAlto_Image").attr("disabled", true);

    }

    //* =========================
    //* CUADRO
    //* =========================
    else if (type == "S") {

        $("#txtAncho").attr("disabled", false);
        $("#txtAlto").attr("disabled", false);

        $("#inpColor").attr("disabled", false);
        $("#inpRango").attr("disabled", false);
        $("#slctTrazo").attr("disabled", true);

        $("#txtDrawText").attr("disabled", true);
        $("#slctDrawTextStyle").attr("disabled", true);
        $("#txtDrawTextSize").attr("disabled", true);
        $("#slctDrawTextFont").attr("disabled", true);

        $("#inpImage").attr("disabled", true);
        $("#chckRedimImage").attr("disabled", true);

        $("#txtAncho_Image").attr("disabled", true);
        $("#txtAlto_Image").attr("disabled", true);

    }

    //* =========================
    //* TEXTO
    //* =========================
    else if (type == "T") {

        $("#txtAncho").attr("disabled", true);
        $("#txtAlto").attr("disabled", true);

        $("#inpColor").attr("disabled", false);
        $("#inpRango").attr("disabled", true);
        $("#slctTrazo").attr("disabled", true);

        $("#txtDrawText").attr("disabled", false);
        $("#slctDrawTextStyle").attr("disabled", false);
        $("#txtDrawTextSize").attr("disabled", false);
        $("#slctDrawTextFont").attr("disabled", false);

        $("#inpImage").attr("disabled", true);
        $("#chckRedimImage").attr("disabled", true);

        $("#txtAncho_Image").attr("disabled", true);
        $("#txtAlto_Image").attr("disabled", true);

    }

    //* =========================
    //* IMAGEN
    //* =========================
    else if (type == "I") {

        $("#txtAncho").attr("disabled", true);
        $("#txtAlto").attr("disabled", true);

        $("#inpColor").attr("disabled", true);
        $("#inpRango").attr("disabled", true);
        $("#slctTrazo").attr("disabled", true);

        $("#txtDrawText").attr("disabled", true);
        $("#slctDrawTextStyle").attr("disabled", true);
        $("#txtDrawTextSize").attr("disabled", true);
        $("#slctDrawTextFont").attr("disabled", true);

        $("#inpImage").attr("disabled", false);
        $("#chckRedimImage").attr("disabled", false);

        if ($("#chckRedimImage").is(":checked")) {
            $("#txtAncho_Image").attr("disabled", false);
            $("#txtAlto_Image").attr("disabled", false);
        } else {
            $("#txtAncho_Image").attr("disabled", true);
            $("#txtAlto_Image").attr("disabled", true);
        }
    }

    //* =========================
    //* DEFAULT
    //* =========================
    else {

        $("#txtAncho").attr("disabled", true);
        $("#txtAlto").attr("disabled", true);

        $("#inpColor").attr("disabled", true);
        $("#inpRango").attr("disabled", true);
        $("#slctTrazo").attr("disabled", true);

        $("#txtDrawText").attr("disabled", true);
        $("#slctDrawTextStyle").attr("disabled", true);
        $("#txtDrawTextSize").attr("disabled", true);
        $("#slctDrawTextFont").attr("disabled", true);

        $("#inpImage").attr("disabled", true);
        $("#chckRedimImage").attr("disabled", true);

        $("#txtAncho_Image").attr("disabled", true);
        $("#txtAlto_Image").attr("disabled", true);

    }
}