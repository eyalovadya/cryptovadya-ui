import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../shared/Modal';
import CreateDashboardModalContent from './CreateDashboardModalContent';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { CreateDashboardPayload } from '../../../../../types/dashboard/payloads';
import { RootState, Dispatch } from '../../../../../state/store';
import { connect } from 'react-redux';

type FormValues = {
    dashboardName: string;
};

type Props = {
    createDashboard: (payload: CreateDashboardPayload) => Promise<void>;
};

const CreateDashboardModal = ({ createDashboard }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        navigate('dashboards');
    };

    const initialValues: FormValues = {
        dashboardName: ''
    };

    const onSubmit = async (values: FormValues) => {
        await createDashboard({
            title: values.dashboardName
        });
        navigate('dashboards');
        setIsOpen(false);
    };

    const validationSchema = Yup.object({
        dashboardName: Yup.string().min(3, 'Must be 3 characters or more').max(50, 'Must be 50 characters or less').required('Required')
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik: FormikProps<FormValues>) => (
                <Form
                    id="new-dashboard-form"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            formik.handleSubmit();
                        }
                    }}
                >
                    <Modal
                        isOpen={isOpen}
                        handleClose={handleClose}
                        setIsOpen={setIsOpen}
                        title="New Dashboard"
                        containerProps={{
                            width: '400px',
                            height: '250px'
                        }}
                        footerProps={{
                            submitBtn: {
                                bindedFormId: 'new-dashboard-form',
                                text: 'Create',
                                loading: formik.isSubmitting,
                                disabled: !formik.isValid || !formik.dirty
                            }
                        }}
                    >
                        <CreateDashboardModalContent />
                    </Modal>
                </Form>
            )}
        </Formik>
    );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
    createDashboard: (payload: CreateDashboardPayload) => dispatch.dashboards.createDashboard(payload)
});

export default connect(mapState, mapDispatch)(CreateDashboardModal);
