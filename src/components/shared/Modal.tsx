import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactPortal from './ReactPortal';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import Loader from './Loader';

type FooterProps = {
    submitBtn?: {
        text: string;
        bindedFormId?: string;
        loading?: boolean;
        disabled?: boolean;
        onClick?: () => Promise<void>;
    };
    cancelBtn?: {
        text: string;
        onClick?: () => Promise<void>;
    };
};
type Props = {
    isOpen: boolean;
    title?: string;
    containerProps?: ContainerProps;
    footerProps?: FooterProps;
    handleClose: () => void;
};

const Modal = ({ children, isOpen, title, containerProps, footerProps, handleClose }: PropsWithChildren<Props>) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { submitBtn, cancelBtn } = footerProps || {};

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose?.();
            }
        };

        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [handleClose]);

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <CSSTransition in={isOpen} nodeRef={modalRef} timeout={{ enter: 0, exit: 300 }} unmountOnExit classNames="app-modal">
                <ModalWrapper className="app-modal" ref={modalRef}>
                    <Container {...containerProps}>
                        <Header>
                            <Title>{title}</Title>
                            <CloseButton
                                onClick={() => {
                                    handleClose?.();
                                }}
                            >
                                ✕
                            </CloseButton>
                        </Header>
                        <Content>{children}</Content>
                        {footerProps && (
                            <Footer>
                                {cancelBtn && (
                                    <Button type="button" onClick={cancelBtn.onClick} delete style={{ marginRight: 15 }}>
                                        {cancelBtn.text}
                                    </Button>
                                )}
                                {submitBtn && (
                                    <Button
                                        type={submitBtn.bindedFormId ? 'submit' : 'button'}
                                        form={submitBtn.bindedFormId}
                                        disabled={submitBtn.disabled}
                                        onClick={submitBtn.onClick}
                                    >
                                        {submitBtn.loading ? <Loader size={40} /> : submitBtn.text}
                                    </Button>
                                )}
                            </Footer>
                        )}
                    </Container>
                </ModalWrapper>
            </CSSTransition>
        </ReactPortal>
    );
};

export default Modal;

const ModalWrapper = styled.div``;

type ContainerProps = {
    width?: string;
    height?: string;
};
const Container = styled.div<ContainerProps>`
    width: ${(props) => props.width ?? '50%'};
    height: ${(props) => props.height ?? '50%'};
    max-width: 100%;
    max-height: 100%;
    background-color: #282c34;
    color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: ${(props) => props.theme.borderRadius};
    background: ${(props) => props.theme.cardBackground};
    color: ${(props) => props.theme.textColor};
`;

const Header = styled.div`
    padding: 5px 20px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${(props) => props.theme.textSize.title};
`;

const Content = styled.div`
    padding: 0 20px;
    padding-top: 0;
    height: calc(100% - 50px);
    box-sizing: border-box;
    font-size: ${(props) => props.theme.textSize.default};
    display: flex;
    flex-flow: column;
    justify-content: center;
    max-width: 100%;
`;
const Footer = styled.div`
    padding: 5px 25px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: ${(props) => props.theme.textSize.title};
`;

const CloseButton = styled.div`
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
`;

const Title = styled.div``;
