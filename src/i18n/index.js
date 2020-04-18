import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en_NZ',
  resources: {
    en_NZ: {
      translation: {
        signUp: { title: 'Sign up', label: 'Sign up', button: 'Sign up' },
        signUpAs: { label: 'Sign up as' },
        email: { label: 'Email' },
        password: { label: 'Password' },
        retypePassword: { label: 'Re-type Password' },
        employee: { label: 'Employee' },
        manufacturer: { label: 'Manufacturer' },
        signIn: { title: 'Sign in', label: 'Sign in', button: 'Sign in' },
        signOut: { title: 'Sign out', label: 'Sign out', button: 'Sign out' },
        dashboard: { title: 'Dashboard', label: 'Dashboard' },
        employeeManagement: { title: 'Employee Management', label: 'Employee Management', button: 'Employee Management' },
      },
    },
  },
});

export default i18next;
