using System;
using System.Collections.Generic;

namespace NetWorthCalc.Web.Models
{
    public class MonthlyReport
    {
        public MonthlyReport(string userId, int month, int year)
        {
            MonthlyReportId = new Guid();
            CreatedOn = DateTime.Now;
            UserId = userId;
            Month = month;
            Year = year;
            FullDate = new DateTime(year, month, 0);
            Assets = new List<Asset>();
            Liabilities = new List<Liability>();
        }

        public Guid MonthlyReportId { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public string UserId { get; private set; }

        public int Month { get; private set; }

        public int Year { get; private set; }

        public DateTime FullDate { get; private set; }

        public List<Asset> Assets { get; set; }

        public List<Liability> Liabilities { get; set; }
    }
}
