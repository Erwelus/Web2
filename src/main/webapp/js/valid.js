function isANumber(str) {
    const numStr = /^[\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$|\.$/;
    return numStr.test(str);
}

function validateX(inp) {
    let val = parseFloat(inp.value.replace(',','.'));

    if ((isNaN(val)) || (!isANumber(inp.value.replace(',','.'))) || (inp.value.replace(',','.').split('.').length > 2)) {
        return false;
    }

    return (val >= -5) && (val <= 3);
}

function validate() {
    $("#submit")[0].disabled = !(validateX($("#x")[0])  && $("input[name='Y']:checked").length>0 && $("input[name='R']:checked").length>0);
    let val = ($('#x')[0].value.replace(',','.'));
    if(!isNaN(val)) $('#x')[0].value = val;

    //console.log($('[serialize="true"]').serialize()+"&Y="+$("[flag='selected']").attr('id'));
}

/*$('#submit').on('click', ()=>{
    $('#x')[0].value =parseFloat($('#x')[0].value.replace(',','.'));
    console.log('click')
    $("#form").submit();
});*/


