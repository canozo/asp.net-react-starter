using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetWorthCalc.Web.Models.ModelConfigurations
{
    public class MonthlyReportConfiguration : IEntityTypeConfiguration<MonthlyReport>
    {
        public void Configure(EntityTypeBuilder<MonthlyReport> builder)
        {
            builder.HasKey(prop => prop.MonthlyReportId);

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
