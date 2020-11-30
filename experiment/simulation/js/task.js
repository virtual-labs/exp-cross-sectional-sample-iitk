function randEx(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var correct = [
    "1"
];
$(function() {
    $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
});



function chk() {
    var sortedIDs = $("#sortable2").sortable("toArray");
    console.log("hi", sortedIDs, correct);
    if (sortedIDs.length !== correct.length) {
        showToast("First move sample on module.", 0);
    } else {
        for (var i = 0; i < sortedIDs.length; i++) {
            if (sortedIDs[i] !== correct[i]) {
                showToast("Not correctly aligned", 1);
                return;
            }
        }
        showToast("Sample placed successfully, Start dimpling.", 2);
        $('#dimple').prop('disabled', false);
    }
}

function dimple() {
    $('#wh').show(1000);
    $('#ar').show();
    // $('#ar').css({ 'transform': 'rotate(180deg)' });
    $('#fsb').prop('disabled', false);
    $('#csp').prop('disabled', true);
}

function reload() {
    window.location.reload();
}

function getsampl() {
    $('#ar').hide(100);
    $('#wh').hide(100);
    $('#1').hide(50);
    $('#fs').show(100);
    $('#csp').prop('disabled', true);
    $('#dimple').prop('disabled', true);
}