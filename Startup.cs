using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization; //For use this package you need: Microsoft.AspNetCore.Mvc.NewtonsoftJson


namespace EmployeeEnviroment
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //JSON Serializer with Newtonsoft  
            services.AddControllersWithViews().AddNewtonsoftJson(options => 
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            ).AddNewtonsoftJson(options => 
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver()
            );

            //Enable Cors for Allow every http request
            services.AddCors(config => {
                config.AddPolicy("AllowOrigin", options => 
                    //Allow the origin and its requests
                    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(options => 
                    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                );
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            #region Serving Photos directory as static files
            // Combines the current directory and photos' directory for the root of new file provider
            string photoPath = Path.Combine(Directory.GetCurrentDirectory(), "Photos");
            
            if (!Directory.Exists(photoPath))
            {
                Directory.CreateDirectory(photoPath);
            }
            
            app.UseStaticFiles(new StaticFileOptions
            {
                //Using a new File provider options with the directory of photoPath
                FileProvider = new PhysicalFileProvider(photoPath)
            });
            #endregion

            app.UseSpaStaticFiles();
        
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
