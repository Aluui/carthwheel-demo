using System;
using System.Collections.Generic;

namespace CartwheelDemo.Web
{
    public partial class Users
    {
        public Users()
        {
            Isauthenticated = new HashSet<Isauthenticated>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? LastLogin { get; set; }

        public ICollection<Isauthenticated> Isauthenticated { get; set; }
    }
}
