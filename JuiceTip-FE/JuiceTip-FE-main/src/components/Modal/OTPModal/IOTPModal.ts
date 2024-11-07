export interface IOTPModal {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  value: {
    emailValue: string,
    firstname: string,
    lastname: string,
    address: string,
    phoneNumber: string,
    dob: Date;
    male: string,
    female: string,
    undefined: string,
    gender: string,
    password: string,
    confirmPassword: string,
    checkbox: boolean
  };
}
