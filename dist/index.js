"use strict";var _path=require("path");var _fs=require("fs");var _child_process=require("child_process");var mainPackage="main";var mainClass="Program";var mainFilePath=(0,_path.join)(__dirname,"./packages/".concat(mainPackage,"/").concat(mainClass,".js"));var configFilePath=(0,_path.join)(__dirname,"../natriy.cfg");if(!(0,_fs.existsSync)(mainFilePath)){throw new Error("class ".concat(mainPackage,"/").concat(mainClass," (").concat(mainFilePath,") doesn't exists."));}if(!(0,_fs.existsSync)(configFilePath)){throw new Error("config file (".concat(configFilePath,") wasn't found."));}function spawnProgramProcess(){var newProcess=(0,_child_process.fork)(mainFilePath);newProcess.once("spawn",function(){newProcess.send("start",function(err){if(err)console.error(err);});});newProcess.once("error",function(err){console.error(err);});return newProcess;}var programProcess=spawnProgramProcess();var canUpdate=true;(0,_fs.watch)(configFilePath,function(e){if(e=="rename"){throw new Error("config file (".concat(configFilePath,") was renamed."));}if(!programProcess.connected){programProcess=spawnProgramProcess();canUpdate=false;return;}if(canUpdate){programProcess.send("update",function(err){if(err)console.error(err);});canUpdate=false;return;}if(!canUpdate)canUpdate=true;});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWluUGFja2FnZSIsIm1haW5DbGFzcyIsIm1haW5GaWxlUGF0aCIsImpvaW5QYXRoIiwiX19kaXJuYW1lIiwiY29uZmlnRmlsZVBhdGgiLCJmaWxlRXhpc3RzIiwiRXJyb3IiLCJzcGF3blByb2dyYW1Qcm9jZXNzIiwibmV3UHJvY2VzcyIsImZvcmsiLCJvbmNlIiwic2VuZCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInByb2dyYW1Qcm9jZXNzIiwiY2FuVXBkYXRlIiwid2F0Y2hGaWxlIiwiZSIsImNvbm5lY3RlZCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqb2luIGFzIGpvaW5QYXRoIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMgYXMgZmlsZUV4aXN0cywgd2F0Y2ggYXMgd2F0Y2hGaWxlIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBmb3JrLCBDaGlsZFByb2Nlc3MgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG5jb25zdCBtYWluUGFja2FnZSA9IFwibWFpblwiO1xuY29uc3QgbWFpbkNsYXNzID0gXCJQcm9ncmFtXCI7XG5cbmNvbnN0IG1haW5GaWxlUGF0aCA9IGpvaW5QYXRoKF9fZGlybmFtZSwgYC4vcGFja2FnZXMvJHttYWluUGFja2FnZX0vJHttYWluQ2xhc3N9LmpzYCk7XG5jb25zdCBjb25maWdGaWxlUGF0aCA9IGpvaW5QYXRoKF9fZGlybmFtZSwgXCIuLi9uYXRyaXkuY2ZnXCIpO1xuXG5pZiAoIWZpbGVFeGlzdHMobWFpbkZpbGVQYXRoKSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoYGNsYXNzICR7bWFpblBhY2thZ2V9LyR7bWFpbkNsYXNzfSAoJHttYWluRmlsZVBhdGh9KSBkb2Vzbid0IGV4aXN0cy5gKTtcbn1cblxuaWYgKCFmaWxlRXhpc3RzKGNvbmZpZ0ZpbGVQYXRoKSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoYGNvbmZpZyBmaWxlICgke2NvbmZpZ0ZpbGVQYXRofSkgd2Fzbid0IGZvdW5kLmApO1xufVxuXG5mdW5jdGlvbiBzcGF3blByb2dyYW1Qcm9jZXNzKCk6IENoaWxkUHJvY2VzcyB7XG5cdGNvbnN0IG5ld1Byb2Nlc3MgPSBmb3JrKG1haW5GaWxlUGF0aCk7XG5cblx0bmV3UHJvY2Vzcy5vbmNlKFwic3Bhd25cIiwgKCkgPT4ge1xuXHRcdG5ld1Byb2Nlc3Muc2VuZChcInN0YXJ0XCIsIChlcnIpID0+IHtcblx0XHRcdGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHR9KTtcblx0fSk7XG5cblx0bmV3UHJvY2Vzcy5vbmNlKFwiZXJyb3JcIiwgKGVycikgPT4ge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0fSk7XG5cblx0cmV0dXJuIG5ld1Byb2Nlc3M7XG59XG5cbmxldCBwcm9ncmFtUHJvY2VzcyA9IHNwYXduUHJvZ3JhbVByb2Nlc3MoKTtcblxubGV0IGNhblVwZGF0ZSA9IHRydWU7XG53YXRjaEZpbGUoY29uZmlnRmlsZVBhdGgsIChlKSA9PiB7XG5cdGlmIChlID09IFwicmVuYW1lXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGNvbmZpZyBmaWxlICgke2NvbmZpZ0ZpbGVQYXRofSkgd2FzIHJlbmFtZWQuYCk7XG5cdH1cblxuXHRpZiAoIXByb2dyYW1Qcm9jZXNzLmNvbm5lY3RlZCkge1xuXHRcdHByb2dyYW1Qcm9jZXNzID0gc3Bhd25Qcm9ncmFtUHJvY2VzcygpO1xuXHRcdGNhblVwZGF0ZSA9IGZhbHNlO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChjYW5VcGRhdGUpIHtcblx0XHRwcm9ncmFtUHJvY2Vzcy5zZW5kKFwidXBkYXRlXCIsIChlcnIpID0+IHtcblx0XHRcdGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHR9KTtcblxuXHRcdGNhblVwZGF0ZSA9IGZhbHNlO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICghY2FuVXBkYXRlKSBjYW5VcGRhdGUgPSB0cnVlO1xufSk7XG4iXSwibWFwcGluZ3MiOiJhQUFBLDBCQUNBLHNCQUNBLDRDQUVBLEdBQU1BLFlBQVcsQ0FBRyxNQUFNLENBQzFCLEdBQU1DLFVBQVMsQ0FBRyxTQUFTLENBRTNCLEdBQU1DLGFBQVksQ0FBRyxHQUFBQyxVQUFRLEVBQUNDLFNBQVMsc0JBQWdCSixXQUFXLGFBQUlDLFNBQVMsUUFBTSxDQUNyRixHQUFNSSxlQUFjLENBQUcsR0FBQUYsVUFBUSxFQUFDQyxTQUFTLENBQUUsZUFBZSxDQUFDLENBRTNELEdBQUksQ0FBQyxHQUFBRSxjQUFVLEVBQUNKLFlBQVksQ0FBQyxDQUFFLENBQzlCLEtBQU0sSUFBSUssTUFBSyxpQkFBVVAsV0FBVyxhQUFJQyxTQUFTLGNBQUtDLFlBQVksc0JBQW9CLENBQ3ZGLENBRUEsR0FBSSxDQUFDLEdBQUFJLGNBQVUsRUFBQ0QsY0FBYyxDQUFDLENBQUUsQ0FDaEMsS0FBTSxJQUFJRSxNQUFLLHdCQUFpQkYsY0FBYyxvQkFBa0IsQ0FDakUsQ0FFQSxRQUFTRyxvQkFBbUIsRUFBaUIsQ0FDNUMsR0FBTUMsV0FBVSxDQUFHLEdBQUFDLG1CQUFJLEVBQUNSLFlBQVksQ0FBQyxDQUVyQ08sVUFBVSxDQUFDRSxJQUFJLENBQUMsT0FBTyxDQUFFLFVBQU0sQ0FDOUJGLFVBQVUsQ0FBQ0csSUFBSSxDQUFDLE9BQU8sQ0FBRSxTQUFDQyxHQUFHLENBQUssQ0FDakMsR0FBSUEsR0FBRyxDQUFFQyxPQUFPLENBQUNDLEtBQUssQ0FBQ0YsR0FBRyxDQUFDLENBQzVCLENBQUMsQ0FBQyxDQUNILENBQUMsQ0FBQyxDQUVGSixVQUFVLENBQUNFLElBQUksQ0FBQyxPQUFPLENBQUUsU0FBQ0UsR0FBRyxDQUFLLENBQ2pDQyxPQUFPLENBQUNDLEtBQUssQ0FBQ0YsR0FBRyxDQUFDLENBQ25CLENBQUMsQ0FBQyxDQUVGLE1BQU9KLFdBQVUsQ0FDbEIsQ0FFQSxHQUFJTyxlQUFjLENBQUdSLG1CQUFtQixFQUFFLENBRTFDLEdBQUlTLFVBQVMsQ0FBRyxJQUFJLENBQ3BCLEdBQUFDLFNBQVMsRUFBQ2IsY0FBYyxDQUFFLFNBQUNjLENBQUMsQ0FBSyxDQUNoQyxHQUFJQSxDQUFDLEVBQUksUUFBUSxDQUFFLENBQ2xCLEtBQU0sSUFBSVosTUFBSyx3QkFBaUJGLGNBQWMsbUJBQWlCLENBQ2hFLENBRUEsR0FBSSxDQUFDVyxjQUFjLENBQUNJLFNBQVMsQ0FBRSxDQUM5QkosY0FBYyxDQUFHUixtQkFBbUIsRUFBRSxDQUN0Q1MsU0FBUyxDQUFHLEtBQUssQ0FDakIsT0FDRCxDQUVBLEdBQUlBLFNBQVMsQ0FBRSxDQUNkRCxjQUFjLENBQUNKLElBQUksQ0FBQyxRQUFRLENBQUUsU0FBQ0MsR0FBRyxDQUFLLENBQ3RDLEdBQUlBLEdBQUcsQ0FBRUMsT0FBTyxDQUFDQyxLQUFLLENBQUNGLEdBQUcsQ0FBQyxDQUM1QixDQUFDLENBQUMsQ0FFRkksU0FBUyxDQUFHLEtBQUssQ0FDakIsT0FDRCxDQUVBLEdBQUksQ0FBQ0EsU0FBUyxDQUFFQSxTQUFTLENBQUcsSUFBSSxDQUNqQyxDQUFDLENBQUMifQ==