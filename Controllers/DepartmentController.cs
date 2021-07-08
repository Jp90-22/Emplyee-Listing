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
        
        // Tools and configurations
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger; // Use this for testing
        private readonly string  sqlSource;
        public readonly SqlConnection myCon;
        public SqlCommand mySqlCommand;
        public SqlDataReader mySqlReader;

        //Dependency Injection
        public DepartmentController(IConfiguration config, ILogger<DepartmentController> logger)
        {
            _configuration = config;
            _logger = logger;
            
            sqlSource = _configuration.GetConnectionString("EmployeeAppCon"); //Setting the connection string by dependency injection
            myCon = new SqlConnection(sqlSource);
        }

        [HttpGet]
        public JsonResult Get() 
        {
            DataTable dataTable = new DataTable("Department");

            //Get data using connection context:
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_Department", myCon))
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
            DataTable dataTable = new DataTable("Department");

            //Get data using connection context:
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Select_one_Department", myCon))
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

        [HttpPost]
        public StatusCodeResult Post(Department department) 
        {
            using (myCon)
            {
                myCon.Open();
                using (mySqlCommand = new SqlCommand("Insert_Department", myCon))
                {
                    //Using Stored Procedures, add a new department in the db
                    mySqlCommand.CommandType = CommandType.StoredProcedure;
                    mySqlCommand.Parameters.AddWithValue("@Name", department.DepartmentName);

                    mySqlCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            return Ok(); 
        }

        [HttpPut]
        public StatusCodeResult Put(Department department) 
        {
            using (myCon)
            {
                myCon.Open();
                if (isDepartmentExisting(department.DepartmentId))
                {                    
                    using (mySqlCommand = new SqlCommand("Update_Department", myCon))
                    {
                        //Using Stored Procedures, update a department in the db
                        mySqlCommand.CommandType = CommandType.StoredProcedure;
                        mySqlCommand.Parameters.AddWithValue("@Target", department.DepartmentId);
                        mySqlCommand.Parameters.AddWithValue("@Name", department.DepartmentName);

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
                
                if (isDepartmentExisting(id))
                {                    
                    using (mySqlCommand = new SqlCommand("Delete_Department", myCon))
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

        // Algorimth for check if exists a department in database
        private bool isDepartmentExisting(int id) {
            byte exists = 0;

            using (mySqlCommand = new SqlCommand($"select count(*) as [Exists] from Department where DepartmentId = {id}", myCon))
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
