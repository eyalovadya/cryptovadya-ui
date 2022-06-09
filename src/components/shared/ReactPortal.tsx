import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    children: React.ReactNode;
    wrapperId?: string;
};

const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: Props) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let isNewElement = false;
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            isNewElement = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);

        return () => {
            // delete the programatically created element
            if (isNewElement && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    // wrapperElement state will be null on the very first render.
    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
};

export default ReactPortal;

const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
};
