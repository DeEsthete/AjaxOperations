using AjaxOperations.Data;
using AjaxOperations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AjaxOperations.Controllers
{
    public class ApiProductsController : ApiController
    {
        [RoutePrefix("api/products")]
        public class ApiProductController : ApiController
        {
            private ProductsContext db = new ProductsContext();

            [Route("{id}")]
            [HttpGet]
            public IHttpActionResult GetProducts(int id)
            {
                if (id == 0)
                {
                    return Json(db.Products.ToList());
                }
                else
                {
                    Category category = db.Categories.FirstOrDefault(c => c.Id == id);
                    if (category != null)
                    {
                        return Json(db.Products.Where(p => p.CategoryId == id));
                    }
                }
                return null;
            }

            [Route("categories")]
            [HttpGet]
            public IHttpActionResult GetCategories()
            {
                return Json(db.Categories.ToList());
            }

            [Route("product/{id}")]
            [HttpGet]
            public IHttpActionResult GetProduct(int id)
            {
                Product product = db.Products.FirstOrDefault(p => p.Id == id);
                return Json(product);
            }

            [Route("editItem")]
            [HttpPost]
            public IHttpActionResult EditProduct(Product product)
            {
                Product result = db.Products.FirstOrDefault(p => p.Id == product.Id);
                result.Name = product.Name;
                result.CategoryId = product.CategoryId;
                result.Price = product.Price;
                db.SaveChanges();
                return Ok();
            }

            [Route("addItem")]
            [HttpPost]
            public IHttpActionResult AddProduct(Product product)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return Ok();
            }

            [Route("removeItem/{id}")]
            [HttpDelete]
            public IHttpActionResult RemoveProduct(int id)
            {
                Product product = db.Products.FirstOrDefault(p => p.Id == id);
                if (product != null)
                {
                    db.Products.Remove(product);
                    db.SaveChanges();
                    return Ok();
                }
                return BadRequest();
            }
        }
    }
}
