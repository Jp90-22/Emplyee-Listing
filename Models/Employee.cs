using System;

namespace EmployeeEnviroment.Models
{
    public class Employee
    {
        //Atributtes
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }
    }
}