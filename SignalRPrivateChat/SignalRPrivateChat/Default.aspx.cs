using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SignalRPrivateChat
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            Session["UserName"] = ddlUsers.SelectedItem.Text;
            Session["UserId"] = ddlUsers.SelectedValue;
            Response.Redirect("~/StartChat.aspx");
        }
    }
}