using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;



namespace ToraBankDAL.configFirebase
{
    public class FirebaseService
    {

        private static FirebaseApp _firebaseApp;
        public FirebaseService()
        {
            InitializeFirebase();
        }

        private void InitializeFirebase()
        {
            if (_firebaseApp == null)
            {
                try
                {
                    var serviceAccountPath = "C:/Users/tamar.e/source/repos/finalProject/ToraBank/backend/config/tora-bank-project-firebase-adminsdk-150qm-2e8fdaff15.json";
                    _firebaseApp = FirebaseApp.Create(new AppOptions()
                    {
                        Credential = GoogleCredential.FromFile(serviceAccountPath),
                    });

                    Console.WriteLine("Firebase initialized successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error initializing Firebase: {ex.Message}");
                }

            }
        }

        public async Task<string> CreateUserAsync(string email, string password)
        {
            try
            {
                var user = await FirebaseAuth.DefaultInstance.CreateUserAsync(new UserRecordArgs()
                {
                    Email = email,
                    Password = password,
                });

                return user.Uid;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating user: {ex.Message}");
                return null;
            }
        }

    }
}
