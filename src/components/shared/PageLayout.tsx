import styled from 'styled-components';
import PageHeader, { PageHeaderActionButtonType } from '../shared/PageHeader';

type Props = {
    title: string;
    children: React.ReactNode;
    actionButtons?: PageHeaderActionButtonType[];
};
const PageLayout = ({ title, children, actionButtons }: Props) => {
    return (
        <PageContainer>
            <PageHeader actionButtons={actionButtons}>{title}</PageHeader>
            <Content>{children}</Content>
        </PageContainer>
    );
};

const PageContainer = styled.div``;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export default PageLayout;
