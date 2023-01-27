# ntuaf 管理 CLI

## 執行環境設置

### 安裝 node.js 建議 >= 16

略

### 放置金鑰

需放置名為 key.json 的金鑰在本位置
(取得方法, firebase console 中的 admin 金鑰)

just like this format

```
{
  "type": "service_account",
  "project_id": "ntuaf28-dev",
  "private_key_id": "skip",
  "private_key": "-----BEGIN PRIVATE KEY-----\skip\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-et3az@ntuaf28-dev.iam.gserviceaccount.com",
  "client_id": "108708576660552669539",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-et3az%40ntuaf28-dev.iam.gserviceaccount.com"
}
```
