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
        private readonly string sqlSource;
        public SqlConnection myCon;
        public SqlCommand mySqlCommand;
        public SqlDataReader mySqlReader;

        //Dependency Injection
        public EmployeeController(IConfiguration config, IWebHostEnvironment env)
        {
            _configuration = config;
            _enviroment = env;
            sqlSource = _configuration.GetConnectionString("EmployeeAppCon"); //Setting the connection string by dependency injection
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable dataTable = new DataTable("Employee");

            //Get data using connection context:
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_Employee", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlReader = mySqlCommand.ExecuteReader();

                    dataTable.Load(mySqlReader); //Load the data in the table

                    mySqlReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(dataTable);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            DataTable dataTable = new DataTable("Employee");

            //Get data using connection context:
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_one_Employee", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Target", id);
                    mySqlReader = mySqlCommand.ExecuteReader();

                    dataTable.Load(mySqlReader); //Load the data in the table

                    mySqlReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(dataTable);
        }

        [HttpPost]
        public StatusCodeResult Post(Employee employee)
        {
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Insert_Employee", myCon))
                {
                    //Using Stored Procedures, add a new department in the db
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Name", employee.EmployeeName);
                    mySqlCommand.Parameters.AddWithValue("@Department", employee.Department);
                    mySqlCommand.Parameters.AddWithValue("@JoinDate", employee.DateOfJoining);
                    mySqlCommand.Parameters.AddWithValue("@Photo", employee.PhotoFileName);

                    mySqlCommand.ExecuteNonQuery();
                    myCon.Close();
                    return StatusCode(200);
                }
            }
        }

        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Update_Employee", myCon))
                {
                    //Using Stored Procedures, update a department in the db
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Target", employee.EmployeeId);
                    mySqlCommand.Parameters.AddWithValue("@Name", employee.EmployeeName);
                    mySqlCommand.Parameters.AddWithValue("@Department", employee.Department);
                    mySqlCommand.Parameters.AddWithValue("@JoinDate", employee.DateOfJoining);
                    mySqlCommand.Parameters.AddWithValue("@Photo", employee.PhotoFileName);


                    mySqlCommand.ExecuteNonQuery();
                    myCon.Close();
                    return Get();
                }
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Delete_Employee", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Target", id);

                    mySqlCommand.ExecuteNonQuery();
                    myCon.Close();
                    return Get();
                }
            }
        }

        // Save photo files API method
        [Route("[action]")]
        [HttpPost]
        public JsonResult SaveFiles()
        {
            try
            {
                var httpRequest = Request.Form; // Convert the request into form
                var postedFile = httpRequest.Files[0]; //  Get the first file of the request
                string fileName = postedFile.FileName; 
                var physicalPath = _enviroment.ContentRootPath + "/Photos/" + fileName;

                //Create a stream for new file and copy postedFile to that stream
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);

            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
                throw;
            }
        }

        // Get all employee's department names
        [Route("GetDepartmentNames")]
        [HttpGet]
        public JsonResult GetAllDepartmentNames()
        {
            DataTable dataTable = new DataTable("Department Names");

            //Get data using connection context:
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_All_Employee_DepartmentNames", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlReader = mySqlCommand.ExecuteReader();

                    dataTable.Load(mySqlReader); //Load the data in the table

                    mySqlReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(dataTable);
        }
    }
}
