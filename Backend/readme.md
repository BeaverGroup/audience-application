# User API Documentation

## 1. Register User
- **Endpoint**: `/user/register`
- **HTTP Method**: `POST`
- **Description**: Register a new user.

  **Request Body**:
  - `Name` (string) - Name of the user.
  - `Gender` (string) - Gender of the user (e.g., Male, Female, Other).
  - `Age` (number) - Age of the user.
  - `Nationality` (string) - Nationality of the user.
  - `Password` (string) - Password for the user's account.
  - `Email` (string) - Email address of the user.

## 2. Login User
- **Endpoint**: `/user/login`
- **HTTP Method**: `POST`
- **Description**: Authenticate and log in a user.

  **Request Body**:
  - `Password` (string) - Password for the user's account.
  - `Email` (string) - Email address of the user.

## 3. Retrieve User Information by Email
- **Endpoint**: `/user/info/email`
- **HTTP Method**: `GET`
- **Description**: Fetch user details using their email address.

  **Request Body**:
  - `Email` (string) - Email address of the user.

## 4. Retrieve User Information by ID
- **Endpoint**: `/user/info/id`
- **HTTP Method**: `GET`
- **Description**: Fetch user details using their unique ID.

  **Request Body**:
  - `_id` (ObjectId) - The unique ID of the user.

## 5. Retrieve All Users' Information
- **Endpoint**: `/user/info/all`
- **HTTP Method**: `GET`
- **Description**: Fetch details of all users.

## 6. Remove User by Email
- **Endpoint**: `/user/remove/email`
- **HTTP Method**: `DELETE`
- **Description**: Delete a user using their email address.

  **Request Body**:
  - `Email` (string) - Email address of the user.

## 7. Remove User by ID
- **Endpoint**: `/user/remove/id`
- **HTTP Method**: `DELETE`
- **Description**: Delete a user using their unique ID.

  **Request Body**:
  - `_id` (ObjectId) - The unique ID of the user.

## 8. Update User by Email
- **Endpoint**: `/user/update/email`
- **HTTP Method**: `POST`
- **Description**: Update user details using their email address.

  **Request Body**:
  - `Name` (string) - Updated name of the user.
  - `Gender` (string) - Updated gender of the user.
  - `Age` (number) - Updated age of the user.
  - `Nationality` (string) - Updated nationality of the user.
  - `Email` (string) - Email address for identifying the user.

## 9. Update User by ID
- **Endpoint**: `/user/update/id`
- **HTTP Method**: `POST`
- **Description**: Update user details using their unique ID.

  **Request Body**:
  - `Name` (string) - Updated name of the user.
  - `Gender` (string) - Updated gender of the user.
  - `Age` (number) - Updated age of the user.
  - `Nationality` (string) - Updated nationality of the user.
  - `_id` (ObjectId) - The unique ID for identifying the user.

## 10. Google Token Verification
- **Endpoint**: `/user/verify/google-token`
- **HTTP Method**: `POST`
- **Description**: Verify the authenticity of a Google OAuth token.

  **Request Body**:
  - `Token` (string) - Google OAuth token.
  - `Email` (string) - Email address associated with the Google OAuth token.

