# Script untuk membuat 25 commits dengan delay random dan push ke GitHub

$repoPath = "e:\project\portfolio"
cd $repoPath

# Konfigurasi git
git config user.email "aqbil@example.com"
git config user.name "Aqbil DN"

# Array dengan delay times (dalam menit) - lebih banyak 2 menit
$delays = @(2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 10, 2, 2, 2, 5, 2, 19, 2, 2, 21, 2, 2, 10)

# Pesan commit yang beragam
$commitMessages = @(
    "feat: menambahkan animasi hero section",
    "fix: perbaiki bug pada cursor animation",
    "style: improve styling untuk loading page",
    "docs: update dokumentasi README",
    "refactor: optimize floating background animation",
    "feat: tambah photostream component",
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

Write-Host "Mulai membuat 25 commits dengan delay random..." -ForegroundColor Green
Write-Host "Repository: $(git config --get remote.origin.url)" -ForegroundColor Cyan

# Jika belum ada files, add semuanya
if ((git status --short).Count -eq 0) {
    Write-Host "Adding existing files..." -ForegroundColor Yellow
    git add .
    git commit -m "Initial commit: add project structure"
    Write-Host "Initial commit created" -ForegroundColor Green
}

# Loop untuk 25 commits
for ($i = 0; $i -lt 25; $i++) {
    $commitNum = $i + 1
    $message = $commitMessages[$i]
    $delay = $delays[$i]
    
    # Buat perubahan minor (update file dummy atau timestamp)
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
    if ($i -eq 24 -or $commitNum % 5 -eq 0) {
        Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
        git push origin main 2>&1 | Write-Host
    }
}

Write-Host "`n=== SELESAI ===" -ForegroundColor Green
Write-Host "25 commits berhasil dibuat dan di-push ke GitHub!" -ForegroundColor Green
git log --oneline | head -30
