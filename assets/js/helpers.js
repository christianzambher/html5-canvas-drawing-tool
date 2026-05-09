function getOffset() {
    let canvas_offsets = state.canvas.getBoundingClientRect();

    state.offset_x = canvas_offsets.left;
    state.offset_y = canvas_offsets.top;
}
function manage_Inputs(type, status) {
    $("#txtAncho").attr(
        "disabled",
        status == 1 ? true : false
    );
}