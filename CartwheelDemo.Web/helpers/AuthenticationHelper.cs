using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartwheelDemo.Web.helpers
{
    public class AuthenticationHelper
    {
        public static string GenerateAuthToken()
        {
            string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

            return token;
        }
    }
}
