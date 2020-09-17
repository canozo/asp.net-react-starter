using System.Collections;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetWorthCalc.Web.Models;

namespace NetWorthCalc.Web.Controllers
{
    [Authorize]
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

        [HttpGet]
        public IEnumerable Get()
        {
            string UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _context.MonthlyReports.Where(mr => mr.UserId == UserId);
        }

        // Creates a new
        [HttpPost]
        public IActionResult Post(MonthlyReportParameters body)
        {
            string UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var exists = _context.MonthlyReports.Where(mr => mr.UserId == UserId && mr.Month == body.Month && mr.Year == body.Year);
            if (exists.Any())
            {
                Ok(exists.First());
            }

            var monthlyReport = new MonthlyReport(UserId, body.Month, body.Year);

            _context.Add(monthlyReport);
            _context.SaveChanges();

            return Ok(monthlyReport);
        }

        public class MonthlyReportParameters
        {
            public int Month { get; set; }

            public int Year { get; set; }
        }
    }
}
