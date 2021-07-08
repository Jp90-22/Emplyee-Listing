using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Data;
using System.Data.SqlClient; // For use this you need 'System.Data.SqlClient' package
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using EmployeeEnviroment.Models;

namespace EmployeeEnviroment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {

        //Tools and configurations
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _enviroment;
        private readonly ILogger _logger; // Use this for testing
        private readonly string  sqlSource;
        public readonly SqlConnection myCon;
        public SqlCommand mySqlCommand;
        public SqlDataReader mySqlReader;

        //Dependency Injection
        public EmployeeController(IConfiguration config, IWebHostEnvironment env, ILogger<DepartmentController> logger)
        {
            _configuration = config;
            _enviroment = env;
            _logger = logger;

            sqlSource = _configuration.GetConnectionString("EmployeeAppCon"); //Setting the connection string by dependency injection
            myCon = new SqlConnection(sqlSource);
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable dataTable = new DataTable("Employee");

            //Get data using connection context:
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_Employee", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlReader = mySqlCommand.ExecuteReader();

                    dataTable.Load(mySqlReader); //Load the data in the table

                    mySqlReader.Close();
                }
                myCon.Close();
            }

            return new JsonResult(dataTable);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            DataTable dataTable = new DataTable("Employee");

            //Get data using connection context:
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_one_Employee", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Target", id);
                    mySqlReader = mySqlCommand.ExecuteReader();

                    dataTable.Load(mySqlReader); //Load the data in the table

                    mySqlReader.Close();
                }
                myCon.Close();
            }

            return new JsonResult(dataTable);
        }

        // Get all employee's department names
        [Route("GetDepartmentNames")]
        [HttpGet]
        public JsonResult GetAllDepartmentNames()
        {
            DataTable dataTable = new DataTable("Department Names");

            //Get data using connection context:
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_All_Employee_DepartmentNames", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlReader = mySqlCommand.ExecuteReader();

                    dataTable.Load(mySqlReader); //Load the data in the table

                    mySqlReader.Close();
                }
                myCon.Close();
            }

            return new JsonResult(dataTable);
        }

        [HttpPost]
        public StatusCodeResult Post(Employee employee)
        {
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Insert_Employee", myCon))
                {
                    //Using Stored Procedures, add a new department in the db
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Name", employee.EmployeeName);
                    mySqlCommand.Parameters.AddWithValue("@Department", employee.Department);
                    mySqlCommand.Parameters.AddWithValue("@JoinDate", String.IsNullOrWhiteSpace(employee.DateOfJoining)? DBNull.Value : employee.DateOfJoining);
                    mySqlCommand.Parameters.AddWithValue("@Photo", String.IsNullOrWhiteSpace(employee.PhotoFileName)? DBNull.Value : employee.PhotoFileName);

                    mySqlCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return Ok();
        }

        // Save photo files API method
        [Route("[action]")]
        [HttpPost]
        public JsonResult SavePhoto()
        {
            try
            {
                var httpRequest = Request.Form; // Convert the request into form
                var postedPhoto = httpRequest.Files[0]; //  Get the first file of the request
                string photoName = postedPhoto.FileName; 
                var physicalPath = _enviroment.ContentRootPath + "/Photos/" + photoName;

                //Create a stream for new file and copy postedFile to that stream
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedPhoto.CopyTo(stream);
                }
                
                return new JsonResult(photoName);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.jpg");
                throw;
            }
        }

        [HttpPut]
        public StatusCodeResult Put(Employee employee)
        {
            using (myCon)
            {
                myCon.Open();
                if (isEmployeeExisting(employee.EmployeeId))
                {
                    using (mySqlCommand = new SqlCommand("Update_Employee", myCon))
                    {
                        //Using Stored Procedures, update a department in the db
                        mySqlCommand.CommandType = CommandType.StoredProcedure;
                        mySqlCommand.Parameters.AddWithValue("@Target", employee.EmployeeId);
                        mySqlCommand.Parameters.AddWithValue("@Name", employee.EmployeeName);
                        mySqlCommand.Parameters.AddWithValue("@Department", employee.Department);
                        mySqlCommand.Parameters.AddWithValue("@JoinDate", String.IsNullOrWhiteSpace(employee.DateOfJoining)? DBNull.Value : employee.DateOfJoining);
                        mySqlCommand.Parameters.AddWithValue("@Photo", String.IsNullOrWhiteSpace(employee.PhotoFileName)? DBNull.Value : employee.PhotoFileName);

                        mySqlCommand.ExecuteNonQuery();
                    }
                }
                myCon.Close();
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public StatusCodeResult Delete(int id)
        {
            using (myCon)
            {
                myCon.Open();
                if (isEmployeeExisting(id))
                {
                    using (mySqlCommand = new SqlCommand("Delete_Employee", myCon))
                    {
                        mySqlCommand.CommandType = CommandType.StoredProcedure;
                        mySqlCommand.Parameters.AddWithValue("@Target", id);

                        mySqlCommand.ExecuteNonQuery();
                    }
                }
                myCon.Close();
            }

            return Ok();
        }

        // Algorimth for check if exists a employee in database
        private bool isEmployeeExisting(int id) {
            byte exists = 0;

            using (mySqlCommand = new SqlCommand($"select count(*) as [Exists] from Employee where EmployeeId = {id}", myCon))
            {
                mySqlCommand.CommandType = CommandType.Text;
                mySqlReader = mySqlCommand.ExecuteReader();
                
                while(mySqlReader.Read()) 
                {
                    exists = Convert.ToByte(mySqlReader["Exists"]);
                }

                mySqlReader.Close();
            }
            
            if (exists > 0)
            {
                return true;
            }

            return false;
        }
    }
}
