namespace SudokuApi
{
    public class BoardGenerator
    {

        private List<int> _initialRow;
        private readonly Random _rand;
        private readonly List<int> _lineShufflers;

        public BoardGenerator()
        {
            _initialRow = Enumerable.Range(1, 9).ToList();
            _rand = new Random();
            _lineShufflers = new List<int>{ 3, 3, 1, 3, 3, 1, 3, 3 };
        }

        public List<List<int>>  Run()
        {
            List<List<int>> board = new List<List<int>>();
            var intialRow = _initialRow.OrderBy(_ => _rand.Next()).ToList();
            

            var currentRow = intialRow;

            board.Add(currentRow);
            foreach (var lineShuffler in _lineShufflers){

                currentRow =currentRow.Select(el => 
                {
                    var newValue = el + lineShuffler;
                    if (newValue > 9)
                    {
                        newValue -= 9;
                    }
                    return  newValue; }
            
            ).ToList() ;
            
                board.Add(currentRow);

            }

            return board;
        }
    }
}
