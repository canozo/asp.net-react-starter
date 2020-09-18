using System;
using System.Collections;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public IEnumerable GetList()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return _context.MonthlyReports.Where(mr => mr.UserId == userId).Select(mr => new
            {
                mr.MonthlyReportId,
                mr.CreatedOn,
                mr.FullDate,
                mr.Month,
                mr.Year
            }).OrderByDescending(mr => mr.FullDate);
        }

        [HttpGet("{id}")]
        public IActionResult GetOne(Guid id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var monthlyReport = _context.MonthlyReports
                .Include(mr => mr.Liabilities)
                .Include(mr => mr.Assets)
                .Where(mr => mr.MonthlyReportId == id)
                .FirstOrDefault();

            if (monthlyReport == null)
            {
                return NotFound("This report doesn't exist.");
            }

            if (monthlyReport.UserId != userId)
            {
                return Unauthorized("This report doesn't belong to you.");
            }

            return Ok(monthlyReport);
        }

        [HttpPost]
        public IActionResult Post(MonthlyReportParameters body)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var exists = _context.MonthlyReports.Where(mr => mr.UserId == userId && mr.Month == body.Month && mr.Year == body.Year);
            if (exists.Any())
            {
                return Ok(exists.First());
            }

            try
            {
                var monthlyReport = new MonthlyReport(userId, body.Month, body.Year);

                _context.Add(monthlyReport);
                _context.SaveChanges();

                return Ok(monthlyReport);
            }
            catch (Exception)
            {
                return StatusCode(415, "Fields missing or not valid: 'Month' (1-12), 'Year' (1-9999)");
            }
        }

        public class MonthlyReportParameters
        {
            public int Month { get; set; }

            public int Year { get; set; }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var monthlyReport = _context.MonthlyReports.Find(id);

            if (monthlyReport == null)
            {
                return NotFound("This report doesn't exist.");
            }

            if (monthlyReport.UserId != userId)
            {
                return Unauthorized("This report doesn't belong to you.");
            }

            _context.MonthlyReports.Remove(monthlyReport);
            _context.SaveChanges();

            return Ok(monthlyReport);
        }
    }
}
