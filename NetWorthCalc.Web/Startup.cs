using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using NetWorthCalc.Web.Models;
using NetWorthCalc.Web.Services;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace NetWorthCalc.Web
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
            // Create a local LoggerFactory in order to log events while configuring services
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });

            ILogger logger = loggerFactory.CreateLogger<Startup>();

            // Add authentication for Auth0
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = $"https://{Configuration["Auth0:Domain"]}";
                options.Audience = $"https://{Configuration["Auth0:Audience"]}";
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    NameClaimType = ClaimTypes.NameIdentifier
                };
            });

            services.AddControllersWithViews();

            // Prevent JSON object cycle
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Client/build";
            });

            string connectionString;
            if (_env.IsDevelopment())
            {
                // If environment is development, get connection string from local app settings
                connectionString = Configuration.GetConnectionString("LocalConnection");

                logger.LogInformation("Adding database context for development environment.");
            }
            else
            {
                // If the environment is production, get connection string from Google Cloud Secret Manager
                connectionString = SecretManager.AccessSecret(
                    Configuration["GCLOUD_PROJECT_ID"],
                    Configuration["SECRET_ID"],
                    Configuration["SECRET_VERSION_ID"]);

                logger.LogInformation("Adding database context for production environment.");
            }

            string weatherConnectionString = "Database=weather; " + connectionString;
            string networthConnectionString = "Database=networth; " + connectionString;

            services.AddDbContext<WeatherContext>(options => options.UseNpgsql(weatherConnectionString));
            services.AddDbContext<NetWorthContext>(options => options.UseNpgsql(networthConnectionString));
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
            app.UseAuthentication();
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
