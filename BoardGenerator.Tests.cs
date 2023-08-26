using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SudokuApi.Tests
{
    [TestClass]
    public class BoardGeneratorTests 

    {
       
        [TestMethod]
        public void TestBoardGeneration()
        {
            // Arrange
            var generator = new BoardGenerator();

            // Act
            List<List<int>> generatedBoard = generator.Run();
            var isSolved = Solver.BoardIsSolved(generatedBoard);


            Assert.IsTrue(isSolved);
        }

        // You can add more test methods to cover different aspects of your generator.
    }
}