#include "BoardController.hpp"
#include <numeric>
#include <algorithm>
#include <random>
#include <set>
#include <iostream>
#include <string>
// TODO - SOME CODE HERE

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
// std::vector<int> calcAlternatives(int row, int col, std::vector<std::vector<int>> &board, std::default_random_engine &rng, std::vector<std::vector<int>> const &currentBoard)
std::vector<int> calcAlternatives(int row, int col, std::vector<std::vector<int>> &board, std::default_random_engine &rng)
{

    std::set<int> occupied;
    occupied_horizontal(row, board, occupied);
    occupied_vertical(col, board, occupied);
    occupied_square(row, col, board, occupied);

    std::vector<int> alternatives = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    for (auto occy : occupied)
    {
        alternatives[occy] = 0;
    }

    // how to do this in c++ 23?
    // auto square = currentBoard[row][col];
    auto square = 0;
    auto newEnd = std::remove_if(alternatives.begin(), alternatives.end(),
                                 [square](int ele)
                                 { return square == 0 ? ele == square : ele != square; });
    alternatives.erase(newEnd, alternatives.end());

    std::shuffle(std::begin(alternatives), std::end(alternatives), rng);
    return alternatives;
}
// std::vector<std::vector<int>> generateBoard(unsigned seed, std::vector<std::vector<int>> currentBoard)
std::vector<std::vector<int>> generateBoard(unsigned seed)
{
    std::vector<int> indicies(81);
    std::vector<std::vector<int>> tries(81);
    std::iota(std::begin(indicies), std::end(indicies), 0);

    std::vector<std::vector<int>> board;
    seed = seed ? seed : std::chrono::system_clock::now().time_since_epoch().count();
    auto rng = std::default_random_engine{seed};
    for (int i = 0; i < 9; i++)
    {
        std::vector<int> list(9);
        board.push_back(list);
    }

    // solve it in that order
    // I need a map/vector for all tried
    int square = 0;
    std::vector<int> triesIndex(81);
    int index = indicies[square];
    auto row = index / 9;
    auto col = index % 9;
    tries[index] = calcAlternatives(row, col, board, rng);

    while (square < 81)
    {

        if (tries[index].size() > triesIndex[index])
        {
            board[row][col] = tries[index][triesIndex[index]];
            square++;

            if (square == 81)
            {
                break;
            }
            index = indicies[square];
            row = index / 9;
            col = index % 9;
            tries[index] = calcAlternatives(row, col, board, rng);
        }
        else
        {
            board[row][col] = 0;
            triesIndex[index] = 0;
            tries[index].clear();
            square--;

            index = indicies[square];
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
    std::cout << "here 1c" << std::endl;
    std::vector<std::vector<int>> deserializedBoard;

    std::cout << "here 1d" << std::endl;
    for (int row = 0; row < board->size(); row++)
    {
        std::vector<int> list;
        for (int col = 0; col < board->at(row)->size(); col++)
        {
            list.emplace_back(board->at(row)->at(col));
        }
        deserializedBoard.emplace_back(list);
    }
    std::cout << "here 1e" << std::endl;
    return deserializedBoard;
}