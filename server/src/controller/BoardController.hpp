#ifndef BoardController_hpp
#define BoardController_hpp

#include "dto/DTOs.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/macro/component.hpp"
// #include <iostream>
#include OATPP_CODEGEN_BEGIN(ApiController) //<-- Begin Codegen

const std::vector<int> emptyRow(9, 0);
const std::vector<std::vector<int>> emptyBoard(9, emptyRow);
// std::vector<std::vector<int>> generateBoard(unsigned startinPieces = 0, std::vector<std::vector<int>> currentBoard = emptyBoard);
std::vector<std::vector<int>> generateBoard(unsigned startinPieces = 0);
oatpp::Vector<oatpp::Vector<oatpp::Int32>> serializeBoard(std::vector<std::vector<int>> board);

std::vector<std::vector<int>> deserializeBoard(oatpp::Vector<oatpp::Vector<oatpp::Int32>> newboard);
/**
 * Sample Api Controller.
 */
class BoardController : public oatpp::web::server::api::ApiController
{
public:
  /**
   * Constructor with object mapper.
   * @param objectMapper - default object mapper used to serialize/deserialize DTOs.
   */
  BoardController(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper))
      : oatpp::web::server::api::ApiController(objectMapper)
  {
  }

public:
  ADD_CORS(root, "*", "GET", "DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Range, access-control-allow-origin, cors", "1728000");

  ENDPOINT("GET", "/{seed}", root, PATH(Int32, seed))
  {
    auto dto = BoardDto::createShared();
    dto->statusCode = 200;
    dto->message = "The plan is to build a c++ backend to replace my C# one";
    auto board = generateBoard(*seed);
    dto->board = serializeBoard(board);
    auto k = dto->board;

    auto response = createDtoResponse(Status::CODE_200, dto);

    return response;
  }

  // ADD_CORS(solve, "*", "GET", "DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Range, access-control-allow-origin, cors", "1728000");

  // ENDPOINT("POST", "/solve", solve, BODY_DTO(Object<PostDto>, input))
  // {
  //   std::cout << "here" << std::endl;
  //   auto dto = BoardDto::createShared();
  //   dto->statusCode = 200;
  //   std::cout << "here 1" << std::endl;
  //   dto->message = "Solution";
  //   std::cout << "here 1b" << std::endl;

  //   std::cout << "here 1b2" << std::endl;
  //   auto deserilizedBoard = deserializeBoard(input->newboard);
  //   std::cout << "here 2" << std::endl;
  //   auto board = generateBoard(1, deserilizedBoard);
  //   dto->board = serializeBoard(board);
  //   auto response = createDtoResponse(Status::CODE_200, dto);

  //   return response;
  // }

  // TODO Insert Your endpoints here !!!
};

#include OATPP_CODEGEN_END(ApiController) //<-- End Codegen

#endif /* BoardController_hpp */
