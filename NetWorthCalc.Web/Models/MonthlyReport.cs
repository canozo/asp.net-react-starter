using System;
using System.Collections.Generic;

namespace NetWorthCalc.Web.Models
{
    public class MonthlyReport
    {
        public MonthlyReport()
        {
            MonthlyReportId = new Guid();
            CreatedOn = DateTime.Now;
        }

        public Guid MonthlyReportId { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public string UserId { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public List<Asset> Assets { get; set; }

        public List<Liability> Liabilities { get; set; }
    }
}
