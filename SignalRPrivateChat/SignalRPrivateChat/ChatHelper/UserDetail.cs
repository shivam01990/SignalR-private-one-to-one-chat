using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRPrivateChat.ChatHelper
{
    public class UserDetail
    {
        public string ConnectionId { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
    }
}