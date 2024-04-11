import os
import subprocess

arquivo_realm_no_dispositivo = '/data/data/com.projelapp/files/default.realm'
path_arquivo_local = os.path.join(
    os.path.basename(os.path.realpath(__file__)),
    'default.realm'
)

if os.path.exists(path_arquivo_local):
    os.remove(path_arquivo_local)

comando_adb = f'adb pull {arquivo_realm_no_dispositivo} {path_arquivo_local}'

subprocess.run(comando_adb, shell=True, check=True)