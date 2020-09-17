using System;

namespace NetWorthCalc.Web.Models
{
    public class Liability
    {
        public Liability()
        {
            LiabilityId = new Guid();
            CreatedOn = DateTime.Now;
        }

        public Guid LiabilityId { get; set; }

        public DateTime CreatedOn { get; private set; }

        public string Name { get; set; }

        public double Amount { get; set; }

        public Guid MonthlyReportId { get; set; }

        public MonthlyReport MonthlyReport { get; set; }
    }
}
