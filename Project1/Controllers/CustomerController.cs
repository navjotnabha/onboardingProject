using Microsoft.AspNetCore.Mvc;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        [HttpGet]
        [Route("GetCustomers")]
        public IActionResult GetCustomers()
        {
            NavbaseContext db = new NavbaseContext();
            List<Customer> customerList = db.Customers.ToList();


            return StatusCode(StatusCodes.Status200OK, customerList);
        }
//Add/////////////////////////
        [HttpPost]
        public IActionResult Add(Customer c)
        {

            NavbaseContext db = new NavbaseContext();
            db.Customers.Add(c);
            db.SaveChanges();
            return (RedirectToAction("getCustomers"));

        }

        //delete///////////////////////
        [HttpDelete]
        [Route("DeleteCustomer")]
        public IActionResult DeleteCustomer(int? id)
        {

            NavbaseContext db = new NavbaseContext();
            Customer? existingCustomer = db.Customers.Where(temp => temp.Id == id).FirstOrDefault();

            if (existingCustomer != null)
            {

                db.Customers.Remove( existingCustomer);
                db.SaveChanges();
            }


            return (RedirectToAction("getCustomers"));

        }
    }

}
