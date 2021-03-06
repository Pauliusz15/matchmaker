﻿using System.Threading.Tasks;
using System.Collections.Generic;
using Matchmaker.Dtos;
using Matchmaker.Models;

namespace Matchmaker.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<ActivationToken> GenerateActivationToken(string UserId);
        Task<EmailChangeToken> GenerateEmailChangeToken(string UserId, string newEmail);
        Task<User> ActivateUser(string tokenId);
        Task<User> Login(string email, string password);
        Task<List<User>> GetUsers();
        Task<User> GetCurrentUser(string email);
        Task<User> UpdateUser(string id, UserProfileDto userProfile);
        Task<bool> UserExists(string email);
        Task<User> ChangeEmail(string tokenId);
        Task<User> ChangePassword(string id, string oldPassword, string newPassword);
    }
}
