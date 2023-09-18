#include "BoardController.hpp"

// TODO - SOME CODE HERE

std::vector<std::vector<int>> generateBoard(int startinPieces)
{
    std::vector<std::vector<int>> board;

    for (int i = 0; i < 9; i++)
    {
        std::vector<int> list;
        for (int j = 0; j < 9; j++)
        {
            list.push_back(i * j);
        }
        board.push_back(list);
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