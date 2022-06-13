import { useField, FieldHookConfig } from 'formik';
import styled from 'styled-components';

type Props = {
    label: string;
    autoFocus?: boolean;
} & FieldHookConfig<string>;

const TextInput = ({ label, autoFocus, ...props }: Props) => {
    const [field, meta] = useField(props);
    const hasError = meta.touched && !!meta.error;

    return (
        <Container>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Input autoFocus={autoFocus} {...field} placeholder={props.placeholder} type={props.type} hasError={hasError} />
            <ErrorMessage>{hasError ? meta.error : ''}</ErrorMessage>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

type InputProps = {
    hasError?: boolean;
};
const Input = styled.input<InputProps>`
    outline: none;
    width: 100%;
    padding: 12px 20px;
    margin-top: 8px;
    box-sizing: border-box;
    border-radius: 14px;
    border: none;
    background-color: ${(props) => props.theme.input.backgroundColor};
    font-size: ${(props) => props.theme.input.fontSize};
    color: ${(props) => props.theme.textColor};

    border: 1px solid ${(props) => (props.hasError ? 'red' : props.theme.input.backgroundColor)};

    &:focus {
        border: 1px solid ${(props) => props.theme.colors.primaryHover};
    }
`;

const ErrorMessage = styled.div`
    color: red;
    height: 16px;
    font-size: ${(props) => props.theme.textSize.small};
    margin-bottom: 8px;
`;
export default TextInput;
