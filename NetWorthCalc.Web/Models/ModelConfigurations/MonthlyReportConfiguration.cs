using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetWorthCalc.Web.Models.ModelConfigurations
{
    public class MonthlyReportConfiguration : IEntityTypeConfiguration<MonthlyReport>
    {
        public void Configure(EntityTypeBuilder<MonthlyReport> builder)
        {
            builder.HasKey(prop => prop.Id);

            builder.Property(prop => prop.CreatedOn)
                .HasColumnType("TIMESTAMP(0)")
                .IsRequired();

            builder.Property(prop => prop.UserId)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(prop => prop.Month)
                .IsRequired();

            builder.Property(prop => prop.Year)
                .IsRequired();
        }
    }
}
