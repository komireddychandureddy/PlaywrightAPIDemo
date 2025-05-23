# Playwright API Testing Project

This project demonstrates comprehensive API testing using Playwright with various patterns and best practices.

## Features

- **Comprehensive Test Coverage**: CRUD operations, error handling, performance testing
- **Custom Fixtures**: Reusable API context and test data
- **Helper Utilities**: Common API operations and validation functions
- **Multiple Test Categories**: Unit, integration, performance, and error handling tests
- **Reporting**: HTML, JSON, and JUnit reports
- **CI/CD Ready**: Configurable for continuous integration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run all tests:
   ```bash
   npm test
   ```

3. Run only API tests:
   ```bash
   npm run test:api
   ```

4. View reports:
   ```bash
   npm run report
   ```

## Project Structure

```
├── tests/
│   ├── fixtures/
│   │   └── api-fixtures.js      # Custom test fixtures
│   ├── utils/
│   │   └── api-helpers.js       # Helper functions
│   └── api/
│       ├── users.api.spec.js    # User API tests
│       ├── posts.api.spec.js    # Posts API tests
│       ├── error-handling.api.spec.js
│       ├── performance.api.spec.js
│       └── integration.api.spec.js
├── playwright.config.js         # Playwright configuration
└── package.json
```

## Test Categories

- **CRUD Operations**: Create, Read, Update, Delete operations
- **Validation**: Data structure and field validation
- **Error Handling**: Invalid requests, missing data, rate limiting
- **Performance**: Response times and concurrent requests
- **Integration**: Multi-step workflows and data relationships

## Configuration

The project uses JSONPlaceholder (https://jsonplaceholder.typicode.com) as a test API.
To use with your own API, update the `baseURL` in `playwright.config.js` and add authentication headers as needed.

## Best Practices Demonstrated

1. **Separation of Concerns**: Tests, fixtures, and utilities are properly organized
2. **Reusable Components**: Custom fixtures and helper functions reduce code duplication
3. **Comprehensive Validation**: Both response status and data structure validation
4. **Error Scenarios**: Testing various failure modes and edge cases
5. **Performance Awareness**: Including response time and concurrency tests
6. **Documentation**: Clear test descriptions and comments