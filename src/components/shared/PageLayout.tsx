import styled from 'styled-components';
import PageHeader, { PageHeaderActionButtonType } from '../shared/PageHeader';

type Props = {
    title: string;
    children: React.ReactNode;
    goBackPath?: string;
    actionButtons?: PageHeaderActionButtonType[];
};
const PageLayout = ({ title, children, actionButtons, goBackPath }: Props) => {
    return (
        <PageContainer>
            <PageHeader actionButtons={actionButtons} goBackPath={goBackPath}>
                {title}
            </PageHeader>
            <ContentWrapper>
                <Content>{children}</Content>
            </ContentWrapper>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 24px;
    padding-bottom: 16px;
`;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 8px;
    overflow-y: auto;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

export default PageLayout;
