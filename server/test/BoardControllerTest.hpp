#ifndef BoardControllerTest_hpp
#define BoardControllerTest_hpp

#include "oatpp-test/UnitTest.hpp"

class BoardControllerTest : public oatpp::test::UnitTest
{
public:
  BoardControllerTest() : UnitTest("TEST[BoardControllerTest]") {}
  void onRun() override;
};

#endif // MyControllerTest_hpp
