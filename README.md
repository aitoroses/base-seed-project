# Installation and usage

If you check ```package.json``` you'll find a set scripts prepared for working with the project.

For using this project first ```npm install```

Then we have to run the mock-server via ```npm run mock-server```

And finally we will run the development server ```npm run dev```

For scaffolding files of the project, will use ```npm run scaffold``` or you can globally install plop with ```npm install -g plop```

# How to start a new project

This repository provides the basic structure for an application and incorporates scaffolding capabilities via [Plop](https://github.com/amwmedia/plop).

The repo is initialized with the **Bootstrap** generator, thats why **/src** folder contains some files. But we will use plop to add more files to the file structure.

## Creating the redux state files

For creating files for Redux (reducer, actions, constants...) type ```npm run scaffold``` and select the **ReduxState** generator. It will ask for the state segment name.

In this case, we will provide the name **todos** to that question and it will create the following files:

- /src/reducer/todos.ts
- /src/constants/Todos.ts
- /src/actions/todos.ts

The reducer will be imported directly into the root reducer in the **todos** key.

## Creating a container component file

For creating a container component select **Container** generator. It will ask for the name of the file.

As an example, providing the name **TodosView** it will create the file "/src/containers/TodosView.tsx"

> We can use a lot of forms of that name, "todos view", "todos_view"... it will use the proper name for each file in each case

## Attaching a container to a route

We'll do this with the **Route** generator. It will ask for the name of the file.

The generator will require the path of the route and the container to import, so, path **/todos** and component **TodosView** will import the TodosView and set the route /todos for displaying that component.

## Other generators

Inside ```npm run scaffold``` or ```plop``` we can see the set of generators that we can use:

The ones that we will use:

  - ReduxState - Creates a set of files (constants, actions, reducer) and links them together.
  - Route - Creates a route for the application.
  - Component - Creates a basic component.
  - Container - Creates a container.
  - Constants - Creates a constants file.
  - Reducer - Creates a reducer.
  - Actions - Creates an actions file.

The ones that the clean repo has run for us:

  - Bootstrap - creates the basic structure for the application.
  - Application file - Creates the main application file.
  - Root Reducer - Creates the root reducer.
  - Store - Creates a preconfigured store.

## Needs Clarification
  - Relevance of the acts, how to calculate
  - TODOs Administration Category, How to know if this TODO are an administration todo.
  - Requests, How to know if one request are on my country
