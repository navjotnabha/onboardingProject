using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleController : Controller
    {
        [HttpGet]
        [Route("GetSales")]
        public IActionResult GetSales()
        {
            NavbaseContext db = new NavbaseContext();
           // List<Sale> saleList = db.Sales.ToList();

            var saleList = db.Sales
      .Include(s => s.Product) // Include the product object to be able to access its properties
      .Select(s => new { s.Id, s.CustomerId, s.StoreId, s.DateSold, ProductName = s.Product.Name, 
                        CustomerName=s.Customer.Name, StoreName=s.Store.Name,
           ProdId =s.Product.Id,
          CustId=s.Customer.Id,
          StoId=s.Store.Id
           
               
      })
      .ToList();
            return StatusCode(StatusCodes.Status200OK, saleList);

        }

        [HttpPost]
        public IActionResult Add(Sale s)
        {

            NavbaseContext db = new NavbaseContext();
            db.Sales.Add(s);
            db.SaveChanges();
            return (RedirectToAction("getSales"));

        }

        [HttpDelete]
        [Route("DeleteSale")]
        public IActionResult DeleteSale(int? id)
        {

            NavbaseContext db = new NavbaseContext();
            Sale? existingSale = db.Sales.Where(temp => temp.Id == id).FirstOrDefault();

            if (existingSale != null)
            {

                db.Sales.Remove(existingSale);
                db.SaveChanges();
            }


            return (RedirectToAction("getSales"));

        }

    }
}
