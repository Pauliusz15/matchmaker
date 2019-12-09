﻿// <auto-generated />
using System;
using Matchmaker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Matchmaker.Migrations
{
    [DbContext(typeof(MatchmakerContext))]
    partial class MatchmakerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Matchmaker.Models.Activity", b =>
                {
                    b.Property<string>("ActivityId")
                        .HasColumnType("text");

                    b.Property<string>("AdminId")
                        .HasColumnType("text");

                    b.Property<string>("CategoryId")
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Gender")
                        .HasColumnType("text");

                    b.Property<int>("NumberOfParticipants")
                        .HasColumnType("integer");

                    b.Property<int>("PlayerLevel")
                        .HasColumnType("integer");

                    b.Property<string>("PlaygroundId")
                        .HasColumnType("text");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("RegisteredParticipants")
                        .HasColumnType("integer");

                    b.HasKey("ActivityId");

                    b.HasIndex("AdminId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PlaygroundId");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("Matchmaker.Models.Category", b =>
                {
                    b.Property<string>("CategoryId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Matchmaker.Models.Playground", b =>
                {
                    b.Property<string>("PlaygroundId")
                        .HasColumnType("text");

                    b.Property<string>("NameOfPlace")
                        .HasColumnType("text");

                    b.Property<int>("Size")
                        .HasColumnType("integer");

                    b.Property<string>("SportsCenterId")
                        .HasColumnType("text");

                    b.HasKey("PlaygroundId");

                    b.HasIndex("SportsCenterId");

                    b.ToTable("Playgrounds");
                });

            modelBuilder.Entity("Matchmaker.Models.SportsCenter", b =>
                {
                    b.Property<string>("SportsCenterId")
                        .HasColumnType("text");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("SportsCenterId");

                    b.ToTable("SportsCenters");
                });

            modelBuilder.Entity("Matchmaker.Models.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Gender")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea");

                    b.Property<string>("Role")
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Matchmaker.Models.UserActivity", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("ActivityId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "ActivityId");

                    b.HasIndex("ActivityId");

                    b.ToTable("UserActivity");
                });

            modelBuilder.Entity("Matchmaker.Models.Activity", b =>
                {
                    b.HasOne("Matchmaker.Models.User", "Admin")
                        .WithMany()
                        .HasForeignKey("AdminId");

                    b.HasOne("Matchmaker.Models.Category", "Category")
                        .WithMany("Activities")
                        .HasForeignKey("CategoryId");

                    b.HasOne("Matchmaker.Models.Playground", "Playground")
                        .WithMany("Activities")
                        .HasForeignKey("PlaygroundId");
                });

            modelBuilder.Entity("Matchmaker.Models.Playground", b =>
                {
                    b.HasOne("Matchmaker.Models.SportsCenter", "SportsCenter")
                        .WithMany("Playgrounds")
                        .HasForeignKey("SportsCenterId");
                });

            modelBuilder.Entity("Matchmaker.Models.UserActivity", b =>
                {
                    b.HasOne("Matchmaker.Models.Activity", "Activity")
                        .WithMany("UserActivities")
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Matchmaker.Models.User", "User")
                        .WithMany("UserActivities")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
