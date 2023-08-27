namespace SudokuApi
{
    public class BoardGenerator
    {

        private List<int> _initialRow;
        private readonly Random _rand;
        private readonly List<int> _lineShufflers;
        private readonly List<List<int>> _lineSwappers;

        public BoardGenerator()
        {
            _initialRow = Enumerable.Range(1, 9).ToList();
            _rand = new Random();
            _lineShufflers = new List<int> { 3, 3, 1, 3, 3, 1, 3, 3 };
            _lineSwappers = new List<List<int>> {
                new List<int> { 0, 1}, new List<int> { 0, 2 }, new List<int> { 1, 2 },
                new List<int> { 3, 4 }, new List<int> { 3, 5 }, new List<int> { 4, 5 },
                new List<int> { 6, 7 }, new List<int> { 6, 8 },new List<int> { 7, 8} };
        }

        private void SwapRows(List<List<int>> board, int rowIndex1, int rowIndex2)
        {
            if (_rand.Next() % 2 == 0)
            {
                var temp = board[rowIndex1];
                board[rowIndex1] = board[rowIndex2];
                board[rowIndex2] = temp;
            }

        }


        public List<List<int>> Run(List<int>? row = null)
        {
            List<List<int>> board = new List<List<int>>();
            var intitialRow = row != null ? row : _initialRow.OrderBy(_ => _rand.Next()).ToList();


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

            foreach (var lineSwapper in _lineSwappers)
            {
                SwapRows(board, lineSwapper[0], lineSwapper[1]);
            }

            return board;
        }
    }
}
