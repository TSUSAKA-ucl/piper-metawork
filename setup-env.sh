#!/usr/bin/bash
# 環境変数をセットする
# ./.npmrcが使用する GITHUB_PKG_READ_TOKEN を ~/.npmrc から取り出す
export GITHUB_PKG_READ_TOKEN=`sed -e 's|^//npm\.pkg\.github\.com/:_authToken=\(.*\)$|\1|;t;g' ~/.npmrc`
# ./next.config.tsでallowedDevOriginsを設定するためにipコマンドで調べた
# IPアドレスを環境変数にセミコロン区切りでセットする
export ALLOWED_DEV_ORIGIN=`ip -j -4 -br a |\
       jq -r '.[].addr_info[].local'|\
       sed -e ':x; N; s/\n/;/g; bx'`
#
if [ "$0" = "$BASH_SOURCE" ]; then
    # Next.jsのdevサーバーを、mkcert作成のローカル証明書で起動する
    pnpm dev-mkcert
fi
