# How to run the application locally

- Run `npm install` on the root of the project
- Run `npm run dev` on the root of the project

# Design decisions
## Linter
EsLint was used as a linter to enforce code style and auto format code. This creates a consistent and more readable codebase.
## Templates with `generate-react-cli`
This cli tool creates the components from a given template located in the folder `templates` allowing me to create all the components quickly while maintaining the same core structure.
## GitHub actions
The project has a workflow named `build_and_lint` witch in any push to any branch runs the linter and tries to build the project. If any of these steps fails I will be aware of witch commit was responsible and quickly fix the bug.
## Typescript
The project was programed using typescript instead of javascript mainly because of a personal preference considering type safety a must. 
## Scss
`scss` was used instead of simple `css` due to the large amount of extra functionality it provides. 