namespace AjaxOperations.Data
{
    using AjaxOperations.Models;
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class ProductsContext : DbContext
    {
        public ProductsContext()
            : base("name=ProductsContext")
        {
            Database.SetInitializer<ProductsContext>(new ProductsContextInitializer());
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
    }
}