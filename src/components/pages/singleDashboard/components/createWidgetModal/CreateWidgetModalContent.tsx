import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { SelectInput } from '../../../../shared/formInputs';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '../../../../../state/store';
import { appSelectors } from '../../../../../state/models/app/selectors';
import { CryptoPair } from '../../../../../types/dashboard/widget';
import { Option } from '../../../../shared/formInputs/SelectInput';
import { FormatOptionLabelMeta } from 'react-select/dist/declarations/src/Select';
import CoinPair from '../../../../shared/CoinPair';

type Props = {
    appTheme: DefaultTheme;
};

const CreateWidgetModalContent = ({ appTheme }: Props) => {
    return (
        <Container>
            <SelectInput<CryptoPair>
                options={[
                    {
                        value: {
                            baseCurrency: 'BTC',
                            quoteCurrency: 'LTC'
                        },
                        label: 'BTC / LTC'
                    },
                    {
                        value: {
                            baseCurrency: 'BTC',
                            quoteCurrency: 'ETH'
                        },
                        label: 'BTC / ETH'
                    },
                    {
                        value: {
                            baseCurrency: 'ETH',
                            quoteCurrency: 'LTC'
                        },
                        label: 'ETH / LTC'
                    },
                    {
                        value: {
                            baseCurrency: 'ETH',
                            quoteCurrency: 'BTC'
                        },
                        label: 'ETH / BTC'
                    }
                ]}
                label="Crypto Pair"
                name="cryptoPair"
                appTheme={appTheme}
                formatOptionLabel={formatCryptoPairOption}
            />
        </Container>
    );
};

const formatCryptoPairOption = (data: Option<CryptoPair>, formatOptionLabelMeta: FormatOptionLabelMeta<Option<CryptoPair>>) => {
    const { baseCurrency, quoteCurrency } = data.value;
    return <CoinPair base={baseCurrency} quote={quoteCurrency} coinSize={20} textSize="16px" />;
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
