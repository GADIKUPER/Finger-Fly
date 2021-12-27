using FinggerFly.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FinggerFly.Controllers
{
    [RoutePrefix("api/Img")]
    [EnableCors("*", "*", "*")]
    public class ImageController : ApiController
    {

        [HttpPost]
        [Route("UploadImage")]
        public IHttpActionResult UploadImage([FromBody] Img image)
        {
            //create the response object
            ImgRes res = new ImgRes();

            try
            {
                //path
                string path = HttpContext.Current.Server.MapPath(@"~/uploads/" + image.folder);

                //create directory if not exists
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                //create the image data
                string imageName = image.name + ".jpg";
                string imagePath = Path.Combine(path, imageName);
                byte[] imageBytes = Convert.FromBase64String(image.base64);

                //write the image and save it
                File.WriteAllBytes(imagePath, imageBytes);

                //update the resposne object    
                res.path = $"{Server.GetServerUrl()}/{image.folder}/{imageName}";
                res.isOk = true;

                return Ok(res);
            }
            catch (Exception e)
            {
                res.message = e.Message;
                res.isOk = false;
                return Content(HttpStatusCode.BadRequest, res);
            }
        }


    }
}