using Microsoft.AspNetCore.Mvc;
using SudokuApi.Services;

namespace SudokuApi.Controllers
{
    [ApiController]
    [Route("/sudoku")]
    public class SudokuController : Controller
    {

        private readonly ILogger<SudokuController> _logger;
        private readonly IBoardGenerator _boardGenerator;

        

        public SudokuController(ILogger<SudokuController> logger,IBoardGenerator boardGenerator)
        {
            _logger = logger;
            _boardGenerator = boardGenerator;
        }

        [HttpGet(Name = "GetSoduku")]
        public IActionResult Get()
        {
            _logger.LogInformation("User requested a board");
            var board = _boardGenerator.Run();
        
            return Json(board);

        }
    }
}