function initializeUI() {
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
}