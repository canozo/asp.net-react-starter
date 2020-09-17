using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetWorthCalc.Web.Models.ModelConfigurations
{
    public class LiabilityConfiguration : IEntityTypeConfiguration<Liability>
    {
        public void Configure(EntityTypeBuilder<Liability> builder)
        {
            builder.HasKey(prop => prop.LiabilityId);

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
