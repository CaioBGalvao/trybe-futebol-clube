import * as jwt from 'jsonwebtoken';

const JWT_Payload: jwt.JwtPayload = { email: 'test@mock.com'};
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secret';
const JWT_OPTIONS: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

const mockSendPostLogin = {
  email: 'teste@mock.com',
  password: 'secret_admin'
}
const mockSendInvalidPostLoginEmail = {
  email: '',
  password: 'secret_admin'
}

const mockSendInvalidPostLoginPassword = {
  email: 'teste@mock.com',
  password: 'souumasenhainvalida'
}

const mockResolvePostLogin = {
  email: 'teste@mock.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const tokenValido = jwt.sign(JWT_Payload, JWT_SECRET, JWT_OPTIONS);


const tokenInvalido = 'eusouumtokeninvalido';

const mockResolveGetLogin = {
  role: 'test'
}

const mockSendFail = null

export {
  mockSendPostLogin,
  mockSendInvalidPostLoginEmail,
  mockSendInvalidPostLoginPassword,
  mockResolvePostLogin,
  mockSendFail,
  tokenValido,
  tokenInvalido,
  mockResolveGetLogin
}