# Kokis WebView

## Overview

Kokis WebView is a simple and intuitive web-based user interface designed for making API requests directly from the editor environment (for example,
tied in with a Visual Studio Code extension). It empowers users to test and visualize HTTP API calls with custom headers, request bodies, and methods,
and instantly view responses, neatly formatted or raw.

## Project Structure

    * **dist/**: Contains built and optimized project files ready for deployment or consumption.
    * **node_modules/**: Holds project dependencies managed by npm.
    * **src/**: Core source files.
        * **src/App.vue**: Main Vue component entry file orchestrating the application components.

        * **src/components/**:

            * **ApiRequest.vue**: User interface for crafting and sending API requests.


            * **Response.vue**: Displays response data or error messages from your API calls.

        * **src/main.js**: Entry point for the Vue application setup.
    * **vite.config.ts**: Configuration file for building and bundling with Vite.

## Features

    * Supports HTTP methods: GET, POST, PUT, DELETE, PATCH.
    * Dynamically managed request headers.
    * Real-time JSON body validation and submission (for relevant HTTP methods).
    * Immediate and neatly formatted real-time response visualization (both JSON and raw response formats supported).
    * Basic error handling and notifications.

## Installation

    1. Navigate to the project folder:    cd kokis-webview
    2. Install the dependencies:    npm install

## Usage

    1. Run the application in development mode:    npm run serve
    2. Build the project for production:    npm run build

The app can be integrated into your projects or used alongside Visual Studio Code extensions that require HTTP interaction capabilities.

## Integration with VS Code Extension (kokis)

There's a corresponding Visual Studio Code extension located in ../kokis which utilizes this web interface for invoking and interacting with APIs within
 the VS Code environment, significantly streamlining the testing workflow of API endpoints directly from your editor.

## Development Guide

    * Vue.js and Vite are used for reactive UI components and efficient build configuration.
    * UI designs strive for simplicity, readability, and a pleasant user experience.

### Extending the WebView

To add new functionality:

    * Create or modify Vue components under `src/components/`.
    * Integrate components into the `App.vue`.

## Contribution Guidelines

    * Maintain code clarity.
    * Follow existing component structure and coding conventions.
    * Test changes thoroughly, especially with new endpoints or HTTP methods.
