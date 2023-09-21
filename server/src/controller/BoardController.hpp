#ifndef BoardController_hpp
#define BoardController_hpp

#include "dto/DTOs.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/macro/component.hpp"

#include OATPP_CODEGEN_BEGIN(ApiController) //<-- Begin Codegen

std::vector<std::vector<int>> generateBoard(unsigned startinPieces = 0);
oatpp::Vector<oatpp::Vector<oatpp::Int32>> serializeBoard(std::vector<std::vector<int>> board);
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

  ENDPOINT("GET", "/", root)
  {
    auto dto = BoardDto::createShared();
    dto->statusCode = 200;
    dto->message = "The plan is to build a c++ backend to replace my C# one";
    auto board = generateBoard();
    dto->board = serializeBoard(board);
    auto response = createDtoResponse(Status::CODE_200, dto);

    return response;
  }

  // TODO Insert Your endpoints here !!!
};

#include OATPP_CODEGEN_END(ApiController) //<-- End Codegen

#endif /* BoardController_hpp */
