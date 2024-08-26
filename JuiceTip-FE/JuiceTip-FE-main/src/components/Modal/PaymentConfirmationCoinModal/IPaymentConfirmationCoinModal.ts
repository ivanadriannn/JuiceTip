export interface IPaymentConfirmationCoinModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    amount: number;
    handleqr: () => void;
}