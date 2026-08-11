#!/bin/zsh
cd "$(dirname "$0")"
echo "Demo8 测试预览： http://127.0.0.1:4182/index.html"
python3 -m http.server 4182
