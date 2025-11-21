# Image Optimization Script for Web_practice
# This script provides instructions for optimizing images

Write-Host "=== Image Optimization Guide ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Current image sizes:" -ForegroundColor Yellow
Get-ChildItem -Path "src/assets/images" -File | ForEach-Object {
    $sizeKB = [math]::Round($_.Length/1KB, 2)
    Write-Host "  $($_.Name): $sizeKB KB"
}

Write-Host ""
Write-Host "Recommendations:" -ForegroundColor Green
Write-Host "1. Large images (enemyship.png, enemyship2.png, logo.png, playership.png, logo.ico):"
Write-Host "   - These are 187-260 KB and should be optimized"
Write-Host "   - Use online tools like TinyPNG (https://tinypng.com/) or Squoosh (https://squoosh.app/)"
Write-Host "   - Or install ImageMagick and run:"
Write-Host "     magick convert input.png -strip -quality 85 output.png"
Write-Host ""
Write-Host "2. For even better performance, convert to WebP format:"
Write-Host "   - WebP provides 25-35% better compression than PNG"
Write-Host "   - Use Squoosh or ImageMagick:"
Write-Host "     magick convert input.png -quality 85 output.webp"
Write-Host ""
Write-Host "3. Social media icons are already small (6-22 KB) - these are fine"
Write-Host ""
Write-Host "4. After optimization, update HTML to use WebP with PNG fallback:"
Write-Host '   <picture>'
Write-Host '     <source srcset="image.webp" type="image/webp">'
Write-Host '     <img src="image.png" alt="Description">'
Write-Host '   </picture>'
Write-Host ""

# Check if ImageMagick is installed
$imageMagickInstalled = Get-Command magick -ErrorAction SilentlyContinue

if ($imageMagickInstalled) {
    Write-Host "ImageMagick is installed! Would you like to optimize images now? (y/n)" -ForegroundColor Cyan
    $response = Read-Host
    
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "Creating optimized versions..." -ForegroundColor Yellow
        
        $imagesToOptimize = @(
            "enemyship.png",
            "enemyship2.png", 
            "logo.png",
            "playership.png"
        )
        
        foreach ($img in $imagesToOptimize) {
            $inputPath = "src/assets/images/$img"
            $outputPath = "src/assets/images/optimized_$img"
            
            if (Test-Path $inputPath) {
                Write-Host "Optimizing $img..." -ForegroundColor Green
                & magick convert $inputPath -strip -quality 85 $outputPath
                
                $originalSize = [math]::Round((Get-Item $inputPath).Length/1KB, 2)
                $optimizedSize = [math]::Round((Get-Item $outputPath).Length/1KB, 2)
                $savings = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
                
                Write-Host "  Original: $originalSize KB -> Optimized: $optimizedSize KB (Saved $savings%)" -ForegroundColor Cyan
            }
        }
        
        Write-Host ""
        Write-Host "Optimized images created with 'optimized_' prefix." -ForegroundColor Green
        Write-Host "Review them and replace the originals if satisfied." -ForegroundColor Yellow
    }
} else {
    Write-Host "ImageMagick not found. Install it from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    Write-Host "Or use online tools like TinyPNG or Squoosh for manual optimization." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Optimization Complete ===" -ForegroundColor Cyan
