﻿using Microsoft.EntityFrameworkCore;
using NetWorthCalc.Web.Models.ModelConfigurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetWorthCalc.Web.Models
{
    public class NetWorthContext : DbContext
    {
        public DbSet<MonthlyReport> MonthlyReports { get; set; }

        public NetWorthContext(DbContextOptions<NetWorthContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) =>
            modelBuilder.ApplyConfiguration(new MonthlyReportConfiguration());
    }
}