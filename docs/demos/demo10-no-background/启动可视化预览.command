#!/bin/zsh
set -e
cd "$(dirname "$0")"

for port in 4203 4204 4205 4206; do
  if ! lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Demo10 稳定呈现测试预览：http://127.0.0.1:$port/index.html"
    python3 -m http.server "$port"
    exit 0
  fi
done

echo "4203-4206 端口均已被占用，请关闭旧预览后重试。"
exit 1
