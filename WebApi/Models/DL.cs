using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace FinggerFly.Models
{
    public class DL
    {
        private static string conStr;
        //private static bool local = false;
        private static SqlConnection Con = null;
        private static SqlDataAdapter _adtr = null;
        private static SqlCommand _command = null;

   
        public static SqlConnection ConMan()
        {
            bool localWebAPI = false;//before doing publish need to be false
            bool sqlLocal = false;//before doing publish need to be false

            if (localWebAPI && sqlLocal)
                conStr = ConfigurationManager.ConnectionStrings["FinggerFly"].ConnectionString;
            else if (localWebAPI && !sqlLocal)
                conStr = ConfigurationManager.ConnectionStrings["SQLLiveDNSfromLocalWebAPI"].ConnectionString;
            else
                conStr = ConfigurationManager.ConnectionStrings["LiveDNSfromLivednsWebAPI"].ConnectionString;
            
            Con = new SqlConnection(conStr);
            Con.Open();
            return Con;
        }

        //static string GetAppSetting(Configuration config, string key)
        //{
        //    KeyValueConfigurationElement element = config.AppSettings.Settings[key];
        //    if (element != null)
        //    {
        //        string value = element.Value;
        //        if (!string.IsNullOrEmpty(value))
        //            return value;
        //    }
        //    return string.Empty;
        //}

        public static DataTable GetUsers()
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("GetUsers", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "TBUsers");

                if (ds.Tables["TBUsers"].Rows.Count != 0)
                    return ds.Tables["TBUsers"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }

        public static int Register(string FirstName, string LastName, string email, string password, string Picture)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("regisrerNewAccount", Con);
                _command.CommandType = CommandType.StoredProcedure;
                
                _command.Parameters.Add(new SqlParameter("FirstName", FirstName));
                _command.Parameters.Add(new SqlParameter("LastName", LastName));
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", password));
                _command.Parameters.Add(new SqlParameter("PictureUri", Picture));
                _command.Parameters.Add("@UserId", SqlDbType.Int);
                _command.Parameters["@UserId"].Direction = ParameterDirection.Output;
                _command.ExecuteNonQuery();
                return Convert.ToInt32(_command.Parameters["@UserId"].Value);

                //DataSet ds = new DataSet();
                //_adtr = new SqlDataAdapter(_command);

                //_adtr.Fill(ds, "TBUsers");
                //if (ds.Tables["TBUsers"].Rows.Count != 0)
                //    return ds.Tables["TBUsers"];
                 
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            //return null;
        }

     
        public static DataTable Login(string email, string password)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("Login", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", password));


                DataSet ds = new DataSet();
                _adtr = new SqlDataAdapter(_command);

                _adtr.Fill(ds, "UserLogin");
                if (ds.Tables["UserLogin"].Rows.Count != 0)
                    return ds.Tables["UserLogin"];
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return null;
        }
        public static int UpdateScore(int ID, int Score)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("UpdateScore", Con);
                _command.CommandType = CommandType.StoredProcedure;

                _command.Parameters.Add(new SqlParameter("UserID", ID));
                _command.Parameters.Add(new SqlParameter("Score", Score));
                return _command.ExecuteNonQuery();

                //DataSet ds = new DataSet();
                //_adtr = new SqlDataAdapter(_command);

                //_adtr.Fill(ds, "TBUsers");
                //if (ds.Tables["TBUsers"].Rows.Count != 0)
                //    return ds.Tables["TBUsers"];

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            //return null;
        }

        public static int UpdateEditProfile(int ID, string FirstName, string LastName, string Picture)
        {
            try
            {
                Con = ConMan();
                _command = new SqlCommand("EditProfile", Con);
                _command.CommandType = CommandType.StoredProcedure;
                _command.Parameters.Add(new SqlParameter("UserID", ID));

                _command.Parameters.Add(new SqlParameter("FirstName", FirstName));
                _command.Parameters.Add(new SqlParameter("LastName", LastName));
                _command.Parameters.Add(new SqlParameter("PictureUri", Picture));
                return _command.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            
        }

    }
}