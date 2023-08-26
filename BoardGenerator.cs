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

       
        public List<List<int>> Run(List<int>? row = null)
        {
            List<List<int>> board = new List<List<int>>();
            var intitialRow = row != null ? row :_initialRow.OrderBy(_ => _rand.Next()).ToList();


            var currentRow = intitialRow;

            board.Add(currentRow);
            foreach (var lineShuffler in _lineShufflers)
            {
                List<int> first = currentRow.Take(lineShuffler).ToList();
                List<int> second = currentRow.Skip(lineShuffler).ToList();
                second.AddRange(first);
                currentRow = second;
                board.Add(currentRow);

            }

            return board;
        }
    }
}
