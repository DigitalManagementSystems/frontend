import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en_NZ',
  resources: {
    en_NZ: {
      translation: {
        manufacturerSignUp: { title: 'Sign Up as Manufacturer', label: 'Sign Up', button: 'Sign Up' },
        employeeSignUp: { title: 'Sign Up as Employee', label: 'Sign Up', button: 'Sign Up' },
        signin: { title: 'Sign In', label: 'Sign In', button: 'Sign In' },
        signout: { title: 'Sign Out', label: 'Sign Out', button: 'Sign Out' },
        employeeManagement: { title: 'Employee Management', label: 'Employee Mgmt.', button: 'Employee Mgmt.' },
        email: { label: 'Email' },
        password: { label: 'Password' },
        retypePassword: { label: 'Re-type Password' },
        dashboard: { title: 'Dashboard', label: 'Dashboard' },
      },
    },
  },
});

export default i18next;
