﻿using JuiceTip_API.Model;

namespace JuiceTip_API.Output
{
    public class ProductProgressOutput
    {
        //public List<MsProduct> payload { get; set; }
        public class ProductProgressModel
        {
            public Guid ProductId { get; set; }
            public List<string> ProductImageList { get; set; }
            public string ProductImage
            {
                get
                {
                    return "[\"" + string.Join("\",\"", ProductImageList) + "\"]";
                }
                set
                {
                    ProductImageList = value.Split(new char[] { '[', ',', ']' }, StringSplitOptions.RemoveEmptyEntries).ToList();
                }
            }
            public string ProductName { get; set; }
            public string ProductDescription { get; set; }
            public double ProductPrice { get; set; }
            public Guid CategoryId { get; set; }
            public string CategoryName { get; set; }
            public Guid RegionId { get; set; }
            public string RegionName { get; set; }
            public string Notes { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime LastUpdatedAt { get; set; }
            public Guid? TransactionId { get; set; }
            public Guid JustiperId { get; set; }
            public string JustiperName { get; set; }
            public string Status { get; set; }
        }
        public List<ProductProgressModel> payload { get; set; }

        public ProductProgressOutput()
        {
            payload = new List<ProductProgressModel>();
        }
    }
}
