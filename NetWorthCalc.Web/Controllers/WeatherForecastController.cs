using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetWorthCalc.Web.Models;

namespace NetWorthCalc.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly WeatherContext _context;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, WeatherContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get() =>
            _context.WeatherForecasts.ToList();

        [HttpPost]
        public IActionResult Post(WeatherForecastParameters body)
        {
            var rng = new Random();
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Now.AddDays(rng.Next(0, 100)),
                TemperatureC = body.TemperatureC,
                Summary = body.Summary
            };

            _context.Add(weatherForecast);
            _context.SaveChanges();

            return Ok(weatherForecast);
        }

        public class WeatherForecastParameters
        {
            public int TemperatureC { get; set; }

            public string Summary { get; set; }
        }
    }
}
