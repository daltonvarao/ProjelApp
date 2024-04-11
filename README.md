# Versões dependentes

- Java: 17
- Node: 18

# Compilar aplicação para produção

As configurações de keystore já foram feitas no android/app/build.gradle.

Exemplo:

```
cd android
$env:JAVA_HOME="C:\Program Files\Java\jdk-20" ; .\gradlew.bat assembleRelease
```
