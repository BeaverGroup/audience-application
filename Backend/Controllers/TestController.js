import unittest
import requests # pip install requests
from unittest.mock import MagicMock, patch
from voteController import addVote, removeVote
from subController import addSub, unSub
from authController import registerUser, loginUser, loginGoogle


class TestAPIFunctions(unittest.TestCase):
    base_url = "http://localhost:4004"

    def setUp(self):
        registration_url = f"{self.base_url}/register"
        registration_data = {
            'Name': 'John',
            'Gender': 'Male',
            'Age': 25,
            'Nationality': 'US',
            'Password': 'password123',
            'Email': 'john@example.com'
        }
        response = requests.post(registration_url, json=registration_data)
        self.assertEqual(response.status_code, 201)

        login_url = f"{self.base_url}/login"
        login_data = {
            'Email': 'john@example.com',
            'Password': 'password123'
        }
        response = requests.post(login_url, json=login_data)
        self.assertEqual(response.status_code, 201)

        self.token = response.cookies.get('authToken')

    def tearDown(self):
        delete_user_url = f"{self.base_url}/removeByEmail"
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.delete(delete_user_url, json={'Email': 'john@example.com'}, headers=headers)
        self.assertEqual(response.status_code, 200)


class TestVoteFunctions(TestAPIFunctions):

    @patch('voteController.user_model')
    def test_add_vote(self, mock_user_model):
        mock_request = MagicMock()
        mock_request.params.id = 'user_id'
        mock_request.body.matchID = 'some_match_id'
        mock_request.body.vote = 'some_vote'

        mock_response = MagicMock()

        mock_user_data = {
            "_id": "user_id",
            "Votes": []
        }

        mock_user_model.findById.return_value = mock_user_data
        mock_user_model.save.return_value = None

        addVote(mock_request, mock_response)

        mock_user_model.findById.assert_called_once_with('user_id')
        mock_user_model.save.assert_called_once()
        mock_response.json.assert_called_once_with({'message': 'Successfully voted for matchID some_match_id.'})

    @patch('voteController.user_model')
    def test_remove_vote(self, mock_user_model):
        mock_request = MagicMock()
        mock_request.params.id = 'user_id'
        mock_request.body.matchID = 'some_match_id'

        mock_response = MagicMock()

        mock_user_data = {
            "_id": "user_id",
            "Votes": [{"matchID": "some_match_id", "vote": "some_vote"}]
        }

        mock_user_model.findById.return_value = mock_user_data
        mock_user_model.save.return_value = None

        removeVote(mock_request, mock_response)

        mock_user_model.findById.assert_called_once_with('user_id')
        mock_user_model.save.assert_called_once()
        mock_response.json.assert_called_once_with({'message': 'Successfully removed your vote for matchID '
                                                               'some_match_id.'})


class TestSubscriptionFunctions(TestAPIFunctions):

    @patch('subController.user_model')
    def test_add_subscription(self, mock_user_model):
        mock_request = MagicMock()
        mock_request.params.id = 'user_id'
        mock_request.body.Sport = 'football'

        mock_response = MagicMock()

        mock_user_data = {
            "_id": "user_id",
            "Subscribe": []
        }

        mock_user_model.findById.return_value = mock_user_data
        mock_user_model.save.return_value = None

        addSub(mock_request, mock_response)

        mock_user_model.findById.assert_called_once_with('user_id')
        mock_user_model.save.assert_called_once()
        mock_response.json.assert_called_once_with({'message': 'Successfully subscribed to football.'})

    @patch('subController.user_model')
    def test_unsubscribe(self, mock_user_model):
        mock_request = MagicMock()
        mock_request.params.id = 'user_id'
        mock_request.body.Sport = 'football'

        mock_response = MagicMock()

        mock_user_data = {
            "_id": "user_id",
            "Subscribe": ["football", "basketball"]
        }

        mock_user_model.findById.return_value = mock_user_data
        mock_user_model.save.return_value = None

        unSub(mock_request, mock_response)

        mock_user_model.findById.assert_called_once_with('user_id')
        mock_user_model.save.assert_called_once()
        mock_response.json.assert_called_once_with({'message': 'Successfully Unsubscribed to football.'})


class TestAuthenticationFunctions(TestAPIFunctions):

    @patch('authController.user_model')
    @patch('authController.bcrypt.hash')
    @patch('authController.jwt.sign')
    def test_register_user(self, mock_jwt_sign, mock_bcrypt_hash, mock_user_model):
        mock_request = MagicMock()
        mock_request.body = {
            'Name': 'John',
            'Gender': 'Male',
            'Age': 25,
            'Nationality': 'US',
            'Password': 'password123',
            'Email': 'john@example.com'
        }
        mock_response = MagicMock()

        mock_user_model.findOne.return_value = None
        mock_bcrypt_hash.return_value = 'hashed_password'
        mock_jwt_sign.return_value = 'token'

        registerUser(mock_request, mock_response)

        mock_user_model.findOne.assert_called_once_with({'Email': 'john@example.com'})
        mock_bcrypt_hash.assert_called_once_with('password123', 10)
        mock_user_model.assert_called_once_with({
            'Name': 'John',
            'Gender': 'Male',
            'Age': 25,
            'Nationality': 'US',
            'Password': 'hashed_password',
            'Email': 'john@example.com'
        })
        mock_user_model.return_value.save.assert_called_once()
        mock_jwt_sign.assert_called_once_with({'Email': 'john@example.com', '_id': None, 'Role': None},
                                              'SECRET_KEY', expires_in='3d')
        mock_response.status.assert_called_once_with(201)
        mock_response.cookie.assert_called_once_with('authToken', 'token', max_age=259200000, secure=False)
        mock_response.json.assert_called_once_with({
            'message': 'User account created successfully.',
            'token': 'token',
            'user': None
        })

    @patch('authController.user_model')
    @patch('authController.bcrypt.compare')
    @patch('authController.jwt.sign')
    def test_login_user(self, mock_jwt_sign, mock_bcrypt_compare, mock_user_model):
        mock_request = MagicMock()
        mock_request.body = {
            'Email': 'john@example.com',
            'Password': 'password123'
        }
        mock_response = MagicMock()

        mock_user_model.findOne.return_value = MagicMock(
            Email='john@example.com', _id='user_id', Role='User', Password='hashed_password'
        )
        mock_bcrypt_compare.return_value = True
        mock_jwt_sign.return_value = 'token'

        loginUser(mock_request, mock_response)

        mock_user_model.findOne.assert_called_once_with({'Email': 'john@example.com'})
        mock_bcrypt_compare.assert_called_once_with('password123', 'hashed_password')
        mock_jwt_sign.assert_called_once_with({'Email': 'john@example.com', '_id': 'user_id', 'Role': 'User'},
                                              'SECRET_KEY', expires_in='3d')
        mock_response.status.assert_called_once_with(201)
        mock_response.cookie.assert_called_once_with('authToken', 'token', max_age=259200000, secure=False)
        mock_response.json.assert_called_once_with({
            'message': 'User account created successfully.',
            'user': {
                'Email': 'john@example.com',
                '_id': 'user_id',
                'Role': 'User'
            }
        })

    @patch('authController.user_model')
    @patch('authController.jwt.sign')
    def test_login_google(self, mock_jwt_sign, mock_user_model):
        mock_request = MagicMock()
        mock_request.body = {'Email': 'john@example.com'}
        mock_response = MagicMock()

        mock_user_model.findOne.return_value = MagicMock(
            Email='john@example.com', _id='user_id', Role='User'
        )
        mock_jwt_sign.return_value = 'token'

        loginGoogle(mock_request, mock_response)

        mock_user_model.findOne.assert_called_once_with({'Email': 'john@example.com'})
        mock_jwt_sign.assert_called_once_with({'Email': 'john@example.com', '_id': 'user_id', 'Role': 'User'},
                                              'SECRET_KEY', expires_in='3d')
        mock_response.status.assert_called_once_with(201)
        mock_response.cookie.assert_called_once_with('authToken', 'token', max_age=259200000, secure=False)
        mock_response.json.assert_called_once_with({
            'message': 'Login success',
            'token': 'token',
            'user': {
                'Email': 'john@example.com',
                '_id': 'user_id',
                'Role': 'User'
            }
        })


if __name__ == '__main__':
    unittest.main()