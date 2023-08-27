namespace SudokuApi.Services
{
    public interface IBoardGenerator
    {
        public List<List<int>> Run(List<int>? row = null);
    }
}
