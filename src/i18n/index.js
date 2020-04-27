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
        password: { label: 'Password' },
        retypePassword: { label: 'Re-type Password' },
        employee: { label: 'Employee' },
        manufacturer: { label: 'Manufacturer' },
        signIn: { title: 'Sign in', label: 'Sign in', button: 'Sign in' },
        signOut: { title: 'Sign out', label: 'Sign out', button: 'Sign out' },
        dashboard: { title: 'Dashboard', label: 'Dashboard' },
        create: { label: 'Create', button: 'Create' },
        update: { label: 'Update', button: 'Update' },
        cancel: { label: 'Cancel', button: 'Cancel' },
        createDepartment: { title: 'Create Department' },
        updateDepartment: { title: 'Update Department' },
        departmentManagement: { title: 'Department Management', label: 'Department Management', button: 'Department Management' },
        createEmployee: { title: 'Create Employee' },
        updateEmployee: { title: 'Update Employee' },
        employeeManagement: { title: 'Employee Management', label: 'Employee Management', button: 'Employee Management' },
        name: { title: 'Name', label: 'Name' },
        description: { title: 'Description', label: 'Description' },
        email: { title: 'Email', label: 'Email' },
        position: { title: 'Position', label: 'Position' },
        mobile: { title: 'Mobile', label: 'Mobile' },
        employeeReference: { title: 'Employee Reference', label: 'Employee Reference' },
        departments: { label: 'Departments' },
      },
    },
  },
});

export default i18next;
