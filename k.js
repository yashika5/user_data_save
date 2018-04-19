var upfiles = [{
    name: "name1"
}, {
    name: "name2"
}, {
    name: "name3"
}, {
    name: "name4"
}, {
    name: "name5"
}, {
    name: "name6"
}, {
    name: "name7"
}

];

var int_loop = 1;
var flag_tr = 1;
$('#total').append("<table width=100%>");

$(upfiles).each(function (index, file) {
    display_removebutton = "<img width='20px' style='cursor:pointer;' height='20px' class='class_remove' data-id='" + int_loop + "' id='remove_" + int_loop + "' src='images/DeleteRed.png' />";
    if (flag_tr === 1 && int_loop === 1) {
        $('#total table').append("<tr>");
    } else if (flag_tr === 6) {
        $('#total table').append("<tr>");
    }
    $('#total tr:last').append("<td class='div_files' id='div_selec" + int_loop + "'><b>File Name :</b>" + file.name + display_removebutton + "</td>");
    if (flag_tr === 6) {
        $('#total').append("</tr>");
        flag_tr = 1;
    }
    int_loop++;
    flag_tr++;
});
$('#total').on('click', '[id^=remove_]', function () {
    var $td = $(this).closest('td');
    $td.fadeOut(function () {
        $td.remove();
    });
});