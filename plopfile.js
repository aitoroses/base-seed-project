module.exports = function(plop) {

  // Bootstrap
  plop.setGenerator('Bootstrap', {
    description: 'Creates the basic structure for the application.',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'src/reducers/index.ts',
      templateFile: 'templates/rootReducer.handlebars'
    },{
      type: 'add',
      path: 'src/index.tsx',
      templateFile: 'templates/application.handlebars'
    },{
      type: 'add',
      path: 'src/store/configureStore.ts',
      templateFile: 'templates/store.handlebars'
    },{
      type: 'add',
      path: 'src/containers/DevTools.tsx',
      templateFile: 'templates/devTools.handlebars'
    }]
  })

  // Segment
  plop.setGenerator('ReduxState', {
    description: 'Creates a set of files (constants, actions, reducer) and links them together.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the name for the redux state segment?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [

    // Constants
    {
      type: 'add',
      path: 'src/constants/{{properCase name}}.ts',
      templateFile: 'templates/constants.handlebars'
    },

    // Reducer
    {
      type: 'add',
      path: 'src/reducers/{{camelCase name}}.ts',
      templateFile: 'templates/reducer.handlebars',
      abortOnFail: true
    },{
      type: 'modify',
      path: 'src/reducers/index.ts',
      pattern: /(\/\/ Import reducers)/gi,
      template: '$1\nimport {{camelCase name}} from \'./{{camelCase name}}\''
    },{
      type: 'modify',
      path: 'src/reducers/index.ts',
      pattern: /(router: routerStateReducer)/gi,
      template: '{{camelCase name}},\n\t$1'
    },

    // Actions
    {
      type: 'add',
      path: 'src/actions/{{camelCase name}}.ts',
      templateFile: 'templates/actions.handlebars'
    }]
  })

  // Route
  plop.setGenerator('Route', {
    description: 'Creates a route for the application.',
    prompts: [{
      type: 'input',
      name: 'path',
      message: 'What is the route path?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    },{
      type: 'input',
      name: 'component',
      message: 'What container will it render? (it must exist)',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'component is required'
      }
    }],
    actions: [{
      type: 'modify',
      path: 'src/index.tsx',
      pattern: /({\/\* Routes \*\/})/gi,
      template: '$1\n          <Route path=\'{{path}}\' component={ {{properCase component}} } />'
    },{
      type: 'modify',
      path: 'src/index.tsx',
      pattern: /(\/\/ -- Import components --)/gi,
      template: '$1\nimport {{properCase component}} from \'./containers/{{properCase component}}\''
    }]
  })

  // Component
  plop.setGenerator('Component', {
    description: 'Creates a basic component.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the component name?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/components/{{properCase name}}.tsx',
      templateFile: 'templates/component.handlebars'
    }]
  })

  // Container
  plop.setGenerator('Container', {
    description: 'Creates a container.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the container name?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/containers/{{properCase name}}.tsx',
      templateFile: 'templates/container.handlebars',
      abortOnFail: true
    }]
  })

  // Constants
  plop.setGenerator('Constants', {
    description: 'Creates a constants file.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the constants name?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/constants/{{properCase name}}.ts',
      templateFile: 'templates/constants.handlebars'
    }]
  })

  // Reducers
  plop.setGenerator('Reducer', {
    description: 'Creates a reducer.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the reducer name?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/reducers/{{camelCase name}}.ts',
      templateFile: 'templates/reducer.handlebars',
      abortOnFail: true
    },{
      type: 'modify',
      path: 'src/reducers/index.ts',
      pattern: /(\/\/ Import reducers)/gi,
      template: '$1\nimport {{camelCase name}} from \'./{{camelCase name}}\''
    },{
      type: 'modify',
      path: 'src/reducers/index.ts',
      pattern: /(router: routerStateReducer)/gi,
      template: '{{camelCase name}},\n\t$1'
    }]
  })

  // Actions
  plop.setGenerator('Actions', {
    description: 'Creates an actions file.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the actions filename?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/actions/{{camelCase name}}.ts',
      templateFile: 'templates/actions.handlebars'
    }]
  })

  // Store
  plop.setGenerator('Store', {
    description: 'Creates a preconfigured store.',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'src/store/configureStore.ts',
      templateFile: 'templates/store.handlebars'
    }]
  })

  // Root Reducer
  plop.setGenerator('Root Reducer', {
    description: 'Creates the root reducer.',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'src/reducers/index.ts',
      templateFile: 'templates/rootReducer.handlebars'
    }]
  })

  // Application file
  plop.setGenerator('Application file', {
    description: 'Creates the main application file.',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'src/index.tsx',
      templateFile: 'templates/application.handlebars'
    }]
  })

  // Helper file
  plop.setGenerator('Helper', {
    description: 'Creates a helper module file.',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the helpers module name?',
      validate: function(value) {
        if ((/.+/).test(value)) { return true }

        return 'name is required'
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/helpers/{{camelCase name}}.ts',
      templateFile: 'templates/helper.handlebars'
    }]
  })

  // DevTools file
  plop.setGenerator('DevTools', {
    description: 'Creates devtools template for redux.',
    prompts: [],
    actions: [{
      type: 'add',
      path: 'src/containers/DevTools.tsx',
      templateFile: 'templates/devTools.handlebars'
    }]
  })
}
