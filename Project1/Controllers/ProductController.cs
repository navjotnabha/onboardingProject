using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        [HttpGet]
        [Route("GetProducts")]
        public IActionResult GetProducts()
        {
            NavbaseContext db = new NavbaseContext();

            List<Product> prodList = db.Products.ToList();

            return StatusCode(StatusCodes.Status200OK, prodList);

        }

        [HttpPost]
        public IActionResult Add(Product p)
        {

            NavbaseContext db = new NavbaseContext();
            db.Products.Add(p);
            db.SaveChanges();
            return (RedirectToAction("getProducts"));

        }


        [HttpDelete]
        [Route("DeleteProduct")]
        public IActionResult DeleteProduct(int ? id)
        {

            NavbaseContext db = new NavbaseContext();
            Product ? existingProduct = db.Products.Where(temp => temp.Id == id).FirstOrDefault();    
            
                if(existingProduct != null) {
                
                db.Products.Remove(existingProduct);
                db.SaveChanges(); }
                 
                     
            return (RedirectToAction("getProducts"));

        }
    }
}
