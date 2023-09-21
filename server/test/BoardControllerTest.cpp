#include "BoardControllerTest.hpp"

#include "controller/BoardController.hpp"

#include "app/MyApiTestClient.hpp"
#include "app/TestComponent.hpp"

#include "oatpp/web/client/HttpRequestExecutor.hpp"

#include "oatpp-test/web/ClientServerTestRunner.hpp"

std::vector<std::vector<int>> SEED_2 = {{7, 5, 2, 8, 6, 9, 1, 4, 3},
                                        {8, 1, 6, 3, 4, 7, 9, 5, 2},
                                        {4, 3, 9, 2, 1, 5, 6, 7, 8},
                                        {2, 7, 8, 9, 3, 6, 4, 1, 5},
                                        {9, 4, 3, 1, 5, 2, 8, 6, 7},
                                        {1, 6, 5, 4, 7, 8, 2, 3, 9},
                                        {5, 2, 7, 6, 9, 1, 3, 8, 4},
                                        {3, 8, 1, 5, 2, 4, 7, 9, 6},
                                        {6, 9, 4, 7, 8, 3, 5, 2, 1}};

void BoardControllerTest::onRun()
{

  /* Register test components */
  TestComponent component;

  /* Create client-server test runner */
  oatpp::test::web::ClientServerTestRunner runner;

  /* Add MyController endpoints to the router of the test server */
  runner.addController(std::make_shared<BoardController>());

  /* Run test */
  runner.run([this, &runner]
             {
               /* Get client connection provider for Api Client */
               OATPP_COMPONENT(std::shared_ptr<oatpp::network::ClientConnectionProvider>, clientConnectionProvider);

               /* Get object mapper component */
               OATPP_COMPONENT(std::shared_ptr<oatpp::data::mapping::ObjectMapper>, objectMapper);

               /* Create http request executor for Api Client */
               auto requestExecutor = oatpp::web::client::HttpRequestExecutor::createShared(clientConnectionProvider);

               /* Create Test API client */
               auto client = MyApiTestClient::createShared(requestExecutor, objectMapper);

               /* Call server API */
               /* Call root endpoint of MyController */
               auto response = client->getRoot();

               /* Assert that server responds with 200 */
               OATPP_ASSERT(response->getStatusCode() == 200);

               /* Read response body as MessageDto */
               auto message = response->readBodyToDto<oatpp::Object<BoardDto>>(objectMapper.get());

               /* Assert that received message is as expected */
               OATPP_ASSERT(message);
               OATPP_ASSERT(message->statusCode == 200);
               OATPP_ASSERT(message->message == "The plan is to build a c++ backend to replace my C# one");

               for(int row =0;row<SEED_2.size();row++){
                for(int col=0;col<SEED_2[row].size();col++) {
                    OATPP_ASSERT( message->board[row][col] == SEED_2[row][col]);
                }
                } },

             std::chrono::minutes(10) /* test timeout */);

  /* wait all server threads finished */
  std::this_thread::sleep_for(std::chrono::seconds(1));
}
