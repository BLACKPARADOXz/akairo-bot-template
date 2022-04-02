echo Installing/updating bot dependencies
call npm ci --only=production --loglevel=warn >NUL
call yarn install

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)

echo Bot baslatılıyor...
call npm run start

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)
