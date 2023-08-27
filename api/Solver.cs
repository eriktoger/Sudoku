using System.Data.Common;
using System.Diagnostics;
namespace SudokuApi
{
    public class Solver
    {
        public class Coordinate
        {
            public int Row { get; }
            public int Column { get; }

            public Coordinate(int row, int column)
            {
                Row = row;
                Column = column;
            }

            public static Coordinate operator +(Coordinate c1, Coordinate c2)
            {
                int newRow = c1.Row + c2.Row;
                int newColumn = c1.Column + c2.Column;
                return new Coordinate(newRow, newColumn);
            }
        }

        private static List<Coordinate> _squareCenterIndicies = new List<Coordinate>
            {
                 new Coordinate(1, 1),new Coordinate(1, 4),new Coordinate(1, 7),
                 new Coordinate(4, 1),new Coordinate(4, 4),new Coordinate(4, 7),
                 new Coordinate(7, 1),new Coordinate(7, 4),new Coordinate(7, 7)

            };
        private static List<Coordinate> _adjacentOffets = new List<Coordinate>
            {
                 new Coordinate(-1, -1),new Coordinate(-1, 0),new Coordinate(-1, 1),
                 new Coordinate(0, -1),new Coordinate(0, 0),new Coordinate(0, 1),
                 new Coordinate(1, -1),new Coordinate(1, 0),new Coordinate(1, 1),

            };
        private static bool HasDuplicates(List<int> list)
        {
            return list.Distinct().Count() != list.Count;
        }

        private static List<int> ExtractColumn(List<List<int>> board, int columnIndex)
        {
            List<int> column = new List<int>();
            foreach (var row in board)
            {
                column.Add(row[columnIndex]);
            }
            return column;
        }

        public static bool BoardIsSolved(List<List<int>> board)
        {

            if (board.Count != 9)
            {
                return false;
            }

            foreach (var row in board)
            {
                if (row.Count != 9 || HasDuplicates(row) || row.Any(x => x < 1 || x > 9))
                {
                    return false;
                }
            }

            for (int colIndex = 0; colIndex < 9; colIndex++)
            {
                var column = ExtractColumn(board, colIndex);
                if (HasDuplicates(column))
                {
                    return false;
                }
            }

            foreach (var squareCenterIndex in _squareCenterIndicies)
            {
                var square = new List<int> { };
                foreach (var adjacentOffset in _adjacentOffets)
                {
                    var adjacent = squareCenterIndex + adjacentOffset;
                    square.Add(board[adjacent.Row][adjacent.Column]);
                }
                if (HasDuplicates(square))
                {
                    return false;
                }
            }
            return true;
        }


    }
}
