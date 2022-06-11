import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../../shared/Modal';
import CreateWidgetModalContent from './CreateWidgetModalContent';
import { RootState, Dispatch } from '../../../../../state/store';
import { WidgetType } from '../../../../../types/widgets';
import { CryptoPair } from '../../../../../types/widgets/widgetTypesData';
import { CreateWidgetPayload } from '../../../../../types/widgets/payloads';

type FormValues = {
    widgetType: WidgetType;
    cryptoPair: CryptoPair | null;
};

type Props = {
    createWidget: <T extends WidgetType>(payload: CreateWidgetPayload<T>) => Promise<void>;
};

const CreateWidgetModal = ({ createWidget }: Props) => {
    const dashboardId = +useParams().dashboardId!;
    const navigate = useNavigate();

    const initialValues: FormValues = {
        widgetType: 'STAT_CARD',
        cryptoPair: null
    };

    const onSubmit = async (values: FormValues) => {
        const { baseCurrency, quoteCurrency, baseCurrencyId } = values.cryptoPair!;

        await createWidget<'STAT_CARD'>({
            type: values.widgetType,
            dashboardId,
            data: {
                baseCurrency,
                quoteCurrency,
                baseCurrencyId,
                data: 0,
                dayDiffPrecent: 0
            }
        });

        navigate(-1);
    };

    const validationSchema = Yup.object({
        cryptoPair: Yup.object().required('Required').nullable()
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik: FormikProps<FormValues>) => (
                <Form
                    id="new-widget-form"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !formik.isSubmitting) {
                            formik.handleSubmit();
                        }
                    }}
                >
                    <Modal
                        opened={true}
                        handleClose={() => navigate(-1)}
                        title="New Widget"
                        containerProps={{
                            width: '400px',
                            height: '250px'
                        }}
                        footerProps={{
                            submitBtn: {
                                bindedFormId: 'new-widget-form',
                                text: 'Create',
                                loading: formik.isSubmitting,
                                disabled: !formik.isValid || !formik.dirty
                            }
                        }}
                    >
                        <CreateWidgetModalContent />
                    </Modal>
                </Form>
            )}
        </Formik>
    );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
    createWidget: <T extends WidgetType>(payload: CreateWidgetPayload<T>) => dispatch.dashboards.createWidget(payload)
});

export default connect(mapState, mapDispatch)(CreateWidgetModal);
