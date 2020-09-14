using Google.Cloud.SecretManager.V1;

namespace ReactStarter.Web.Services
{
    public class DatabaseSecretManager
    {
        public static Secret GetSecret(string projectId, string secretId)
        {
            // Create the Client.
            SecretManagerServiceClient client = SecretManagerServiceClient.Create();

            // Build the resource name.
            SecretName secretName = new SecretName(projectId, secretId);

            // Call the API.
            Secret secret = client.GetSecret(secretName);
            return secret;
        }
    }
}
