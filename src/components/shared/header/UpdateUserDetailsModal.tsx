import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Dispatch } from '../../../state/store';
import { connect } from 'react-redux';
import { UserUpdatePayload } from '../../../types/users/payloads';
import { User } from '../../../types/users';
import Modal from '../Modal';
import { TextInput } from '../formInputs';

type DispatchProps = ReturnType<typeof mapDispatch>;

type OwnProps = {
    user: User;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

type Props = DispatchProps & OwnProps;

const UpdateUserDetailsModal = ({ user, isOpen, setIsOpen, updateUserDetails }: Props) => {
    const handleClose = () => {
        setIsOpen(false);
    };

    const initialValues: UserUpdatePayload = {
        firstName: user.firstName,
        lastName: user.lastName
    };

    const onSubmit = async (values: UserUpdatePayload) => {
        await updateUserDetails(values);
        handleClose();
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().min(2, 'First Name must be at least 2 characters').required('Required'),
        lastName: Yup.string().min(2, 'Last Name must be at least 2 characters').required('Required')
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik: FormikProps<UserUpdatePayload>) => (
                <Form
                    id="update-user-details-form"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !formik.isSubmitting) {
                            formik.handleSubmit();
                        }
                    }}
                >
                    <Modal
                        isOpen={isOpen}
                        handleClose={handleClose}
                        title="Edit Details"
                        containerProps={{
                            width: '400px',
                            height: 'auto'
                        }}
                        footerProps={{
                            submitBtn: {
                                bindedFormId: 'update-user-details-form',
                                text: 'Update',
                                loading: formik.isSubmitting,
                                disabled: !formik.isValid || !formik.dirty
                            }
                        }}
                    >
                        <TextInput label="First Name" name="firstName" autoFocus />
                        <TextInput label="Last Name" name="lastName" />
                    </Modal>
                </Form>
            )}
        </Formik>
    );
};

const mapDispatch = (dispatch: Dispatch) => ({
    updateUserDetails: (payload: UserUpdatePayload) => dispatch.user.updateMe(payload)
});

export default connect(undefined, mapDispatch)(UpdateUserDetailsModal);
