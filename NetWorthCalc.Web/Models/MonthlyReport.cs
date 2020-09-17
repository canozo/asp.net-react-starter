using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
