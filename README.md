# CRUD Operations REST API with Node.js, Express.js, and MySQL

This repository contains a simple project demonstrating CRUD (Create, Read, Update, Delete) operations using a RESTful API built with Node.js, Express.js, and MySQL raw queries.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project provides a basic RESTful API server for performing CRUD operations on a MySQL database. It utilizes Node.js for server-side scripting, Express.js as the web framework, and MySQL for database operations.

## Features

- Create, Read, Update, and Delete operations.
- RESTful API endpoints for interacting with the database.
- Simple and lightweight setup.
- Utilizes MySQL raw queries for database operations.

## Requirements

- Node.js
- MySQL
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/divyarajsinhsindhav/MySQL-CRUD.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MySQL-CRUD
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Configure MySQL settings in `config.js` file.

5. Create the MySQL database and table. You can use the SQL commands provided in `database.sql` file.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Access the API endpoints using a tool like Postman or curl.

## API Endpoints

- `GET /api/list` - Get all resources.
- `GET /api/list/:id` - Get a specific resource by ID.
- `POST /api/list` - Create a new resource.
- `PUT /api/list/:id` - Update a resource by ID.
- `DELETE /api/list/:id` - Delete a resource by ID.

Replace `resource` with your specific resource name.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or features you'd like to add.

## License

This project is licensed under the [MIT License](LICENSE).
