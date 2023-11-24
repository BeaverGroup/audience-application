# API Documentation

## Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
- [User Endpoints](#user-endpoints)
- [Vote Endpoints](#vote-endpoints)
- [Subscription Endpoints](#subscription-endpoints)

---

## About

This API allows clients to interact with our user, voting, and subscription services. To ensure secure access to our services, clients must first authenticate using our Authentication Endpoints. Upon successful authentication, users will receive a cookie token that must be included in the header of subsequent requests. This token is required to access User Endpoints, Vote Endpoints, and Subscription Endpoints. The token serves as a credential to verify the identity of the user and to authorize requests to create, retrieve, update, or delete resources within the system.

### Authentication Workflow

1. **Register or Login or Google Login**: Clients begin by registering a new user or logging in with existing credentials.
   
2. **Receive Authentication Token**: After authentication, the system issues a cookie token that the client must store securely.

3. **Access Resources**: The cookie token is used to access various endpoints, allowing the client to manage user profiles, votes, and subscriptions.

Clients should authenticate via traditional login or through Google Login for users opting for OAuth integration. The token received after authentication should be kept confidential and used as per the security guidelines provided.

---

## Authentication Endpoints

### Register

- **Endpoint**: `auth/register`
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

- **Endpoint**: `auth/login`
- **HTTP Method**: `POST`
- **Description**: Authenticate and log in a user.

  **Request Body**:
    - `Password` (string)
    - `Email` (string)

### Google Login

- **Endpoint**: `auth/google-login`
- **HTTP Method**: `POST`
- **Description**: Authenticate and log in a user using Google OAuth.

  **Request Body**:
    - `Token` (string)
    - `Email` (string)

---

## User Endpoints

### Retrieve User Information by Email

- **Endpoint**: `user/infoByEmail/:Email`
- **HTTP Method**: `GET`
- **Description**: Fetch user details using their email address.

  **Request Body**:
    - `Email` (string)

### Retrieve User Information by ID

- **Endpoint**: `user/infoByID/:_id`
- **HTTP Method**: `GET`
- **Description**: Fetch user details using their unique ID.

  **Request Body**:
    - `_id` (ObjectId)

### Retrieve All Users' Information

- **Endpoint**: `user/list`
- **HTTP Method**: `GET`
- **Description**: Fetch details of all users.

### Update User Information by ID

- **Endpoint**: `user/updateByID`
- **HTTP Method**: `POST`
- **Description**: Update user details using their unique ID.

  **Request Body**:
    - `Name` (string)
    - `Gender` (string)
    - `Age` (number)
    - `Nationality` (string)
    - `_id` (ObjectId)

### Update User Information by Email

- **Endpoint**: `user/updateByEmail`
- **HTTP Method**: `POST`
- **Description**: Update user details using their email address.

  **Request Body**:
    - `Name` (string)
    - `Gender` (string)
    - `Age` (number)
    - `Nationality` (string)
    - `Email` (string)

### Remove User by ID

- **Endpoint**: `user/removeByID`
- **HTTP Method**: `DELETE`
- **Description**: Delete a user using their unique ID.

  **Request Body**:
    - `_id` (ObjectId)

### Remove User by Email

- **Endpoint**: `user/removeByEmail`
- **HTTP Method**: `DELETE`
- **Description**: Delete a user using their email address.

  **Request Body**:
    - `Email` (string)

---

## Vote Endpoints

### Add Vote

- **Endpoint**: `user/vote/:id`
- **HTTP Method**: `POST`
- **Description**: Add or update a vote for a match by a user.
  
  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `matchID` (string): The ID of the match.
    - `vote` (string): The vote value.

### Remove Vote

- **Endpoint**: `user/unvote/:id`
- **HTTP Method**: `DELETE`
- **Description**: Remove a vote for a match by a user.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `matchID` (string): The ID of the match.

### Retrieve All Votes for a User

- **Endpoint**: `user/userAllvote/:id`
- **HTTP Method**: `GET`
- **Description**: Get all votes associated with a user.

  **Request Parameters**:
    - `id`: User ID

---

## Subscription Endpoints

### Add Subscription

- **Endpoint**: `user/subscribe/:id`
- **HTTP Method**: `POST`
- **Description**: Add a single sport to user's subscriptions.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `Sport` (string): The sport to be subscribed to.

### Remove Subscription

- **Endpoint**: `user/unsubscribe/:id`
- **HTTP Method**: `POST`
- **Description**: Remove a sport from user's subscriptions.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `Sport` (string): The sport to be unsubscribed from.

### Retrieve All Subscriptions for a User

- **Endpoint**: `user/userAllsub/:id`
- **HTTP Method**: `GET`
- **Description**: Get all sports the user is subscribed to.

  **Request Parameters**:
    - `id`: User ID

### Update Subscriptions

- **Endpoint**: `user/updateSub/:id`
- **HTTP Method**: `POST`
- **Description**: Replace all current subscriptions of a user with a new list.

  **Request Parameters**:
    - `id`: User ID
  
  **Request Body**:
    - `Sport` (array): The updated list of sports to be subscribed to.

---

Remember to follow the appropriate protocol for secure handling of authentication tokens and personal user data as per your service's privacy policy and best security practices.
