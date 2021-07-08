using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeEnviroment.Models
{
    public class Employee
    {
        //Atributtes
        public int EmployeeId { get; set; }

        [Required(ErrorMessage = "The {0} value is required.")]
        [StringLength(300, ErrorMessage = "The {0} value cannot be more than 300 characters, for security reasons.")]
        public string EmployeeName { get; set; }

        [Required(ErrorMessage = "The {0} value is required.")]
        [StringLength(500, ErrorMessage = "The {0} value cannot be more than 500 characters, for security reasons.")]
        public string Department { get; set; }

        #nullable enable
        [DataType(DataType.Date, ErrorMessage = "The {0} value must be a date.")]
        [StringLength(10, ErrorMessage = "The {0} value cannot be more than 10 characters, for security reasons.")]
        public string? DateOfJoining { get; set; }

        [StringLength(500, ErrorMessage = "The {0} value cannot be more than 500 characters, for security reasons.")]
        public string? PhotoFileName { get; set; }
    }
}