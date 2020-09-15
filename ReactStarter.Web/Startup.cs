using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using ReactStarter.Web.Models;
using ReactStarter.Web.Services;
using Microsoft.Extensions.Logging;

namespace ReactStarter.Web
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Client/build";
            });

            // Create a local LoggerFactory in order to log database connections
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });

            ILogger logger = loggerFactory.CreateLogger<Startup>();

            if (_env.IsDevelopment())
            {
                // If environment is development, get connection string from local app settings
                var connectionString = Configuration.GetConnectionString("WeatherContext");

                logger.LogInformation("Adding database context for development environment.");
                logger.LogInformation("Connection string: " + connectionString);

                services.AddDbContext<WeatherContext>(options => options.UseNpgsql(connectionString));
            }
            else
            {
                // If the environment is production, get connection string from Google Cloud Secret Manager
                var projectId = Configuration["GCLOUD_PROJECT_ID"];
                var weatherSecretId = Configuration["WEATHER_SECRET_ID"];

                var connectionString = DatabaseSecretManager.GetSecret(projectId, weatherSecretId).ToString();

                logger.LogInformation("Adding database context for production environment.");
                logger.LogInformation("Project ID: " + projectId);
                logger.LogInformation("Weather Secret ID: " + weatherSecretId);
                logger.LogInformation("Connection string: " + connectionString);

                services.AddDbContext<WeatherContext>(options => options.UseNpgsql(connectionString));
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Client";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
