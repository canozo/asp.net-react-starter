using System;
using System.Collections.Generic;
using System.Linq;
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

        public WeatherForecastController(WeatherContext context)
        {
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

        [HttpPut]
        public IActionResult Put(List<WeatherForecastParameters> items)
        {
            return Ok(items);
        }

        public class WeatherForecastParameters
        {
            public int TemperatureC { get; set; }

            public string Summary { get; set; }
        }
    }
}
