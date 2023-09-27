#include "BoardController.hpp"
#include <numeric>
#include <algorithm>
#include <random>
#include <set>
#include <iostream>

void occupied_horizontal(int row, std::vector<std::vector<int>> &board, std::set<int> &occupied)
{

    auto currentRow = board[row];

    for (auto rowNumber : currentRow)
    {

        if (rowNumber != 0)
        {
            occupied.insert(rowNumber);
        }
    }
}

void occupied_vertical(int col, std::vector<std::vector<int>> &board, std::set<int> &occupied)
{

    for (int row = 0; row < 9; row++)
    {
        auto colNumber = board[row][col];
        if (colNumber != 0)
        {
            occupied.insert(colNumber);
        }
    }
}

void occupied_square(int row, int col, std::vector<std::vector<int>> &board, std::set<int> &occupied)
{
    auto centerRow = (row / 3) * 3 + 1;
    auto centerCol = (col / 3) * 3 + 1;

    for (int i = -1; i < 2; i++)
    {
        for (int j = -1; j < 2; j++)
        {
            auto squareNumber = board[centerRow + i][centerCol + j];

            if (squareNumber != 0)
            {
                occupied.insert(squareNumber);
            }
        }
    }
}

std::vector<int> calcAlternatives(int row, int col, std::vector<std::vector<int>> &board, std::default_random_engine &rng, std::vector<std::vector<int>> const &currentBoard)
{
    std::set<int> occupied;
    occupied_horizontal(row, board, occupied);
    occupied_vertical(col, board, occupied);
    occupied_square(row, col, board, occupied);
    std::vector<int> alternatives{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    for (auto occy : occupied)
    {
        alternatives[occy] = 0;
    }

    // how to do this in c++ 23?
    auto square = currentBoard[row][col];
    auto newEnd = std::remove_if(alternatives.begin(), alternatives.end(),
                                 [square](int ele)
                                 { return square == 0 ? ele == square : ele != square; });
    alternatives.erase(newEnd, alternatives.end());

    std::shuffle(std::begin(alternatives), std::end(alternatives), rng);
    return alternatives;
}

// void printBoard(std::vector<std::vector<int>> &currentBoard)
// {

//     for (auto row : currentBoard)
//     {
//         for (auto square : row)
//         {
//             std::cout << square << " ";
//         }
//         std::cout << std::endl;
//     }
//     std::cout << std::endl;
//     std::cout << std::endl;
// }

std::vector<std::vector<int>> solveBoard(unsigned seed, std::vector<std::vector<int>> currentBoard, bool isGenerate)
{

    auto alternativesTable = emptyBoard;
    seed = seed ? seed : std::chrono::system_clock::now().time_since_epoch().count();
    auto rng = std::default_random_engine{seed};

    for (int i = 0; i < 81; i++)
    {
        auto row = i / 9;
        auto col = i % 9;

        auto nrOfAlteratives = calcAlternatives(row, col, currentBoard, rng, currentBoard).size();
        if (nrOfAlteratives == 0)
        {
            alternativesTable[row][col] = 10;
        }
        else
        {
            alternativesTable[row][col] = nrOfAlteratives;
        }
    }
    std::vector<int> indices(81);
    std::iota(std::begin(indices), std::end(indices), 0);

    if (!isGenerate)
    {
        std::sort(std::begin(indices), std::end(indices), [&alternativesTable](const int &a, const int &b)
                  { return alternativesTable[a / 9][a % 9] < alternativesTable[b / 9][b % 9]; });
    }

    std::vector<std::vector<int>> tries(81);

    std::vector<std::vector<int>> board;

    for (auto row : currentBoard)
    {
        board.push_back(row);
    }

    int square = 0;
    std::vector<int> triesIndex(81);
    int index = indices[square];
    auto row = index / 9;
    auto col = index % 9;
    tries[index] = calcAlternatives(row, col, board, rng, currentBoard);

    int zeroCount = std::accumulate(currentBoard.begin(), currentBoard.end(), 0, [](int total, const std::vector<int> &row)
                                    { return total + std::count(row.begin(), row.end(), 0); });

    while (true)
    {

        if (tries[index].size() > triesIndex[index])
        {
            board[row][col] = tries[index][triesIndex[index]];
            square++;

            if (square == zeroCount)
            {
                break;
            }
            index = indices[square];
            row = index / 9;
            col = index % 9;
            tries[index] = calcAlternatives(row, col, board, rng, currentBoard);
        }
        else
        {

            board[row][col] = 0;
            triesIndex[index] = 0;
            tries[index].clear();
            square--;

            index = indices[square];
            row = index / 9;
            col = index % 9;
            triesIndex[index]++;
        }
    }

    return board;
}

oatpp::Vector<oatpp::Vector<oatpp::Int32>> serializeBoard(std::vector<std::vector<int>> board)
{
    oatpp::Vector<oatpp::Vector<oatpp::Int32>> serializedBoard = oatpp::Vector<oatpp::Vector<oatpp::Int32>>::createShared();

    for (int i = 0; i < board.size(); i++)
    {
        oatpp::Vector<oatpp::Int32> list = oatpp::Vector<oatpp::Int32>::createShared();
        for (int j = 0; j < board[i].size(); j++)
        {
            list->push_back(board[i][j]);
        }
        serializedBoard->push_back(list);
    }

    return serializedBoard;
}

std::vector<std::vector<int>> deserializeBoard(oatpp::Vector<oatpp::Vector<oatpp::Int32>> board)
{
    std::vector<std::vector<int>> deserializedBoard;
    for (int row = 0; row < board->size(); row++)
    {
        std::vector<int> list;
        for (int col = 0; col < board->at(row)->size(); col++)
        {
            list.emplace_back(board->at(row)->at(col));
        }
        deserializedBoard.emplace_back(list);
    }
    return deserializedBoard;
}

int getMaskNumber(oatpp::String difficulty)
{

    if (difficulty == "test")
    {
        return 1;
    }
    if (difficulty == "easy")
    {
        return 20;
    }
    if (difficulty == "medium")
    {
        return 45;
    }
    if (difficulty == "hard")
    {
        return 64;
    }
    return 0;
}
void maskBoard(std::vector<std::vector<int>> &board, int seed, oatpp::String difficulty)
{
    auto rng = std::default_random_engine{seed};
    std::vector<int> indices(81);
    std::iota(std::begin(indices), std::end(indices), 0);
    shuffle(indices.begin(), indices.end(), rng);
    auto maskNumber = getMaskNumber(difficulty);

    while (maskNumber--)
    {
        auto row = indices[maskNumber] / 9;
        auto col = indices[maskNumber] % 9;
        board[row][col] = 0;
    }
}