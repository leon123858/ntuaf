# cloud run server can run admin tool

## deploy process

0. build image (note: 要用 `yarn build:prod` 產生 x86 用的 image)
1. bind local docker to GCP artifact-registry
2. push local docker image
3. set cloud run
4. set cloud scheduler

## note: bind docker

in GCP console (GUI)

1. 進入 "IAM 與 管理"
2. 進入 "服務帳戶" 創建一組帳號專門用來上傳 docker image
3. optional: 進入 "角色" , 創建專門用來 write artifact-registry 的角色 (可略, 因預設有 `Artifact Registry 寫入者` 可以用)
4. 進入 "身份與存取管理" 用授予存取權給步驟 2 的帳號 "write artifact-registry" 的權限
5. 進入 "服務帳戶" 找步驟 2 的帳號, 產生與下載 JSON 金鑰 (假設命名 key.json)
6. 執行下列指令登入 `cat key.json | docker login -u _json_key --password-stdin https://asia-east1-docker.pkg.dev`

## note: push docker

```
docker tag ntuaf asia-east1-docker.pkg.dev/ntuaf28-dev/ntuaf/ntuaf
docker push asia-east1-docker.pkg.dev/ntuaf28-dev/ntuaf/ntuaf
```

## note: set cloud run

in GCP console (GUI)

1. 進入 cloud run
2. 建立服務
3. 引用剛剛上傳在 artifact-registry 的 image
4. 地區設置跟其他地方皆相同
5. 只在要求處理期間分配 CPU
6. 執行個體 0~1
7. 安全: 內部且需驗證

## note: set cloud schedule

in GCP console (GUI)

1. 進入 cloud schedule
2. 建立服務
3. 地區設置跟其他地方皆相同
4. 依格式定義執行時間 `請用 unix-cron 格式來指定排程，例如每分鐘：「* * * * *」，每 3 小時：「0 */3 * * *」，每週一上午 9:00：「0 9 * * 1」`
5. HTTP
6. target GET `https://ntuaf-eapzrgcxia-de.a.run.app/exec`
7. "OIDC" with a accout have 擁有者權限
8. 重試最多一次

# note: update container in GCP

in GCP console (GUI)

1. 進入 cloud run
2. 進入 目標服務
3. 進入 編輯與部署新修訂版本
4. 選新上傳的 container in register
5. 發布新 container
6. 到 register 刪除舊 container
