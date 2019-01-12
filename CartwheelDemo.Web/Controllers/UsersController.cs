using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CartwheelDemo.Web;
using CartwheelDemo.Web.helpers;

namespace CartwheelDemo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly cartwheel_dbContext _context;

        public UsersController(cartwheel_dbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Users> GetAllUsers()
        {
            IEnumerable<Users> result = null;

            //var authHeader = GetAuthToken();
            //if (authHeader == null || authHeader.Length == 0)
            //{
            //    result = null;
            //}

            string token = GetAuthToken();// $"Basic {authHeader[0]}";

            // check if token is valid
            if (IsTokenValid(token).Result)
            {
                result = _context.Users;
            }

            return result;
        }

        private string GetAuthToken()
        {
            string authToken = null;
            var authHeader = Request.Headers.GetCommaSeparatedValues("Authorization");

            if (authHeader != null && authHeader.Length > 0)
            {
                authToken = authHeader[0].Replace("Basic ","");
            }

            return authToken;
        }

        // GET: api/Users
        //[HttpPost("[action]")]
        //public IEnumerable<Users> GetUsers()
        //{
        //    string token = GetAuthToken();// $"Basic {authHeader[0]}";

        //    // check if token is valid
        //    if (IsTokenValid(token).Result)
        //    {
        //        return _context.Users;
        //    }


        //    return null;
        //}

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsers([FromQuery] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers([FromRoute] int id, [FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // create a new user and only map what we want from the post data
            var newUser = new Users();

            newUser.CompanyName = users.CompanyName;
            newUser.Email = users.Email;
            newUser.DateCreated = DateTime.Now;
            newUser.FirstName = users.FirstName;
            newUser.LastName = users.LastName;
            newUser.Password = users.Password;
            newUser.LastLogin = DateTime.Now;

            _context.Users.Add(newUser);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                var trace = e.StackTrace;
            }

            //return CreatedAtAction("Register", new { id = newUser.Id }, newUser);
            return await LogInUser(newUser);
        }

        [HttpPost("[action]")]
        public async Task<bool> IsUserAuthenticated([FromBody] string token)
        {
            var tokenIsValid = await IsTokenValid(token);
            if (tokenIsValid)
            {
                return true;
            }

            return false;
        }

        private async Task<bool> IsTokenValid(string token)
        {
            bool tokenIsValid = false;

            if (!string.IsNullOrWhiteSpace(token))
            {
                var ia = await _context.Isauthenticated.FirstOrDefaultAsync(
                    iauth => iauth.AuthToken.Equals(token));

                // if the auth expiry date is greater than the current date
                if(ia != null &&
                    ia.AuthTokenExpiryDate.CompareTo(DateTime.Now) > 0)
                {
                    tokenIsValid = true;
                }
            }

            return tokenIsValid;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] Users users)
        {
            if (users == null || users.Email == null || users.Password == null)
            {
                return BadRequest(ModelState);
            }

            return await LogInUser(users);
        }

        private async Task<IActionResult> LogInUser(Users user)
        {
            bool loginSuccessful = false;
            string authToken = null;

            if (user != null && 
                !string.IsNullOrWhiteSpace(user.Email) &&
                !string.IsNullOrWhiteSpace(user.Password))
            {
                var dbUser = 
                    await _context.Users.FirstOrDefaultAsync(
                        u => u.Email.ToLower().Equals(user.Email.ToLower()) &&
                            u.Password.ToLower().Equals(user.Password.ToLower()));

                if(dbUser != null)
                {
                    //set their last login date to now
                    dbUser.LastLogin = DateTime.Now;
                    //_context.Entry(dbUser).State = EntityState.Modified;

                    // Great, the credentials were good.
                    // now log in the user
                    Isauthenticated ia = new Isauthenticated();
                    ia.AuthToken = AuthenticationHelper.GenerateAuthToken();
                    ia.AuthTokenExpiryDate = DateTime.Now.AddDays(1);
                    ia.UserId = dbUser.Id;
                    ia.LoginTime = DateTime.Now;

                    await _context.Isauthenticated.AddAsync(ia);
                    await _context.SaveChangesAsync();
                    //_context.Isauthenticated

                    authToken = ia.AuthToken;
                    loginSuccessful = true;
                }
            }


            return CreatedAtAction("LogInUser", new { authData = authToken, loginResult = loginSuccessful }); ;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return Ok(users);
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}