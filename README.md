## Sudoku application

### Frontend

- Lets the user play the game that the api provides
- Deployed at [netlify](https://erikssudoku.netlify.app/)
- To run locally: cd into client and run `npm run dev`

### Server

- Generates a board and solves it (if the user cannot)
- Deployed at render
- To run locally: cd into server/build and run `cmake .. -DFRONTEND_PATH="https://localhost:5174" && make && ./my-project-exe`
- To run tests: cd into server/build and run `./my-project-test`

### Api -Deprecated

- This app used to be hosted in Azure before it was rewritten in C++
- Creates a new Sudoku game
- It is no longer deployed at azure
- To run locally: cd into api and run `dotnet run --urls console https://localhost:7096`
