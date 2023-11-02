# API Documentation

## Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
- [User Endpoints](#user-endpoints)
- [Vote Endpoints](#vote-endpoints)
- [Subscription Endpoints](#subscription-endpoints)

---

## Authentication Endpoints

### Register

- **Endpoint**: `/register`
- **HTTP Method**: `POST`
- **Description**: Register a new user.
  
  **Request Body**:
    - `Name` (string)
    - `Gender` (string)
    - `Age` (number)
    - `Nationality` (string)
    - `Password` (string)
    - `Email` (string)

### Login

- **Endpoint**: `/login`
- **HTTP Method**: `POST`
- **Description**: Authenticate and log in a user.

  **Request Body**:
    - `Password` (string)
    - `Email` (string)

### Google Login

- **Endpoint**: `/google-login`
- **HTTP Method**: `POST`
- **Description**: Authenticate and log in a user using Google OAuth.

  **Request Body**:
    - `Token` (string)
    - `Email` (string)

---

## User Endpoints

### Retrieve User Information by Email

- **Endpoint**: `/infoByEmail`
- **HTTP Method**: `GET`
- **Description**: Fetch user details using their email address.

  **Request Body**:
    - `Email` (string)

### Retrieve User Information by ID

- **Endpoint**: `/infoByID`
- **HTTP Method**: `GET`
- **Description**: Fetch user details using their unique ID.

  **Request Body**:
    - `_id` (ObjectId)

### Retrieve All Users' Information

- **Endpoint**: `/list`
- **HTTP Method**: `GET`
- **Description**: Fetch details of all users.

### Update User Information by ID

- **Endpoint**: `/updateByID`
- **HTTP Method**: `POST`
- **Description**: Update user details using their unique ID.

  **Request Body**:
    - `Name` (string)
    - `Gender` (string)
    - `Age` (number)
    - `Nationality` (string)
    - `_id` (ObjectId)

### Update User Information by Email

- **Endpoint**: `/updateByEmail`
- **HTTP Method**: `POST`
- **Description**: Update user details using their email address.

  **Request Body**:
    - `Name` (string)
    - `Gender` (string)
    - `Age` (number)
    - `Nationality` (string)
    - `Email` (string)

### Remove User by ID

- **Endpoint**: `/removeByID`
- **HTTP Method**: `DELETE`
- **Description**: Delete a user using their unique ID.

  **Request Body**:
    - `_id` (ObjectId)

### Remove User by Email

- **Endpoint**: `/removeByEmail`
- **HTTP Method**: `DELETE`
- **Description**: Delete a user using their email address.

  **Request Body**:
    - `Email` (string)

---

## Vote Endpoints

### Add Vote

- **Endpoint**: `/vote/:id`
- **HTTP Method**: `POST`
- **Description**: Add or update a vote for a match by a user.
  
  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `matchID` (string): The ID of the match.
    - `vote` (string): The vote value.

### Remove Vote

- **Endpoint**: `/unvote/:id`
- **HTTP Method**: `DELETE`
- **Description**: Remove a vote for a match by a user.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `matchID` (string): The ID of the match.

### Retrieve All Votes for a User

- **Endpoint**: `/userAllvote/:id`
- **HTTP Method**: `GET`
- **Description**: Get all votes associated with a user.

  **Request Parameters**:
    - `id`: User ID

---

## Subscription Endpoints

### Add Subscription

- **Endpoint**: `/subscribe/:id`
- **HTTP Method**: `POST`
- **Description**: Add a single sport to user's subscriptions.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `Sport` (string): The sport to be subscribed to.

### Remove Subscription

- **Endpoint**: `/unsubscribe/:id`
- **HTTP Method**: `DELETE`
- **Description**: Remove a sport from user's subscriptions.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `Sport` (string): The sport to be unsubscribed from.

### Retrieve All Subscriptions for a User

- **Endpoint**: `/userAllsub/:id`
- **HTTP Method**: `GET`
- **Description**: Get all sports the user is subscribed to.

  **Request Parameters**:
    - `id`: User ID

### Update Subscriptions

- **Endpoint**: `/updateSub/:id`
- **HTTP Method**: `POST`
- **Description**: Replace all current subscriptions of a user with a new list.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `Sport` (array): The updated list of sports to be subscribed to.