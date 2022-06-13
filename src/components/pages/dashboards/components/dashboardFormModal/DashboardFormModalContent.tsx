import styled from 'styled-components';
import TextInput from '../../../../shared/formInputs/TextInput';

const CreateDashboardModalContent = () => {
    return (
        <Container>
            <TextInput label="Dashboard Name" name="dashboardName" autoFocus />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default CreateDashboardModalContent;
