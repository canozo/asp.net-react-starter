using System;

namespace NetWorthCalc.Web.Models
{
    public class Asset
    {
        public Asset()
        {
            AssetId = new Guid();
            CreatedOn = DateTime.Now;
        }

        public Guid AssetId { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public string Name { get; set; }

        public double Amount { get; set; }

        public Guid MonthlyReportId { get; set; }

        public MonthlyReport MonthlyReport { get; set; }
    }
}
