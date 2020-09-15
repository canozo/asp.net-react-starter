using System;

namespace NetWorthCalc.Web
{
    public class WeatherForecast
    {
        public WeatherForecast()
        {
            Id = new Guid();
            CreatedOn = DateTime.Now;
        }

        public Guid Id { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}
