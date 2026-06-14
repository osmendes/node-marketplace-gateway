import { execSync } from "node:child_process";

try {
  // 1. Pega o nome da branch atual
  const currentBranch: string = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

  // 2. Lista de branches bloqueadas para commit direto
  const blockedBranches: string[] = ["master", "main", "homolog", "dev", "development"];

  if (blockedBranches.includes(currentBranch)) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `❌ [Lefthook] Erro: Você não pode fazer commits direto na branch '${currentBranch}'!`,
    );
    console.error("💡 Crie uma nova branch (ex: git checkout -b feat/minha-feature) e envie um PR.\n");
    process.exit(1); // Bloqueia o commit
  }
} catch (_error) {
  process.exit(1);
}
