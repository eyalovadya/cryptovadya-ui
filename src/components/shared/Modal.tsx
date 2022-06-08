import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactPortal from './ReactPortal';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';

type FooterProps = {
    submitBtn?: {
        text: string;
        bindedFormId: string;
        loading?: boolean;
        disabled?: boolean;
    };
};
type Props = {
    isOpen: boolean;
    title?: string;
    containerProps?: ContainerProps;
    footerProps?: FooterProps;
    setIsOpen: (isOpen: boolean) => void;
    handleClose?: () => void;
};

const Modal = ({ children, isOpen, title, containerProps, footerProps, handleClose, setIsOpen }: PropsWithChildren<Props>) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose?.();
                setIsOpen(false);
            }
        };

        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [handleClose, setIsOpen]);

    return (
        <CSSTransition in={isOpen} nodeRef={modalRef} timeout={{ enter: 0, exit: 300 }} mountOnEnter unmountOnExit classNames="modal">
            <ReactPortal wrapperId="react-portal-modal-container">
                <ModalWrapper>
                    <Container className="modal" ref={modalRef} {...containerProps}>
                        <Header>
                            <Title>{title}</Title>
                            <CloseButton
                                onClick={() => {
                                    handleClose?.();
                                    setIsOpen(false);
                                }}
                            >
                                ✖
                            </CloseButton>
                        </Header>
                        <Content>{children}</Content>
                        {footerProps && (
                            <Footer>
                                {footerProps.submitBtn && (
                                    <Button type="submit" form={footerProps.submitBtn.bindedFormId} disabled={footerProps.submitBtn.disabled}>
                                        {footerProps.submitBtn.loading ? 'loading...' : footerProps.submitBtn.text}
                                    </Button>
                                )}
                            </Footer>
                        )}
                    </Container>
                </ModalWrapper>
            </ReactPortal>
        </CSSTransition>
    );
};

export default Modal;

const ModalWrapper = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 999;
    padding: 40px 20px 20px;

    .modal {
        opacity: 0;
        transition: all 300ms ease-in-out;
    }

    .modal-enter-done {
        opacity: 1;
    }
    .modal-exit {
        opacity: 0;
    }
`;

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
`;
const Footer = styled.div`
    padding: 5px 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: ${(props) => props.theme.textSize.title};
`;

const CloseButton = styled.div`
    cursor: pointer;
`;

const Title = styled.div``;
