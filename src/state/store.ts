import { init, ModelEffects, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';

export const store = init({
    models
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;

type ExtractRematchLoadingStateFromEffectsObject<effects extends ModelEffects<any>> = {
    [effectKey in keyof effects]: boolean;
};
type ExtractRematchErrorStateFromEffectsObject<effects extends ModelEffects<any>> = {
    [effectKey in keyof effects]: string;
};

interface LoadingState<M extends RootModel> {
    loading: {
        global: boolean;
        models: { [k in keyof M]: boolean };
        effects: { [k in keyof M]: ExtractRematchLoadingStateFromEffectsObject<ModelEffects<any>> };
    };
}

interface ErrorState<M extends RootModel> {
    error: {
        effects: { [k in keyof M]: ExtractRematchErrorStateFromEffectsObject<ModelEffects<any>> };
    };
}

export type RootState = RematchRootState<RootModel> & LoadingState<RootModel> & ErrorState<RootModel>;
