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
        create: { label: 'Create', button: 'Create' },
        reset: { label: 'Reset', button: 'Reset' },
        cancel: { label: 'Cancel', button: 'Cancel' },
        createDepartment: { title: 'Create Department' },
        departmentManagement: { title: 'Department Management', label: 'Department Management', button: 'Department Management' },
        departmentName: { title: 'Name', label: 'Name' },
        departmentDescription: { title: 'Description', label: 'Description' },
        createEmployee: { title: 'Create Employee' },
        employeeManagement: { title: 'Employee Management', label: 'Employee Management', button: 'Employee Management' },
        employeeName: { title: 'Name', label: 'Name' },
        employeePreferredName: { title: 'Preferred Name', label: 'Preferred Name' },
        firstName: { title: 'First Name', label: 'First Name' },
        middleName: { title: 'Middle Name', label: 'Middle Name' },
        lastName: { title: 'Last Name', label: 'Last Name' },
        preferredName: { title: 'Preferred Name', label: 'Preferred Name' },
      },
    },
  },
});

export default i18next;
