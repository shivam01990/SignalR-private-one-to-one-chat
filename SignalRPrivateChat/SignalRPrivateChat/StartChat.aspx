<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StartChat.aspx.cs" Inherits="SignalRPrivateChat.StartChat" %>

<%@ Register Src="~/controls/ctlChatBox.ascx" TagName="ctlChatBox" TagPrefix="uc1" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Private Chat App</title>
    <script type="text/javascript">
        var srp = '<%=Page.ResolveUrl("~") %>';
    </script>
    <link href="<%=Page.ResolveUrl("~") %>Styles/bootstrap.css" rel="stylesheet" />
    <link href="<%=Page.ResolveUrl("~") %>Styles/jquery.ui.chatbox.css" rel="stylesheet" />
    <link href="<%=Page.ResolveUrl("~") %>Styles/style.css" rel="stylesheet" />        
    <link href="<%=Page.ResolveUrl("~") %>fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=Page.ResolveUrl("~") %>Scripts/jquery/jquery-ui/jquery-ui.css" rel="stylesheet" />
    <script src="<%=Page.ResolveUrl("~") %>Scripts/jquery.js"></script>    
    <script src="<%=Page.ResolveUrl("~") %>Scripts/jquery/jquery-ui/jquery-ui.js" type="text/javascript"></script>
    <script src="<%=Page.ResolveUrl("~") %>Scripts/bootstrap.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
        <uc1:ctlChatBox ID="ctlChatBox1" runat="server" />
    </form>
</body>
</html>
