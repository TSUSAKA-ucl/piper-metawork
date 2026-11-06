// next devの代わりにこれを動かせばnext.config.tsが使うALLOWED_DEV_ORIGINを自動的に設定できる
// package.json: { "scripts": { "dev": "node dev-server.js" } }
import { networkInterfaces } from 'os';
import { spawn } from 'child_process';

// 1. ローカルIPアドレス（IPv4）を自動取得
function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // IPv4 かつ 内部ループバック（127.0.0.1）でないものを探す
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost'; // 見つからない場合のフォールバック
}

const localIP = getLocalIP();
// 必要に応じてポート番号（例: 3000）やプロトコルを調整してください
const allowedOrigin = `https://${localIP}:3000`; 

console.log(`[Dev Script] Detected Local IP: ${localIP}`);
console.log(`[Dev Script] Setting ALLOWED_DEV_ORIGIN=${allowedOrigin}`);

// 2. 環境変数を引き継ぎつつ追加して next dev を起動
const env = { ...process.env, ALLOWED_DEV_ORIGIN: allowedOrigin };

// pnpm の場合は 'pnpm'、npm の場合は 'npm' に書き換えてください
const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

const child = spawn(cmd, ['exec', 'next', 'dev'], {
  env,
  stdio: 'inherit', // Next.jsのログ出力をターミナルにそのまま流す
});

child.on('close', (code) => {
  process.exit(code);
});
