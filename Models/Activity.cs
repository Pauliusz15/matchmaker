﻿using System;
using System.Collections.Generic;

namespace Matchmaker.Models
{
    public class Activity
    {
        public string ActivityId { get; set; }
        public DateTime Date { get; set; }
        public string Gender { get; set; }
        public float Price { get; set; }
        public int NumberOfParticipants { get; set; }
        public int RegisteredParticipants { get; set; }
        public int PlayerLevel { get; set; }

        public string PlaygroundId { get; set; }
        public Playground Playground { get; set; }
        public string CategoryId { get; set; }
        public Category Category { get; set; }
        public string AdminId { get; set; }
        public User Admin { get; set; }
        public List<UserActivity> UserActivities { get; set; }
    }
}
