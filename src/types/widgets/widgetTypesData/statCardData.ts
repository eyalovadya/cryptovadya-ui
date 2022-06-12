import { CryptoPair } from '.';

export type StatCardData = CryptoPair & {
    data: number;
    dayDiffPrecent: number;
};
