import request from 'supertest'
import randomString from 'random-string'
import models from '../models'
import userRepo from '../repositories/user'

const app = require('../app');

afterAll(() => models.sequelize.close());

describe('로그인 테스트', () => {

    let userData;

    beforeAll(async () => {
        userData = {
            nickname: randomString(),
            password: randomString(),
            name: randomString()
        };

        // 테스트용 사용자 생성
        await userRepo.store(userData)
    });

    test('실제 로그인 테스트. | 200', async () => {
        let response = await request(app)
            .post('/auth/signin')
            .send({
                nickname: userData.nickname,
                password: userData.password
            });
        console.log(response.body)
        expect(response.statusCode)
            .toBe(200);
        expect(response.body.token)
            .toBeTruthy()
    });

    test('잘못된 인증정보로 로그인. | 400', async () => {
        let response = await request(app)
            .post('/auth/signin')
            .send({
                nickname: 'notFound',
                password: 'wrongPassword'
            });

        expect(response.statusCode)
            .toBe(400);
        expect(response.body.message)
            .toBe('Incorrect ID or password.')
    });
});