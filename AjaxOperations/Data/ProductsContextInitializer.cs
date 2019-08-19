using AjaxOperations.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AjaxOperations.Data
{
    public class ProductsContextInitializer : CreateDatabaseIfNotExists<ProductsContext>
    {
        protected override void Seed(ProductsContext db)
        {
            Category category = new Category { Id = 1, Name = "Хлебобулочные изделия" };
            Category category1 = new Category { Id = 2, Name = "Молочные изделия" };
            db.Categories.Add(category);
            db.Categories.Add(category1);
            Product product = new Product { Id = 1, Name = "Хлеб", CategoryId = 1, Price = 80 };
            Product product1 = new Product { Id = 2, Name = "Булочка с маком", CategoryId = 1, Price = 120 };
            Product product2 = new Product { Id = 3, Name = "Молоко", CategoryId = 2, Price = 220 };
            Product product3 = new Product { Id = 4, Name = "Сметана", CategoryId = 2, Price = 310 };
            db.Products.Add(product);
            db.Products.Add(product1);
            db.Products.Add(product2);
            db.Products.Add(product3);
            db.SaveChanges();
        }
    }
}