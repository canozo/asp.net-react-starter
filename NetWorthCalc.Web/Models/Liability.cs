﻿using System;

namespace NetWorthCalc.Web.Models
{
    public class Liability
    {
        public Liability()
        {
            LiabilityId = new Guid();
            CreatedOn = DateTime.Now;
            Name = "";
            Amount = 0.0;
        }

        public Guid LiabilityId { get; private set; }

        public DateTime CreatedOn { get; private set; }

        private string _Name;
        public string Name
        {
            get
            {
                return _Name;
            }

            set
            {
                if (value == null)
                {
                    throw new Exception("Field 'Name' can't be null");
                }
                _Name = value;
            }
        }

        private double _Amount;
        public double Amount
        {
            get
            {
                return _Amount;
            }

            set
            {
                if (value < 0.0)
                {
                    throw new Exception("Field 'Amount' can't be lower than 0.0");
                }
                _Amount = value;
            }
        }

        public Guid MonthlyReportId { get; set; }

        public MonthlyReport MonthlyReport { get; set; }
    }
}
