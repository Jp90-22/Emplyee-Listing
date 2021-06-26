using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient; // For use this you need 'System.Data.SqlClient' package
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using EmployeeEnviroment.Models;

namespace EmployeeEnviroment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        
        //Tools and configurations
        private readonly IConfiguration _configuration;
        private readonly string  sqlSource;
        public SqlConnection myCon;
        public SqlCommand mySqlCommand;
        public SqlDataReader mySqlReader;

        //Dependency Injection
        public DepartmentController(IConfiguration config)
        {
            _configuration = config;
            sqlSource = _configuration.GetConnectionString("EmployeeAppCon"); //Setting the connection string by dependency injection
        }

        [HttpGet]
        public JsonResult Get() 
        {
            DataTable dataTable = new DataTable("Department");

            //Get data using connection context:
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_Department", myCon))
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
            DataTable dataTable = new DataTable("Department");

            //Get data using connection context:
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_one_Department", myCon))
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
        public StatusCodeResult Post(Department department) 
        {
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Insert_Department", myCon))
                {
                    //Using Stored Procedures, add a new department in the db
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Name", department.DepartmentName);

                    try
                    {
                        mySqlCommand.ExecuteNonQuery();
                        myCon.Close();
                        return Ok(); 
                    }
                    catch (SqlException)
                    {
                        return BadRequest();
                        throw;
                    }
                }
            }
        }

        [HttpPut]
        public JsonResult Put(Department department) 
        {
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Update_Department", myCon))
                {
                    //Using Stored Procedures, update a department in the db
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Target", department.DepartmentId);
                    mySqlCommand.Parameters.AddWithValue("@Name", department.DepartmentName);

                    try
                    {
                        mySqlCommand.ExecuteNonQuery();
                        myCon.Close();
                        return Get(); 
                    }
                    catch (SqlException)
                    {
                        return new JsonResult("Something went worng!!");
                        throw;
                    }
                }
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id) 
        {
            using (myCon = new SqlConnection(sqlSource))
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Delete_Department", myCon))
                {
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Target", id);

                    try
                    {
                        mySqlCommand.ExecuteNonQuery();
                        myCon.Close();
                        return Get(); 
                    }
                    catch (SqlException)
                    {
                        return new JsonResult("Something went worng!!");
                        throw;
                    }
                }
            }
        }
    }
}
