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
    position: relative;
`;

const ContentWrapper = styled.div`
    flex: 1;
    padding: 10px 24px 16px 24px;
    padding-bottom: 16px;
`;

const Content = styled.div`
    height: 100%;
`;

export default PageLayout;
