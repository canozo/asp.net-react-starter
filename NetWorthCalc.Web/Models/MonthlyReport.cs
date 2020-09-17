using System;
using System.Collections.Generic;

namespace NetWorthCalc.Web.Models
{
    public class MonthlyReport
    {
        public MonthlyReport(string UserId, int Month, int Year)
        {
            MonthlyReportId = new Guid();
            CreatedOn = DateTime.Now;
            this.UserId = UserId;
            this.Month = Month;
            this.Year = Year;
        }

        public Guid MonthlyReportId { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public string UserId { get; private set; }

        public int Month { get; private set; }

        public int Year { get; private set; }

        public List<Asset> Assets { get; set; }

        public List<Liability> Liabilities { get; set; }
    }
}
