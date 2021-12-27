using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace FinggerFly.Models
{
    public class DB
    {
        public static List<Users> GetUsers()
        {
            List<Users> users = new List<Users>();
            DataTable res = DL.GetUsers();

            if (res == null)
            {
                return null;
            }

            foreach (DataRow row in res.Rows)
            {
                if (users == null)
                    users = new List<Users>();

                users.Add(new Users()
                {
                    ID =int.Parse(row["UserID"].ToString()),
                    FirstName = row["FirstName"].ToString(),
                    LastName = row["LastName"].ToString(),
                    Email = row["Email"].ToString(),
                    Password = row["PasswordHash"].ToString(),
                    PictureUri = row["PictureUri"].ToString()
                }) ; 
            }
            return users;
        }

        public static int Register(string FirstName,string LastName, string Email, string PasswordHash, string PictureUri)
        {
            //Users u = null;
            //DataTable 
             int res = DL.Register(FirstName, LastName, Email, PasswordHash, PictureUri);
            
            //if (res == null)
            //    return null;
            //if (u == null)
            //{
            //    u = new Users()
            //    {
            //        FirstName = res.Rows[0]["FirstName"].ToString(),
            //        LastName = res.Rows[0]["LastName"].ToString(),
            //        Email = res.Rows[0]["Email"].ToString(),
            //        PasswordHash = res.Rows[0]["PasswordHash"].ToString(),
            //        PictureUri = res.Rows[0]["PictureUri"].ToString(),
            //    };
            //}

            //int id = int.Parse(res.Rows[0]["UserID"].ToString());

            return res;
        }
        public static int UpdateScore(int ID, int Score)
        {
            int res = DL.UpdateScore(ID, Score);

            return res;
        }

        public static Users Login(string Email, string Password)
        {
            Users u = null;
            DataTable res = DL.Login(Email, Password);

            if (res == null)
                return null;

            if(u == null)
            {
                u = new Users()
                {
                    ID = int.Parse(res.Rows[0]["UserID"].ToString()),
                };
            }
            return u;
        }

        public static int UpdateEditProfile(int ID,string FirstName, string LastName, string PictureUri)
        {
           
            int res = DL.UpdateEditProfile(ID,FirstName, LastName, PictureUri);

            return res;
        }

        //public static ResetPassword SendResetPasswordEmail(string email)
        //{
        //    DataTable res = DL.SendResetPasswordEmail(email);


        //    if (res == null)
        //        return null;

        //    if (Convert.ToBoolean((int)res.Rows[0]["ReturnCode"]))
        //    {
        //        ResetPassword result = new ResetPassword()
        //        {
        //            UniqueID = res.Rows[0]["UniqueID"].ToString(),
        //            Email = email,
        //        };
        //        return result;
        //    }

        //    return null;
        //}

        //public static bool ResetPassword(string uid, string newPassword)
        //{
        //    DataTable res = DL.ResetPassword(uid, newPassword);

        //    if (res == null)
        //        return false;

        //    bool result = Convert.ToBoolean((int)res.Rows[0]["ReturnCode"]);

        //    return result;

        //}
    }
}