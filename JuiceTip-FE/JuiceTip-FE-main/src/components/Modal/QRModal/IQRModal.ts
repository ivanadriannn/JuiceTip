export interface IQRModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    setAmount: (amount: number) => void;
    amount: number;
    userId: string;
}