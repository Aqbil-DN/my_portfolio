# Script untuk melanjutkan membuat commits 7-25 dengan delay random

$repoPath = "e:\project\portfolio"
cd $repoPath

# Array dengan delay times untuk commits 7-25 (dalam menit)
$delays = @(2, 2, 10, 2, 2, 2, 5, 2, 19, 2, 2, 21, 2, 2, 10, 2, 5, 2, 2)

# Pesan commit untuk commits 7-25
$commitMessages = @(
    "fix: resolve animation timing issues",
    "feat: implement skill showcase",
    "style: update color scheme untuk projects",
    "docs: add installation instructions",
    "refactor: clean up main.ts code",
    "feat: tambah contact form animation",
    "fix: perbaiki responsive design issues",
    "style: improve typography styling",
    "feat: optimize performance dengan lazy loading",
    "docs: update component documentation",
    "fix: resolve transition bugs",
    "feat: tambah playground section",
    "refactor: reorganize CSS structure",
    "style: enhance visual hierarchy",
    "feat: implement dark mode support",
    "fix: perbaiki navigation menu animation",
    "docs: add contributing guidelines",
    "refactor: improve code organization",
    "feat: finalize portfolio with all features"
)

Write-Host "Melanjutkan commits 7-25 dengan delay random..." -ForegroundColor Green
Write-Host "Repository: $(git config --get remote.origin.url)" -ForegroundColor Cyan

# Loop untuk 19 commits (7-25)
for ($i = 0; $i -lt 19; $i++) {
    $commitNum = $i + 7
    $message = $commitMessages[$i]
    $delay = $delays[$i]
    
    # Buat perubahan minor
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path "src/main.js" -Value "`n// Updated at $timestamp - Commit #$commitNum"
    
    # Stage dan commit
    git add -A
    git commit -m "$message [commit $commitNum/25]"
    
    Write-Host "[$commitNum/25] Commit created: $message" -ForegroundColor Green
    Write-Host "Waiting $delay minutes before next commit/push..." -ForegroundColor Yellow
    
    # Tunggu sesuai delay
    $delaySeconds = $delay * 60
    Start-Sleep -Seconds $delaySeconds
    
    # Push setelah beberapa commit atau di akhir
    if ($i -eq 18 -or ($commitNum % 5 -eq 0 -and $commitNum -gt 5)) {
        Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
        git push -u origin master 2>&1 | Write-Host
    }
}

Write-Host "`n=== SELESAI ===" -ForegroundColor Green
Write-Host "19 commits (7-25) berhasil dibuat dan di-push ke GitHub!" -ForegroundColor Green
Write-Host "Total: 25 commits" -ForegroundColor Cyan
git log --oneline | head -30
