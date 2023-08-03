# swc-plugin-coverage - issue 224 

This is a minimal scope to highligh a potential bug/limitation in instrumentation with swc-plugin-coverage.
Bug is reported at https://github.com/kwonoj/swc-plugin-coverage-instrument/issues/224


To reproduce:
```
npm install
```

Then for NYC instrumentation:
```
npm run instrument:nyc-static
```
-> see result in instrument folder, look for statementMap part, you should have 13 elements with starting line 1,2,3,4,6,8,9,10,12,14,15,16,18 --> all lines are covered

Then for swc-plugin-coverage-instrument instrumentation:
```
npm run build
```
-> build will fail but instrumentation will be dumped on console, look for statementMap, you'll find 11 elements with starting line 1,2,3,4,6,8,12,14,15,16,18 --> missing lines 9 and 10