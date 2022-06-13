import styled from 'styled-components';
import { baseCardStyle } from '../../../shared/styles';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../shared/formInputs';
import { UserLoginPayload } from '../../../types/users/payloads';
import Button from '../../shared/Button';
import Link from '../../shared/Link';
import { RootState, Dispatch } from '../../../state/store';
import { connect, useSelector } from 'react-redux';
import { userSelectors } from '../../../state/models/user/selectors';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import Loader from '../../shared/Loader';

type Props = {
    login: (payload: UserLoginPayload) => Promise<void>;
};
const Login = ({ login }: Props) => {
    const navigate = useNavigate();
    const { error, loading } = useSelector(userSelectors.loginLoadingState);

    const initialValues: UserLoginPayload = {
        email: '',
        password: ''
    };

    const onSubmit = async (values: UserLoginPayload) => {
        await login(values);
        navigate('/dashboards');
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Required'),
        password: Yup.string().required('Required')
    });

    return (
        <PageContainer>
            <LoginFormContainer>
                <Title>Login</Title>
                <Formik<UserLoginPayload> initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(formik: FormikProps<UserLoginPayload>) => (
                        <Form className="form-container">
                            <TextInput label="Email" name="email" autoFocus />
                            <TextInput type="password" label="Password" name="password" />
                            {!!error && <ErrorMessage>{(error as Error).message}</ErrorMessage>}
                            <ButtonContainer>
                                <Button type="submit" disabled={!formik.isValid || formik.isSubmitting} fontSize="20px">
                                    {loading ? <Loader size={45} /> : 'Login'}
                                </Button>
                            </ButtonContainer>

                            <HaveAccountContainer>
                                <HaveAccountText>Don't have an account yet?</HaveAccountText>
                                <Link to="/register">
                                    <Button fontSize="12px">Register</Button>
                                </Link>
                            </HaveAccountContainer>
                        </Form>
                    )}
                </Formik>
            </LoginFormContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const LoginFormContainer = styled.div`
    ${baseCardStyle}
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    .form-container {
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width: 768px) {
            width: 80%;
        }
    }
`;

const Title = styled.div`
    font-size: ${(props) => props.theme.textSize.titleBig};
    font-weight: bold;
    margin: 30px 0;
`;

const ButtonContainer = styled.div`
    margin: 10px 0;
`;
const HaveAccountContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

const HaveAccountText = styled.div`
    margin-right: 5px;
    font-size: 12px;
`;

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
    login: (payload: UserLoginPayload) => dispatch.user.login(payload)
});

export default connect(mapState, mapDispatch)(Login);
