using System;
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
    public class AssetController : ControllerBase
    {
        private readonly NetWorthContext _context;
        private readonly ILogger<MonthlyReportController> _logger;

        public AssetController(ILogger<MonthlyReportController> logger, NetWorthContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("{monthlyReportId}")]
        public IEnumerable GetAll(Guid monthlyReportId)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return _context.Assets
                .Where(a => a.MonthlyReport.UserId == userId && a.MonthlyReportId == monthlyReportId)
                .Select(a => new
                {
                    a.AssetId,
                    a.CreatedOn,
                    a.Name,
                    a.Amount
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

            var asset = new Asset(monthlyReport);
            _context.Add(asset);
            _context.SaveChanges();

            return Ok(asset);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] AssetParameters body)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var asset = _context.Assets.Find(id);

            if (asset == null)
            {
                return NotFound("This asset doesn't exist.");
            }

            if (asset.MonthlyReport.UserId != userId)
            {
                return Unauthorized("This asset doesn't belong to you.");
            }

            asset.Name = body.Name;
            asset.Amount = body.Amount;
            _context.SaveChanges();

            return Ok(asset);
        }

        public class AssetParameters
        {
            public string Name { get; set; }

            public int Amount { get; set; }
        }

        [HttpDelete("{id}")]
        public IActionResult Put(Guid id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var asset = _context.Assets.Find(id);

            if (asset == null)
            {
                return NotFound("This asset doesn't exist.");
            }

            if (asset.MonthlyReport.UserId != userId)
            {
                return Unauthorized("This asset doesn't belong to you.");
            }

            _context.Assets.Remove(asset);
            _context.SaveChanges();

            return Ok(asset);
        }
    }
}
