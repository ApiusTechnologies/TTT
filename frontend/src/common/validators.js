export const emailValidator = (emailString) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return !emailString.match(emailRegex)?.length;
};

export const passwordValidator = (passwordString1) => {
    return passwordString1.length < 8;
};

export const password2Validator = (passwordString1, passwordString2) => {
    return passwordString1 === passwordString2;
};
