using System;
using System.Collections;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetWorthCalc.Web.Models;

namespace NetWorthCalc.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LiabilityController : ControllerBase
    {
        private readonly NetWorthContext _context;

        public LiabilityController(NetWorthContext context)
        {
            _context = context;
        }

        [HttpGet("{monthlyReportId}")]
        public IEnumerable GetAll(Guid monthlyReportId)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return _context.Liabilities
                .Where(a => a.MonthlyReport.UserId == userId && a.MonthlyReportId == monthlyReportId)
                .Select(a => new
                {
                    a.LiabilityId,
                    a.CreatedOn,
                    a.Name,
                    a.Amount,
                    a.MonthlyReport
                }).OrderByDescending(a => a.CreatedOn);
        }

        [HttpPost("{monthlyReportId}")]
        public IActionResult Post(Guid monthlyReportId)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var monthlyReport = _context.MonthlyReports.Find(monthlyReportId);

            if (monthlyReport == null)
            {
                return NotFound("This report doesn't exist.");
            }

            if (monthlyReport.UserId != userId)
            {
                return Unauthorized("This report doesn't belong to you.");
            }

            var liability = new Liability();
            monthlyReport.Liabilities.Add(liability);
            _context.SaveChanges();

            return Ok(liability);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] LiabilityParameters body)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var liability = _context.Liabilities.Include(a => a.MonthlyReport).Where(a => a.LiabilityId == id).FirstOrDefault();

            if (liability == null)
            {
                return NotFound("This liability doesn't exist.");
            }

            if (liability.MonthlyReport.UserId != userId)
            {
                return Unauthorized("This liability doesn't belong to you.");
            }

            try
            {
                liability.Name = body.Name;
                liability.Amount = body.Amount;
                _context.SaveChanges();

                return Ok(liability);
            }
            catch (Exception)
            {
                return StatusCode(415, "Fields missing or not valid: 'Name' (Not null), 'Amount' (>= 0.0)");
            }
        }

        public class LiabilityParameters
        {
            public string Name { get; set; }

            public double Amount { get; set; }
        }

        [HttpDelete("{id}")]
        public IActionResult Put(Guid id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var liability = _context.Liabilities.Include(a => a.MonthlyReport).Where(a => a.LiabilityId == id).FirstOrDefault();

            if (liability == null)
            {
                return NotFound("This liability doesn't exist.");
            }

            if (liability.MonthlyReport.UserId != userId)
            {
                return Unauthorized("This liability doesn't belong to you.");
            }

            _context.Liabilities.Remove(liability);
            _context.SaveChanges();

            return Ok(liability);
        }
    }
}
