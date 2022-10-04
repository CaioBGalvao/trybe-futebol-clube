import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users.model';

import { Response } from 'superagent';
import { mockResolveGetLogin, mockResolvePostLogin, mockSendFail, mockSendInvalidPostLoginEmail, mockSendInvalidPostLoginPassword, mockSendPostLogin, tokenInvalido, tokenValido } from './mocks';
import ILogin from '../interfaces';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota login', () => {

  describe('Caso de Sucesso', () => {

    describe('POST /login', () => {

      beforeEach(() => {
        sinon
          .stub(Users, 'findOne')
          .resolves(mockResolvePostLogin as unknown as Users);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      });

      it('Deve retornar o token', async () => {
        const response = await chai.request(app).post('/login').send(mockSendPostLogin);
        const token = response.body

        expect(response.status).to.be.equal(200);
        expect(token).to.have.property('token');
      });

    });

    describe('GET /login', () => {

      beforeEach(() => {
        sinon
          .stub(Users, 'findOne')
          .resolves(mockResolveGetLogin as unknown as Users);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      })

      it('Deve retornar a role', async () => {
        const bodyMessage = { role: 'test' }
        const response = await chai.request(app).get('/login/validate').set('authorization', tokenValido);
        const role = response.body

        expect(response.status).to.be.equal(200);
        expect(role).to.have.property('role');
        expect(role).to.be.deep.equal(bodyMessage);
      });

    });
  });

  describe('Caso de falha', () => {

    describe('Token', () => {
      it('Deve retornar o um erro token inexistente', async () => {
        const statusCode = 401;
        const bodyMessage = { message: 'Token não encontrado' }
        const response = await chai.request(app)
          .get('/login/validate').set('authorization', '');

        expect(response.status).to.be.equal(statusCode);
        expect(response.body).to.have.property('message');
        expect(response.body).to.be.deep.equal(bodyMessage);
      });
    });

    describe('Joi', () => {
      it('Deve retornar o um erro ', async () => {
        const statusCode = 400;
        const bodyMessage = { message: 'All fields must be filled' }
        const response = await chai.request(app)
          .post('/login').send(mockSendInvalidPostLoginEmail);

        expect(response.status).to.be.equal(statusCode);
        expect(response.body).to.have.property('message');
        expect(response.body).to.be.deep.equal(bodyMessage);
      });
    });

    describe('POST /login', () => {

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      });

      it('Deve retornar status 401 com menssagem para email', async () => {
        sinon
          .stub(Users, 'findOne')
          .resolves(mockSendFail as unknown as Users);
        const bodyMessage = { message: 'Incorrect email or password' }
        const response = await chai.request(app).post('/login').send(mockSendPostLogin);
        const menssage = response.body

        expect(response.status).to.be.equal(401);
        expect(menssage).to.have.property('message');
        expect(menssage).to.be.deep.equal(bodyMessage);
      });

      it('Deve retornar status 401 com menssagem para senha', async () => {
        sinon
          .stub(Users, 'findOne')
          .resolves(mockResolvePostLogin as unknown as Users);
        const bodyMessage = { message: 'Incorrect email or password' }
        const response = await chai.request(app).post('/login').send(mockSendInvalidPostLoginPassword);
        const menssage = response.body

        expect(response.status).to.be.equal(401);
        expect(menssage).to.have.property('message');
        expect(menssage).to.be.deep.equal(bodyMessage);
      });
    });

    describe('GET /login/validate', () => {

      beforeEach(() => {
        sinon.restore();
        sinon
          .stub(Users, 'findOne')
          .resolves(mockSendFail as unknown as Users);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      });

      it('Deve retornar o um erro token invalido', async () => {
        const statusCode = 401;
        const bodyMessage = { message: 'Expired or invalid token' }
        const response = await chai.request(app)
          .get('/login/validate').set('authorization', tokenInvalido);

        expect(response.status).to.be.equal(statusCode);
        expect(response.body).to.have.property('message');
        expect(response.body).to.be.deep.equal(bodyMessage);
      });

      it('Deve retornar usuário não contrado', async () => {
        const statusCode = 404;
        const bodyMessage = { message: 'User not found' }
        const response = await chai.request(app)
          .get('/login/validate').set('authorization', tokenValido);

        expect(response.status).to.be.equal(statusCode);
        expect(response.body).to.have.property('message');
        expect(response.body).to.be.deep.equal(bodyMessage);
      });
    });
  });
});
