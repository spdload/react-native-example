import * as Yup from 'yup';

const email = Yup.string()
  .email('Enter the correct email')
  .required('Enter the correct email');

const password = Yup.string()
  .min(8, 'Minimum number of ranks 8!')
  .max(32, 'Maximum number of ranks 32')
  .required('Enter password')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\$%\^&\*])(?=.{8,})/,
    'Must contain One Uppercase and One Number and One Special Case Character',
  );

const old_password = Yup.string()
  .min(8, 'Minimum number of ranks 8!')
  .max(32, 'Maximum number of ranks 32')
  .required('Enter password')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\$%\^&\*])(?=.{8,})/,
    'Must contain One Uppercase and One Number and One Special Case Character',
  );

const group_name = Yup.string()
  .min(8, 'Minimum size name of ranks 8!')
  .max(30, 'Maximum size of ranks 30')
  .required('Enter name');

const password_confirmation = Yup.string().when('password', {
  is: val => (val && val.length > 0 ? true : false),
  then: Yup.string()
    .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
    .min(8, 'Minimum number of ranks 8!')
    .max(32, 'Maximum number of ranks 32')
    .required('Enter password'),
});

const phone_number = Yup.string().required('Enter phone number');

const website = Yup.string().matches(
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  'Enter correct url!',
);

const textField = Yup.string()
  .min(2, '"Enter at least 2 characters')
  .max(32, 'Enter up to 32 characters"');

const textFieldAdress = Yup.string()
  .min(4, '"Enter at least 4 characters')
  .max(24, 'Enter up to 24 characters"');

const numField = Yup.number().min(0, '"Enter at least 1 number');
// .max(32, 'Enter up to 32 numbers"');

export const SignUpSchema = Yup.object().shape({
  email,
  password,
  password_confirmation,
});

export const SignInSchema = Yup.object().shape({
  email,
  password,
});

export const CompanyInfoSchema = Yup.object().shape({
  name: textField,
  email,
  phone_number,
  website,
  title: textField,
  aum: numField,
  city: textFieldAdress.required('Enter City'),
  country: textFieldAdress.required('Enter Country'),
  zipcode: Yup.string().min(5, 'Enter at least 6 symbols'),
  type: textField.required('Enter Type of Company'),
  description: Yup.string()
    .min(10, '"Enter at least 4 characters')
    .max(32, 'Enter up to 32 characters')
    .required('Enter company description'),
});
export const ChangePassword = Yup.object().shape({
  old_password,
  password,
  password_confirmation,
});
// Oyjer
export const CreateGroup = Yup.object().shape({
  group_name,
});
export const ChangePasswordForgotShema = Yup.object().shape({
  password,
  password_confirmation,
});
const numberBasicRequired = Yup.string();

const inputBasicRequired = Yup.string()
  .min(3, '"Enter at least 3 characters')
  .max(32, 'Enter up to 32 characters"')
  .required('Required');

const multiselect = Yup.array();

export const inputBasic = Yup.string()
  .min(3, '"Enter at least 3 characters')
  .max(32, 'Enter up to 32 characters"');

const numBase = Yup.number().min(1, 'Minimum 1 symbol');

export const ResentEmailSchema = Yup.object().shape({
  email: email,
});

export const CreateChapterShema = Yup.object().shape({
  chapter_name: Yup.string()
    .min(2, 'Enter at least 2 characters')
    .max(24, 'Enter up to 24 characters')
    .required('Enter at least 2 characters')
    .matches(
      /^[aA-zZ\s]+$/,
      'The field must not contain any characters or numbers',
    ),
  chapter_description: Yup.string()
    .min(10, 'Enter at least 4 characters')
    .max(32, 'Enter up to 32 characters')
    .required('Enter chapter description'),
});
export const PersonalInfoSchema = Yup.object().shape({
  chapters: Yup.array().min(1, 'Select minimum 1 chapter'),
  sponsor: Yup.string().matches(
    /^[aA-zZ\s]+$/,
    'The field must not contain any characters or numbers',
  ),
  first_name: Yup.string()
    .min(2, 'Enter at least 2 characters')
    .max(24, 'Enter up to 24 characters')
    .required('Enter at least 2 characters')
    .matches(
      /^[aA-zZ\s]+$/,
      'The field must not contain any characters or numbers',
    ),
  middle_name: Yup.string()
    .max(24, 'Enter up to 24 characters')
    .matches(
      /^[aA-zZ\s]+$/,
      'The field must not contain any characters or numbers',
    ),
  last_name: Yup.string()
    .max(24, 'Enter less then 23 characters')
    .matches(
      /^[aA-zZ\s]+$/,
      'The field must not contain any characters or numbers',
    ),
  nickname: Yup.string()
    .min(4, 'Enter at least 4 characters')
    .max(24, 'Enter up to 24 characters')
    .required('Enter at least 4 characters'),

  membership_name: Yup.string().matches(
    /^[aA-zZ\s]+$/,
    'The field must not contain any characters or numbers',
  ),
  phone_number: phone_number.required('Enter phone number'),
});

export const familyBioInfoSchema = {
  city: inputBasic,
  country: inputBasic,
  zipcode: Yup.string().required('Enter at least 6 symbols'),
  spouseName: inputBasic,
  childrenName: inputBasic,
  primaryLanguage: inputBasic,
  otherLanguage: inputBasic,
  degree1: inputBasic,
  major1: inputBasic,
  year1: inputBasic,
  organizations: inputBasic,
};

export const PersonalInterestSchema = Yup.object().shape({
  community: multiselect,
  travel: multiselect,
  arts: multiselect,
  health: multiselect,
  general: multiselect,
  family: multiselect,
  business: multiselect,
  leadership: multiselect,
  outdoor: multiselect,
  teamSports: multiselect,
});

export const RiskQuestionsSchema = Yup.object().shape({
  investors_risk: numberBasicRequired,
  investors_preference: numberBasicRequired,
  investor_knowledgeable: numberBasicRequired,
  investor_experience: numberBasicRequired,
  investor_losses: numberBasicRequired,
});

export const createPasswordSchema = Yup.object().shape({
  password: password,
  confirmPassword: Yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string()
      .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
      .min(2, 'Too short!')
      .required('Required'),
  }),
});

export const CreateDealSchema = Yup.object().shape({
  title: inputBasic.required('Enter Deal Title'),
});

export const EditProfileScgema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Enter at least 2 characters')
    .max(24, 'Enter up to 24 characters')
    .matches(/^[a-zA-Z]+$/g, 'The field must not contain any numbers')
    .required('Enter at least 2 characters'),
  middle_name: Yup.string()
    .max(24, 'Enter up to 24 characters')
    .matches(/^[a-zA-Z]+$/g, 'The field must not contain any numbers'),
  last_name: Yup.string()
    .max(24, 'Enter less then 23 characters')
    .matches(
      /^[aA-zZ\s]+$/,
      'The field must not contain any characters or numbers',
    ),
  city: textFieldAdress.required('Enter City'),
  country: textFieldAdress.required('Enter Country'),
  email,
  phone_number,
  company_email: email,
  company_phone_number: phone_number,
  curent_company: textField,
});
