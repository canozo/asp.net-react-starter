using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetWorthCalc.Web.Models;

namespace NetWorthCalc.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonthlyReportController : ControllerBase
    {
        private readonly NetWorthContext _context;
        private readonly ILogger<MonthlyReportController> _logger;

        public MonthlyReportController(ILogger<MonthlyReportController> logger, NetWorthContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public IActionResult Post(MonthlyReportParameters body)
        {
            if (_context.MonthlyReports.Where(mr => mr.UserId == body.UserId && mr.Month == body.Month && mr.Year == body.Year).Any())
            {
                Ok("A report for this month already exists!");
            }

            var monthlyReport = new MonthlyReport
            {
                UserId = body.UserId,
                Month = body.Month,
                Year = body.Year,
            };

            _context.Add(monthlyReport);
            _context.SaveChanges();

            return Ok(monthlyReport);
        }

        public class MonthlyReportParameters
        {
            public string UserId { get; set; }

            public int Month { get; set; }

            public int Year { get; set; }
        }
    }
}
