#ifndef DTOs_hpp
#define DTOs_hpp

#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)

/**
 *  Data Transfer Object. Object containing fields only.
 *  Used in API for serialization/deserialization and validation
 */
class BoardDto : public oatpp::DTO
{

  DTO_INIT(BoardDto, DTO)

  DTO_FIELD(Int32, statusCode);
  DTO_FIELD(String, message);
  DTO_FIELD(Vector<Vector<Int32>>, board); ///< Map<String, List<User>>
};

// class PostDto : public oatpp::DTO
// {

//   DTO_INIT(PostDto, DTO)

//   DTO_FIELD(Vector<Vector<Int32>>, newboard);
// };

#include OATPP_CODEGEN_END(DTO)

#endif /* DTOs_hpp */
