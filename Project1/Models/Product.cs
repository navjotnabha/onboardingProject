using System;
using System.Collections.Generic;

namespace Project1.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public virtual ICollection<Sale> Sales { get; } = new List<Sale>();
}
