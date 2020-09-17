using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetWorthCalc.Web.Models.ModelConfigurations
{
    public class AssetConfiguration : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.HasKey(prop => prop.AssetId);

            builder.Property(prop => prop.CreatedOn)
                .HasColumnType("TIMESTAMP(0)")
                .IsRequired();

            builder.Property(prop => prop.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(prop => prop.Amount)
                .IsRequired();

            builder.Property(prop => prop.MonthlyReportId)
                .IsRequired();
        }
    }
}
