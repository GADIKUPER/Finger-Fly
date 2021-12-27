using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinggerFly.Models
{
    public class Img
    {
        public string base64 { get; set; }
        public string name { get; set; }
        public string folder { get; set; }
    }

    public class ImgRes
    {
        public string message { get; set; }
        public string path { get; set; }
        public bool isOk { get; set; }
    }
}