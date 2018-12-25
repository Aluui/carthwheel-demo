using System;
using System.Collections.Generic;

namespace CartwheelDemo.Web
{
    public partial class Isauthenticated
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime LoginTime { get; set; }
        public string AuthToken { get; set; }
        public DateTime AuthTokenExpiryDate { get; set; }

        public Users User { get; set; }
    }
}
