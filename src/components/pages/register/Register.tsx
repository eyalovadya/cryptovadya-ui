import styled from 'styled-components';
import { baseCardStyle } from '../../../shared/styles';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../shared/formInputs';
import { UserRegisterPayload } from '../../../types/users/payloads';
import Button from '../../shared/Button';
import Link from '../../shared/Link';
import { RootState, Dispatch } from '../../../state/store';
import { connect, useSelector } from 'react-redux';
import { userSelectors } from '../../../state/models/user/selectors';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../shared/ErrorMessage';
import Loader from '../../shared/Loader';

type Props = {
    register: (payload: UserRegisterPayload) => Promise<void>;
};

const Register = ({ register }: Props) => {
    const navigate = useNavigate();
    const { error, loading } = useSelector(userSelectors.registerLoadingState);

    const initialValues: UserRegisterPayload = {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    };

    const onSubmit = async (values: UserRegisterPayload) => {
        await register(values);
        navigate('/dashboards');
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Required'),
        firstName: Yup.string().min(2, 'First Name must be at least 2 characters').required('Required'),
        lastName: Yup.string().min(2, 'Last Name must be at least 2 characters').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    });

    return (
        <PageContainer>
            <RegisterFormContainer>
                <Title>Register</Title>
                <Formik<UserRegisterPayload> initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(formik: FormikProps<UserRegisterPayload>) => (
                        <Form className="form-container">
                            <TextInput label="Email" name="email" autoFocus />
                            <TextInput label="First Name" name="firstName" />
                            <TextInput label="Last Name" name="lastName" />
                            <TextInput type="password" label="Password" name="password" />
                            {!!error && <ErrorMessage>{(error as Error).message}</ErrorMessage>}
                            <ButtonContainer>
                                <Button type="submit" disabled={!formik.isValid || formik.isSubmitting} fontSize="20px">
                                    {loading ? <Loader size={45} /> : 'Register'}
                                </Button>
                            </ButtonContainer>

                            <HaveAccountContainer>
                                <HaveAccountText>Already have an account?</HaveAccountText>
                                <Link to="/login">
                                    <Button fontSize="12px">Login</Button>
                                </Link>
                            </HaveAccountContainer>
                        </Form>
                    )}
                </Formik>
            </RegisterFormContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RegisterFormContainer = styled.div`
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
    register: (payload: UserRegisterPayload) => dispatch.user.register(payload)
});

export default connect(mapState, mapDispatch)(Register);
