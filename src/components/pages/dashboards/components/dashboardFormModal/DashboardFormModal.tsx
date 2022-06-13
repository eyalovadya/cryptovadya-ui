import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../../../shared/Modal';
import DashboardFormModalContent from './DashboardFormModalContent';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { CreateDashboardPayload, UpdateDashboardPayload } from '../../../../../types/dashboards/payloads';
import { RootState, Dispatch } from '../../../../../state/store';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dashboard } from '../../../../../types/dashboards';

type FormValues = {
    dashboardName: string;
};

export enum DashboardFormMode {
    NEW,
    EDIT
}
type Props = {
    mode: DashboardFormMode;
    createDashboard: (payload: CreateDashboardPayload) => Promise<void>;
    updateDashboard: (payload: UpdateDashboardPayload) => Promise<void>;
};

const DashboardFormModal = ({ mode = DashboardFormMode.NEW, createDashboard, updateDashboard }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    const dashboard = (location.state as { dashboard?: Dashboard }).dashboard;
    const isEdit = mode === DashboardFormMode.EDIT && dashboard;

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
        navigate(-1);
    };

    const initialValues: FormValues = {
        dashboardName: isEdit ? dashboard.title : ''
    };

    const onSubmit = async (values: FormValues) => {
        if (isEdit) {
            await updateDashboard({
                dashboardId: dashboard.id,
                title: values.dashboardName
            });
        } else {
            await createDashboard({
                title: values.dashboardName
            });
        }

        handleClose();
    };

    const validationSchema = Yup.object({
        dashboardName: Yup.string().min(3, 'Must be 3 characters or more').max(60, 'Must be 60 characters or less').required('Required')
    });

    const modalTitle = `${isEdit ? 'Edit' : 'New'} Dashboard`;
    const submitText = isEdit ? 'Update' : 'Create';

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik: FormikProps<FormValues>) => (
                <Form
                    id="new-dashboard-form"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !formik.isSubmitting) {
                            formik.handleSubmit();
                        }
                    }}
                >
                    <Modal
                        isOpen={isOpen}
                        handleClose={handleClose}
                        title={modalTitle}
                        containerProps={{
                            width: '400px',
                            height: '250px'
                        }}
                        footerProps={{
                            submitBtn: {
                                bindedFormId: 'new-dashboard-form',
                                text: submitText,
                                loading: formik.isSubmitting,
                                disabled: !formik.isValid || !formik.dirty
                            }
                        }}
                    >
                        <DashboardFormModalContent />
                    </Modal>
                </Form>
            )}
        </Formik>
    );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
    createDashboard: (payload: CreateDashboardPayload) => dispatch.dashboards.createDashboard(payload),
    updateDashboard: (payload: UpdateDashboardPayload) => dispatch.dashboards.updateDashboard(payload)
});

export default connect(mapState, mapDispatch)(DashboardFormModal);
