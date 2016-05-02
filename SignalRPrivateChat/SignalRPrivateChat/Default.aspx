<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRPrivateChat.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Private Chat App</title>
    
    <link href="<%=Page.ResolveUrl("~") %>Styles/bootstrap.css" rel="stylesheet" />
    <link href="<%=Page.ResolveUrl("~") %>Styles/style.css" rel="stylesheet" />
    <script src="<%=Page.ResolveUrl("~") %>Scripts/jquery.js"></script>
    <script src="<%=Page.ResolveUrl("~") %>Scripts/bootstrap.min.js"></script>
    
   
</head>
<body>
    <form id="form1" runat="server">

        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="login-panel panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Please Sign In</h3>
                        </div>
                        <div class="panel-body">
                            <div role="form">
                                <fieldset>
                                    <div class="form-group">
                                        <asp:Label ID="lblMsg" ForeColor="Red" runat="server"></asp:Label>
                                    </div>
                                    <div class="form-group">
                                        <asp:DropDownList ID="ddlUsers" CssClass="form-control" runat="server">
                                            <asp:ListItem Value="0">Please Select</asp:ListItem>
                                            <asp:ListItem Value="1">Shivam</asp:ListItem>
                                            <asp:ListItem Value="1">Steeve</asp:ListItem>
                                            <asp:ListItem Value="2">Edward</asp:ListItem>
                                            <asp:ListItem Value="4">Richard</asp:ListItem>
                                            <asp:ListItem Value="5">Phill</asp:ListItem>
                                            <asp:ListItem Value="6">Rayan</asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" ValidationGroup="valgrp" ControlToValidate="ddlUsers" InitialValue="0" runat="server" ForeColor="Red" Display="Dynamic" ErrorMessage="Please Select User."></asp:RequiredFieldValidator>
                                    </div>
                                    <!-- Change this to a button or input when using this as a form -->
                                    <asp:Button ID="btnLogin" CssClass="btn btn-lg btn-success btn-block" ValidationGroup="valgrp" Text="Login" runat="server" OnClick="btnLogin_Click" />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
