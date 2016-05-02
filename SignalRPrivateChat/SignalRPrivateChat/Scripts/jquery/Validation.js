function showError(msg) {
    /* var popup = '<div style="width:375px; text-align:center; padding:15px; background-color:#F1F4F5; border-radius: 4px;">';
    popup += '<div style="color:#9B0409;  line-height: 35px; font-size:15px; font-family:\'Conv_Helvetica-BoldOblique_4\'; background: url(\'images/msg001_30.gif\') no-repeat scroll 0 4px rgba(0, 0, 0, 0)">' + msg + '</div>';
    popup += '<div style="padding:4px;"><a href="javascript:void(0);" style="background: none repeat scroll 0 0 #B41919; padding: 2px 6px 2px 6px; border-radius: 3px; text-decoration:none; font-size:12px; color:#FFF;" onclick="javascript:$.unblockUI();">OK</a></div>';
    popup += '</div>';

    $.blockUI({
    message: popup,
    width: 400,
    timeout: 2500
    });*/
    ShowMessage("divMessage", msg, true);

}
$(document).ready(function () {
    $(".required").blur(function () {
        if ($(this).val() != "" && $(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "", "border-radius": "", "background": "" });
        } else if ($(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
        } else if ($(this).attr("type") == "checkbox") {
            var chkName = $(this).attr("name");
            if ($('input:checkbox[name="' + chkName + '"]:checked').length > 0) {
                $('input:checkbox[name="' + chkName + '"]').css({ "border": "", "border-radius": "", "background": "" });
            } else {
                $('input:checkbox[name="' + chkName + '"]').css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
            }
        }
    });
    $(".email").blur(function () {
        if ($(this).val() != "" && $(this).val() != $(this).prop("defaultValue") && isEmail($(this).val())) {
            $(this).css({ "border": "", "border-radius": "", "background": "" });
        } else if ($(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
        }
    });
    $(".phoneNo").blur(function () {
        if ($(this).val() != "" && $(this).val() != $(this).prop("defaultValue") && IsPhoneNo($(this).val())) {
            $(this).css({ "border": "", "border-radius": "", "background": "" });
        } else if ($(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
        }
    });
    $(".date").blur(function () {
        if ($(this).val() != "" && $(this).val() != $(this).prop("defaultValue") && IsDate($(this).val())) {
            $(this).css({ "border": "", "border-radius": "", "background": "" });
        } else if ($(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
        }
    });
    $(".number").blur(function () {
        if ($(this).val() != "" && $(this).val() != $(this).prop("defaultValue") && isNumeric($(this).val())) {
            $(this).css({ "border": "", "border-radius": "", "background": "" });
        } else if ($(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
        }
    });
    $(".zip").blur(function () {
        if ($(this).val() != "" && $(this).val() != $(this).prop("defaultValue") && IsZipCode($(this).val())) {
            $(this).css({ "border": "", "border-radius": "", "background": "" });
        } else if ($(this).val() != $(this).prop("defaultValue")) {
            $(this).css({ "border": "1px solid #FF0000", "border-radius": "2px", "background": "none repeat scroll 0 0 #F77979" });
        }
    });
});

function isNumeric(num) {
    var pattern = new RegExp('^[0-9]+$');
    return pattern.test(num);
}

function isEmail(email) {
    var pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    return pattern.test(email);
}
function IsPhoneNo(phone) {
    var flag = false;

    var pattern = new RegExp(/^\d{3}-?\d{3}-?\d{4}$/g);
    if (flag == false && pattern.test(phone)) {
        flag = true;
    }
    pattern = new RegExp(/^\d{10}$/);
    if (flag == false && pattern.test(phone)) {
        flag = true;
    }
    var phoneNo = phone.replace(/\D/g, '');
    if (phoneNo.length < 10) {
        return false;
    }
    return flag;
}
function IsDate(datestr) {
   
    var pattern = new RegExp("^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$");
    return pattern.test(datestr);
}
function IsZipCode(zip) {
    var pattern = new RegExp("^([0-9]{5})(?:[-\s]*([0-9]{4}))?$");
    return pattern.test(zip);
}

//////////////////////////////////////////////////////////////////
/// Validation Classes: required, email, phoneNo, date, number, zip
///
///////////////////////////////////
function validateDT(tr, divObj) {
    if (tr.find('div[id^=' + divObj + '] input').length > 0) {
        tr.find('div[id^=' + divObj + '] input').each(function () {
            if ($(this).attr("type") == "radio") {
                return validateRadioButtons($(this).attr("name"));
            } else if ($(this).attr("type") == "text") {
                validateTextBox($(this).attr("id"));
            }
        });
    }
    else {
        isValid = true;
    }
    return isValid;
}
function validateSection(divObj) {
    $("#" + divObj + " input").each(function () {
        if ($(this).attr("type") == "radio") {
            return validateRadioButtons($(this).attr("name"));
        } else if ($(this).attr("type") == "text") {
            validateTextBox($(this).attr("id"));
        }
    });
    $("#" + divObj + " textarea").each(function () {
           validateTextBox($(this).attr("id"));
     });
    return isValid;
}
function validateRadioButtons(rdoName) {
    if ($('input:radio[name="' + rdoName + '"]:checked').length > 0) {
        return true;
    } else {
        return false;
    }
}

var isValid = false;
function validateTextBox(txtID) {
    isValid = true;
     var msg = "";
    var txtcls = $("#" + txtID).attr("class");
    if (typeof (txtcls) != 'undefined' && txtcls != "") {
        var clsarray = txtcls.split(" ");
        for (var i = 0; i < clsarray.length; i++) {
            if (clsarray[i] == "required" && ($("#" + txtID).val() == "" || ($("#" + txtID).val() == $("#" + txtID).prop("defaultValue") && clsarray[i] == "date"))) {
                msg = "This field is required.";
                isValid = false;
                break;
            } else if (clsarray[i] == "email" && !isEmail($("#" + txtID).val())) {
                msg = "Please enter a valid email address.";
                isValid = false;
                break;
            } else if (clsarray[i] == "phoneNo" && !IsPhoneNo($("#" + txtID).val())) {
                msg = "Please enter a valid phone no.";
                isValid = false;
                break;
            } else if (clsarray[i] == "date" && !IsDate($("#" + txtID).val())) {
                msg = "Please enter a valid date.";
                isValid = false;
                break;
            } else if (clsarray[i] == "number" && !isNumeric($("#" + txtID).val())) {
                msg = "Please enter a valid digits.";
                isValid = false;
                break;
            } else if (clsarray[i] == "zip" && !IsZipCode($("#" + txtID).val())) {
                msg = "Please enter a valid zip code.";
                isValid = false;
                break;
            }
        }
        if (isValid == false) {
            $("#" + txtID).css("border", "1px solid #FF0000");
        } else {
            $("#" + txtID).css({ "border": "", "border-radius": "", "background": "" });
        }
    }
    return isValid;
}

function validateData() {

    return true;
}

