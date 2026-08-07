@echo off
set GIT=C:\Users\srika\Downloads\flutter_windows_3.38.7-stable\flutter\bin\mingit\cmd\git.exe

echo === Initializing Git Repository ===
"%GIT%" init
"%GIT%" config user.email "gudur.yunus@users.noreply.github.com"
"%GIT%" config user.name "Gudur-Yunus"

echo === Staging all files ===
"%GIT%" add -A

echo === Creating commit ===
"%GIT%" commit -m "Hospital Enquiry App - 3D Medical Kiosk with realistic body model"

echo === Adding remote ===
"%GIT%" remote remove origin 2>nul
"%GIT%" remote add origin https://github.com/Gudur-Yunus/Hospital-enquiry-app.git

echo === Pushing to GitHub (main branch) ===
"%GIT%" branch -M main
"%GIT%" push -u origin main --force

echo === Done! ===
