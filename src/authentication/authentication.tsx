import { localSDK as client } from '../sdk';
import { loginResponse } from '../sdk/controllers/users/users';

class Authentication {
    private token?: string;

    public async Authenticate(username: string, password: string): Promise<loginResponse> {
        const loginResponse = await client.users().login(username, password);

        if (loginResponse.token) {
            this.SetToken(loginResponse.token);
        }

        return loginResponse;
    }

    public GetToken() {
        return this.token;
    }

    public SetToken(token: string) {
        this.token = token;
    }
}
export default new Authentication();
