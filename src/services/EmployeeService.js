
import axios from 'axios';
import EMPLOYEE_API_BASE_URL from '../api/EmployeeServiceApi';



class EmployeeService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL+"/employees");
    }

    addEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+"/employees",employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL+"/employees/"+employeeId);
    }

    updateEmployee(employee,employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL+"/employees/"+employeeId,employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL+"/employees/"+employeeId);
    }
}
export default new EmployeeService;