
var chatHub = $.connection.chatHub;
$(document).ready(function () {
    $('<audio id="chatAudio"><source src="' + srp + 'images/notify.ogg" type="audio/ogg"><source src="' + srp + 'images/notify.mp3" type="audio/mpeg"><source src="' + srp + 'images/notify.wav" type="audio/wav"></audio>').appendTo('body');
    // Declare a proxy to reference the hub. 
    var chatHub = $.connection.chatHub;
    registerClientMethods(chatHub);
    // Start Hub
    $.connection.hub.start().done(function () {
        registerEvents(chatHub);
    });

    $("#chat_min_button").click(function () {
        if ($(this).html() == "<i class=\"fa fa-minus-square\"></i>") {
            $(this).html("<i class=\"fa fa-plus-square\"></i>");
        }
        else {
            $(this).html("<i class=\"fa fa-minus-square\"></i>");
        }
        $("#chat_box").slideToggle();
    });

    setInterval(ResetTypingFlag, 6000);
});


function registerEvents(chatHub) {
    var UserName = $("[id$=hdnCurrentUserName]").val();
    var UserID = parseInt($("[id$=hdnCurrentUserID]").val());
    chatHub.server.connect(UserName, UserID);
}

function registerClientMethods(chatHub) {
    // Calls when user successfully logged in
    chatHub.client.onConnected = function (id, userName, allUsers, messages, userid) {
        $('#hdId').val(id);
        $('#hdUserName').val(userName);

        // Add All Users
        for (i = 0; i < allUsers.length; i++) {
            //AddUser(chatHub, allUsers[i].ConnectionId, allUsers[i].UserName, userid);
            AddUser(chatHub, allUsers[i].UserID, allUsers[i].UserName, userid);
        }

        // Add Existing Messages
        for (i = 0; i < messages.length; i++) {
            AddMessage(messages[i].UserName, messages[i].Message);
        }

    }
}

// On New User Connected
chatHub.client.onNewUserConnected = function (id, name, userid) {
    AddUser(chatHub, id, name, userid);
}

// On User Disconnected
chatHub.client.onUserDisconnected = function (id, userName) {
    $('#' + id).remove();

    //var ctrId = 'private_' + id;
    //$('#' + ctrId).remove();
}

chatHub.client.messageReceived = function (userName, message) {
    AddMessage(userName, message);
}


chatHub.client.sendPrivateMessage = function (windowId, fromUserName, chatTitle, message) {
    var ctrId = 'private_' + windowId;
    if ($('#' + ctrId).length == 0) {
        createPrivateChatWindow(chatHub, windowId, ctrId, fromUserName, chatTitle);
        $('#chatAudio')[0].play();
    }
    else {
        var rType = CheckHiddenWindow();
        if ($('#' + ctrId).parent().css('display') == "none") {
            $('#' + ctrId).parent().parent().effect("shake", { times: 2 }, 1000);
            rType = true;
        }
        if (rType == true) {
            $('#chatAudio')[0].play();
        }
    }
    $('#' + ctrId).chatbox("option", "boxManager").addMsg(fromUserName, message);
    $('#typing_' + windowId).hide();
}

chatHub.client.GetLastMessages = function (TouserID, CurrentChatMessages) {
    //debugger;
    var ctrId = 'private_' + TouserID;
    var AllmsgHtml = "";
    for (i = 0; i < CurrentChatMessages.length; i++) {
        AllmsgHtml += "<div style=\"display: block; max-width: 200px;\" class=\"ui-chatbox-msg\">";
        if (i == CurrentChatMessages.length - 1) {
            if ($('#' + ctrId).children().last().html() != "<b>" + CurrentChatMessages[i].FromUserName + ": </b><span>" + CurrentChatMessages[i].Message + "</span>") {
                AllmsgHtml += "<b>" + CurrentChatMessages[i].FromUserName + ": </b><span>" + CurrentChatMessages[i].Message + "</span>";
            }
        }
        else {
            AllmsgHtml += "<b>" + CurrentChatMessages[i].FromUserName + ": </b><span>" + CurrentChatMessages[i].Message + "</span>";
        }
        AllmsgHtml += "</div>";
    }
    $('#' + ctrId).prepend(AllmsgHtml);
}

function CheckHiddenWindow() {
    var hidden, state;

    if (typeof document.hidden !== "undefined") {
        state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
        state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
        state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
        state = "webkitVisibilityState";
    }

    if (document[state] == "hidden")
        return true;
    else
        return false;

}

function AddUser(chatHub, id, name, userid) {
    var currentuserid = parseInt($("[id$=hdnCurrentUserID]").val());
    var connectionid = $('#hdId').val();
    var code = "";
    if (connectionid == "") {
        if (userid == currentuserid) {
            $('#hdId').val(id);
            connectionid = id;
            $('#hdUserName').val(name);
        }
    }
    if (connectionid != id) {
        if ($('#' + id).length == 0) {
            code = $('<a id="' + id + '" class="col-sm-12 bg-success" > <i class=\"fa fa-user\"></i> ' + name + '<a>');
            $(code).dblclick(function () {
                var id = $(this).attr('id');
                if (connectionid != id) {
                    OpenPrivateChatWindow(chatHub, id, name);
                }
            });
        }
    }
    else {
        if ($('#curruser_' + id).length == 0) {
            code = $('<div id="curruser_' + id + '" class="col-sm-12 bg-info"  ><i class=\"fa fa-user\"></i> ' + name + '<div>');

        }
    }
    $("#chat_box").append(code);
}

function OpenPrivateChatWindow(chatHub, id, userName) {
    var ctrId = 'private_' + id;
    if ($('#' + ctrId).length > 0) return;
    createPrivateChatWindow(chatHub, id, ctrId, userName, userName);
}

function createPrivateChatWindow(chatHub, userId, ctrId, userName, chatTitle) {
    $("#chat_div").append("<div id=\"" + ctrId + "\"></div>")
    showList.push(ctrId);
    $('#' + ctrId).chatbox({
        id: ctrId,
        title: chatTitle,
        user: userName,
        offset: getNextOffset(),
        width: 200,
        messageSent: function (id, user, msg) {
            chatHub.server.sendPrivateMessage(userId, msg);
            TypingFlag = true;
        },
        boxClosed: function (removeid) {
            $('#' + removeid).remove();
            var idx = showList.indexOf(removeid);
            if (idx != -1) {
                showList.splice(idx, 1);
                diff = config.width + config.gap;
                for (var i = idx; i < showList.length; i++) {
                    offset = $("#" + showList[i]).chatbox("option", "offset");
                    $("#" + showList[i]).chatbox("option", "offset", offset - diff);
                }
            }
        }

    });
    $('#' + ctrId).siblings().css("position", "relative");
    $('#' + ctrId).siblings().append("<div id=\"typing_" + userId + "\" style=\"width:20px; height:20px; display:none; position:absolute; right:14px; top:8px\"><img height=\"20\" src=\"" + srp + "images/pencil.gif\" /></div>");
    $('#' + ctrId).siblings().find('textarea').on('input', function (e) {
        if (TypingFlag == true) {
            chatHub.server.sendUserTypingRequest(userId);
        }
        TypingFlag = false;
    });

    var FromUserID = parseInt($("[id$=hdnCurrentUserID]").val());
    var ToUserID = userId;
    chatHub.server.requestLastMessage(FromUserID, ToUserID);
}

chatHub.client.ReceiveTypingRequest = function (userId) {
    var ctrId = 'private_' + userId;
    if ($('#' + ctrId).length > 0) {
        jQuery('#typing_' + userId).show();
        jQuery('#typing_' + userId).delay(6000).fadeOut("slow");
    }
}

// list of boxes shown on the page
var showList = new Array();
var config = {
    width: 200, //px
    gap: 20,
    maxBoxes: 5
};

var getNextOffset = function () {
    return (config.width + config.gap) * showList.length;
};

var TypingFlag = true;

function ResetTypingFlag() {
    TypingFlag = true;
}

function AddMessage(userName, message) {
    //$('#divChatWindow').append('<div class="message"><span class="userName">' + userName + '</span>: ' + message + '</div>');
    //var height = $('#divChatWindow')[0].scrollHeight;
    //$('#divChatWindow').scrollTop(height);
}