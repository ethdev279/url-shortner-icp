# URL 短縮サービス ICP

このプロジェクトは、インターネット コンピュータ プラットフォーム (ICP) 上に構築されたシンプルな URL 短縮サービスです。このプロジェクトは、URL 短縮ロジックを処理するバックエンド キャニスターと、バックエンド キャニスターと対話するためのシンプルな UI を提供するフロントエンド キャニスターの 2 つのキャニスターで構成されています。

## はじめる

1. IC SDK をインストールする

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

2. 新しいプロジェクトを作成する(オプション)

> dfx によって作成されるデフォルトのプロジェクトは「Hello, world!」です。

```bash
dfx new hello --type=motoko
```

3. プロジェクトのデプロイ

```bash
cd url-shortner

dfx deploy --playground
```

4. プロジェクトに参加する

ブラウザでキャニスターを開き`frontend`、プロジェクトを操作します。

## プロジェクト構造

```
url-shortner
├── src
│   ├── url-shortner-backend  # Backend canister
│   │   └── main.mo           # URL Shortner logic
│   ├── url-shortner-frontend # Frontend canister
│   │   └── src
│   │       ├── index.jsx     # Main React file
│   │       └── App.jsx       # Main App component

```

### キャニスターコード

```motoko
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor URLShortener {
  stable var urls : [(Text, Text)] = [];

  public shared func shorten(originalUrl : Text) : async Text {
    let shortCode = Nat.toText(urls.size());
    urls := Array.append(urls, [(shortCode, originalUrl)]);
    return shortCode
  };

  public query func resolve(shortCode : Text) : async ?Text {
    for ((sc, originalUrl) in urls.vals()) {
      if (sc == shortCode) {
        return ?originalUrl
      }
    };
    return null
  }
}
```

### デプロイメントログ
```bash
Deploying
Reserved canister 'url-shortner-backend' with id xumeo-zyaaa-aaaab-qadaa-cai with the playground.
Reserved canister 'url-shortner-frontend' with id x2ojg-ciaaa-aaaab-qadba-cai with the playground.
Installed code for canister url-shortner-backend, with canister ID xumeo-zyaaa-aaaab-qadaa-cai
WARN: This project uses the default security policy for all assets. While it is set up to work with many applications, it is recommended to further harden the policy to increase securit y against attacks like XSS.
WARN: To get started, have a look at 'dfx info canister-security-policy'. It shows the default security policy along with suggestions on how to improve it.
WARN: To disable the policy warning, define "disable_security_policy_warning": true in ic-assets.json5.
Installed code for canister url-shortner-frontend, with canister ID x2ojg-ciaaa-aaaab-qadba-cai
Deployed canisters.
URLS:
Frontend canister via browser:
url-shortner-frontend: https://x2ojg-ciaaa-aaaab-qadba-cai.icpl.io/
Backend canister via Candid interface:
url-shortner-backend: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icpl.io/?id=xumeo-zyaaa-aaaab-qadaa-cai
```

## デモ

### デプロイコマンドの出力

![icp-sc3-deploy](https://github.com/user-attachments/assets/1fc61ae4-efa4-45b3-a97a-7fac6a25bdf7)

### Candid UI バックエンド

![icp-candid-ui](https://github.com/user-attachments/assets/c25ed17a-0579-407f-9579-9ba8928bdb80)

### フロントエンド

![icp-fe-sc](https://github.com/user-attachments/assets/1097d7bb-3b87-43ab-8c05-966f7110c30c)

### モトコプレイグラウンド

![icp-motoko-playground](https://github.com/user-attachments/assets/52138592-db2e-4944-bbab-7b8324eff90d)

## 参考文献

- [IC クイックスタート](https://internetcomputer.org/docs/current/developer-docs/getting-started/quickstart/first-smart-contract)
- [IC キャニスターの概要](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/write/overview)
- [Motoko プログラミング言語](https://internetcomputer.org/docs/current/motoko/main/getting-started/motoko-introduction)
- [モトコプレイグラウンド](https://play.motoko.org/)

## ライセンス

このプロジェクトは MIT ライセンスに基づいてライセンスされています。詳細については [LICENSE] ファイルを参照してください。
