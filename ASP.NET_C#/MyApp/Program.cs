using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyApp.Areas.Identity.Data;
using MyApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Server=localhost;Database=MyApp;Integrated Security=True;TrustServerCertificate=True;";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Configure Identity
builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>() // 添加角色支持
    .AddEntityFrameworkStores<ApplicationDbContext>();

// 添加授權策略
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
});

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

// Ensure roles are created
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    CreateRoles(roleManager, userManager).Wait();
}

app.Run();

static async Task CreateRoles(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
{
    string[] roleNames = { "Admin", "User" };
    IdentityResult roleResult;

    foreach (var roleName in roleNames)
    {
        var roleExist = await roleManager.RoleExistsAsync(roleName);
        if (!roleExist)
        {
            // Create the roles and seed them to the database
            roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }

    // Create a super user who will maintain the web app
    var powerUser = new ApplicationUser
    {
        UserName = "admin@myapp.com",
        Email = "admin@myapp.com",
        FirstName = "Admin",
        LastName = "User"
    };

    string userPassword = "Admin@123";
    var user = await userManager.FindByEmailAsync("admin@myapp.com");

    if (user == null)
    {
        var createPowerUser = await userManager.CreateAsync(powerUser, userPassword);
        if (createPowerUser.Succeeded)
        {
            // Assign the new user the "Admin" role
            await userManager.AddToRoleAsync(powerUser, "Admin");
        }
    }
}
