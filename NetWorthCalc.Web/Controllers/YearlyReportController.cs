using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetWorthCalc.Web.Models;
using Microsoft.EntityFrameworkCore.Internal;

namespace NetWorthCalc.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class YearlyReportController : ControllerBase
    {
        private readonly NetWorthContext _context;

        public YearlyReportController(NetWorthContext context)
        {
            _context = context;
        }

        [HttpGet("{year}")]
        public IEnumerable GetReport(int year)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var queryAssets = from asset in _context.Set<Asset>()
                              join report in _context.Set<MonthlyReport>()
                                  on asset.MonthlyReportId equals report.MonthlyReportId
                              where report.UserId == userId && report.Year == year
                              group asset by new
                              {
                                  Key = asset.MonthlyReportId,
                                  report.Month
                              } into assetGroup
                              select new YearlyReportItem
                              {
                                  MonthlyReportId = assetGroup.Key.Key,
                                  Month = assetGroup.Key.Month,
                                  Total = assetGroup.Sum(a => a.Amount)
                              };

            var queryLiabilities = from liability in _context.Set<Liability>()
                                   join report in _context.Set<MonthlyReport>()
                                       on liability.MonthlyReportId equals report.MonthlyReportId
                                   where report.UserId == userId && report.Year == year
                                   group liability by new
                                   {
                                       Key = liability.MonthlyReportId,
                                       report.Month
                                   } into assetGroup
                                   select new YearlyReportItem
                                   {
                                       MonthlyReportId = assetGroup.Key.Key,
                                       Month = assetGroup.Key.Month,
                                       Total = assetGroup.Sum(a => a.Amount)
                                   };

            List<YearlyReportItem> result = new List<YearlyReportItem>();

            for (int i = 1; i <= 12; i++)
            {
                var item = new YearlyReportItem()
                {
                    Month = i,
                    Total = 0
                };

                // If you find the month in the assets, increment the total value of the item
                if (queryAssets.Any(item => item.Month == i))
                {
                    YearlyReportItem asset = queryAssets.Where(item => item.Month == i).FirstOrDefault();
                    item.Total += asset.Total;
                    item.MonthlyReportId = asset.MonthlyReportId;
                }

                // If you find the month in the liabilities, decrement the total value of the item
                if (queryLiabilities.Any(item => item.Month == i))
                {
                    YearlyReportItem liability = queryLiabilities.Where(item => item.Month == i).FirstOrDefault();
                    item.Total -= liability.Total;
                    item.MonthlyReportId = liability.MonthlyReportId;
                }

                result.Add(item);
            }

            return result;
        }

        public class YearlyReportItem
        {
            public Guid MonthlyReportId { get; set; }

            public int Month { get; set; }

            public double Total { get; set; }
        }
    }
}
