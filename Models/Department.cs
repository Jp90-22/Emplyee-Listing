using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeEnviroment.Models
{
    public class Department
    {
        //Atributtes
        public int DepartmentId { get; set; }
        
        [Required(ErrorMessage = "The {0} value is required.")]
        [StringLength(500, ErrorMessage = "The {0} value cannot be more than 500 characters, for security reasons.")]
        public string DepartmentName { get; set; }
    }
}