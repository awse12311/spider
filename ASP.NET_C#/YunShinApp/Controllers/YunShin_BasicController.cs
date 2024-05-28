using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using YunShinApp.Models;

public class YunShin_BasicController : Controller
{
    private readonly ApplicationDbContext _context;

    public YunShin_BasicController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(int? page, int? pageSize)
    {
        int pageNumber = page ?? 1;
        int size = pageSize ?? 10;

        var items = await _context.YunShin_Basics
            .OrderBy(b => b.Id)
            .Skip((pageNumber - 1) * size)
            .Take(size)
            .ToListAsync();

        return View(items);
    }
}
