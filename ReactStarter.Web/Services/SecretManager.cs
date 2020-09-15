using Google.Cloud.SecretManager.V1;

namespace ReactStarter.Web.Services
{
    public class SecretManager
    {
        public static string AccessSecret(string projectId, string secretId, string secretVersionId)
        {
            // Create the client.
            SecretManagerServiceClient client = SecretManagerServiceClient.Create();

            // Build the resource name.
            SecretVersionName secretVersionName = new SecretVersionName(projectId, secretId, secretVersionId);

            // Call the API.
            AccessSecretVersionResponse result = client.AccessSecretVersion(secretVersionName);

            // Convert the payload to a string. Payloads are bytes by default.
            return result.Payload.Data.ToStringUtf8();
        }
    }
}
