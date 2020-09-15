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
            Id = new Guid();
            CreatedOn = DateTime.Now;
        }

        public Guid Id { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public Guid UserId { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }
    }
}
