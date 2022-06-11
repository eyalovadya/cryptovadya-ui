import styled, { DefaultTheme } from 'styled-components';
import { SelectInput } from '../../../../shared/formInputs';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '../../../../../state/store';
import { appSelectors } from '../../../../../state/models/app/selectors';
import { CryptoPair } from '../../../../../types/dashboards/widget';
import { Option } from '../../../../shared/formInputs/SelectInput';
import { FormatOptionLabelMeta } from 'react-select/dist/declarations/src/Select';
import CoinPair from '../../../../shared/CoinPair';
import coinsSelectOptions from '../../../../../static/data/coinsSelectOptions.json';

type Props = {
    appTheme: DefaultTheme;
};

const ITEM_HEIGHT = 20;
const LIST_ITEMS_VIEW = 5;
const MAX_DISPLAYED_OPTIONS = 200;

const CreateWidgetModalContent = ({ appTheme }: Props) => {
    return (
        <Container>
            <SelectInput<CryptoPair>
                options={coinsSelectOptions as Option<CryptoPair>[]}
                label="Crypto Pair"
                name="cryptoPair"
                appTheme={appTheme}
                formatOptionLabel={formatCryptoPairOption}
                windowedListItemHeight={ITEM_HEIGHT}
                listItemsView={LIST_ITEMS_VIEW}
                maxDisplayedOptions={MAX_DISPLAYED_OPTIONS}
            />
        </Container>
    );
};

const formatCryptoPairOption = (data: Option<CryptoPair>, formatOptionLabelMeta: FormatOptionLabelMeta<Option<CryptoPair>>) => {
    const { baseCurrency, quoteCurrency } = data.value;
    return <CoinPair base={baseCurrency} quote={quoteCurrency} coinSize={20} textSize="16px" height={ITEM_HEIGHT} />;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const mapState = (state: RootState) => ({
    appTheme: appSelectors.appTheme(state)
});

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(mapState, mapDispatch)(CreateWidgetModalContent);
