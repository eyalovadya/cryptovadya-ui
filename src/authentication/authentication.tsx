import { localSDK as client } from '../sdk';
import { UserLoginPayload } from '../types/users/payloads';
import { UserLoginResponse } from '../types/users/responses';

class Authentication {
    private token?: string;

    public async Authenticate(payload: UserLoginPayload): Promise<UserLoginResponse> {
        const loginResponse = await client.users().login(payload);

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
