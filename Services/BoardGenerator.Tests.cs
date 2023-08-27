using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SudokuApi.Services
{
    [TestClass]
    public class BoardGeneratorTests

    {

        [TestMethod]
        public void RandomTestBoardGeneration()
        {
            // Arrange
            var generator = new BoardGenerator();

            // Act
            List<List<int>> generatedBoard = generator.Run();
            var isSolved = Solver.BoardIsSolved(generatedBoard);


            Assert.IsTrue(isSolved);
        }
        [TestMethod]
        public void TestBoardGeneration_1()
        {
            // Arrange
            var generator = new BoardGenerator();

            // Act
            List<List<int>> generatedBoard = generator.Run(new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9 });
            var isSolved = Solver.BoardIsSolved(generatedBoard);


            Assert.IsTrue(isSolved);
        }

        [TestMethod]
        public void TestBoardGeneration_2()
        {
            // Arrange
            var generator = new BoardGenerator();

            // Act
            List<List<int>> generatedBoard = generator.Run(new List<int> { 7, 2, 3, 8, 4, 1, 5, 6, 9 });
            var isSolved = Solver.BoardIsSolved(generatedBoard);


            Assert.IsTrue(isSolved);
        }

        [TestMethod]
        public void TestBoardGeneration_3()
        {
            // Arrange
            var generator = new BoardGenerator();

            // Act
            List<List<int>> generatedBoard = generator.Run(new List<int> { 3, 9, 7, 5, 4, 8, 6, 1, 2 });
            var isSolved = Solver.BoardIsSolved(generatedBoard);


            Assert.IsTrue(isSolved);
        }
        [TestMethod]
        public void TestBoardGeneration_4()
        {
            // Arrange
            var generator = new BoardGenerator();

            // Act
            List<List<int>> generatedBoard = generator.Run(new List<int> { 8, 9, 3, 2, 7, 6, 4, 5, 1 });
            var isSolved = Solver.BoardIsSolved(generatedBoard);


            Assert.IsTrue(isSolved);
        }


    }
}