using Microsoft.EntityFrameworkCore;

namespace ToanLV_Code_AngularJS.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
    }
}
