import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams.model';
import { mockResponseAllTeams, mockResponsePkTeam, mockResponseGetTeamNull } from './teams.mock';

import { Response } from 'superagent';

import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Teams', () => {

  describe('Caso de Sucesso', () => {

    describe('GET /teams', () => {

      beforeEach(() => {
        sinon
          .stub(Teams, 'findAll')
          .resolves(mockResponseAllTeams as unknown as Teams[]);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      });

      it('Deve retornar todos os times', async () => {
        const response = await chai.request(app).get('/teams')
        const teams = response.body
        console.log(teams.status)
        console.log(teams.body)

        expect(response.status).to.be.equal(200);
      });

    });

    describe('GET /teams/:id', () => {

      beforeEach(() => {
        sinon
          .stub(Teams, 'findByPk')
          .resolves(mockResponsePkTeam as unknown as Teams);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      })

      it('Deve retornar apenas 1 team', async () => {
        const response = await chai.request(app).get('/teams/1')
        const team = response.body
        console.log(team.status)
        console.log(team.body)

        expect(response.status).to.be.equal(200);
      });

    });
  });

  describe('Caso de falha', () => {

    describe('GET /teams', () => {

      beforeEach(() => {
        sinon
          .stub(Teams, 'findAll')
          .resolves(mockResponseGetTeamNull as unknown as Teams[]);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      });

      it('Deve retornar todos os times', async () => {
        const response = await chai.request(app).get('/teams')
        const teams = response.body

        expect(response.status).to.be.equal(404);
        expect(teams.message).to.be.equal('There are no teams registered');
      });
    });

    describe('GET /teams/:id', () => {

      beforeEach(() => {
        sinon
          .stub(Teams, 'findByPk')
          .resolves(mockResponseGetTeamNull as unknown as Teams);
      });

      afterEach(() => {
        sinon.restore();
        // (Users.findOne as sinon.SinonStub).restore();
      })

      it('Deve retornar apenas 1 team', async () => {
        const response = await chai.request(app).get('/teams/1')
        const team = response.body

        expect(response.status).to.be.equal(404);
        expect(team.message).to.be.equal('Team not found');
      });
    });
  });
});
