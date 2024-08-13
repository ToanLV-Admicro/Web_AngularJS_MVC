using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToanLV_Code_AngularJS.Models;

namespace ToanLV_Code_AngularJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetAll()
        {
            return await _context.Items.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetById(int id)
        {
            var entity = await _context.Items.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            return entity;
        }

        [HttpPost]
        public async Task<ActionResult<Item>> Create(Item entity)
        {
            _context.Items.Add(entity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Item entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Items.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.Items.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntityExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }

}
