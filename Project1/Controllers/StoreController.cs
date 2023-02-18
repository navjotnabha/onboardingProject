using Microsoft.AspNetCore.Mvc;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        [HttpGet]
        [Route("GetStores")]

        public IActionResult GetStores()
        {
            NavbaseContext db = new NavbaseContext();
            List<Store> storeList = db.Stores.ToList();


            return StatusCode(StatusCodes.Status200OK, storeList);
        }

        //Add/////////////////////////
        [HttpPost]
        public IActionResult Add(Store c)
        {

            NavbaseContext db = new NavbaseContext();
            db.Stores.Add(c);
            db.SaveChanges();
            return (RedirectToAction("getStores"));

        }

        //delete///////////////////////
        [HttpDelete]
        [Route("DeleteStore")]
        public IActionResult DeleteStore(int? id)
        {

            NavbaseContext db = new NavbaseContext();
            Store? existingStore = db.Stores.Where(temp => temp.Id == id).FirstOrDefault();

            if (existingStore != null)
            {   
                db.Stores.Remove(existingStore);
                db.SaveChanges();
            }


            return (RedirectToAction("getStores"));

        }

    }
}
