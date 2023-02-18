using System;
using System.Collections.Generic;

namespace Project1.Models;

public partial class Store
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Sale> Sales { get; } = new List<Sale>();
}
