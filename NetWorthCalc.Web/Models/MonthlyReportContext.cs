using Microsoft.EntityFrameworkCore;
using NetWorthCalc.Web.Models.ModelConfigurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetWorthCalc.Web.Models
{
    public class MonthlyReportContext : DbContext
    {
        public DbSet<MonthlyReport> MonthlyReports { get; set; }

        public MonthlyReportContext(DbContextOptions<MonthlyReportContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) =>
            modelBuilder.ApplyConfiguration(new MonthlyReportConfiguration());
    }
}
