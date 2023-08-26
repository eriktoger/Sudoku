using Microsoft.AspNetCore.Mvc;

namespace SudokuApi.Controllers
{
    [ApiController]
    [Route("/sudoku")]
    public class SudokuController : Controller
    {
       
        private readonly ILogger<SudokuController> _logger;

        private BoardGenerator _boardGenerator;

        public SudokuController(ILogger<SudokuController> logger)
        {
            _logger = logger;
            _boardGenerator = new BoardGenerator();
        }

        [HttpGet(Name = "GetSoduku")]
        public IActionResult Get()
        {
           var board = _boardGenerator.Run();
            return Json(board);
         
        }
    }
}