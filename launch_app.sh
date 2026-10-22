#!/usr/bin/env bash
PORT=1115
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CACHE_BUSTER=$(date +%s)
TARGET_URL="http://127.0.0.1:${PORT}/?v=${CACHE_BUSTER}"

# 1. Verificar si el servidor ya responde 200 OK
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 0.8 "http://127.0.0.1:${PORT}/api/version" 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" != "200" ]; then
    # Limpiar proceso anterior en el puerto si está colgado
    PIDS=$(lsof -ti:${PORT} 2>/dev/null)
    if [ -n "$PIDS" ]; then
        kill -9 $PIDS 2>/dev/null || true
        sleep 0.2
    fi

    # Iniciar servidor en segundo plano
    cd "$APP_DIR" || exit 1
    nohup /usr/bin/python3 server.py </dev/null >server.log 2>&1 &

    # Esperar hasta que responda
    for i in {1..30}; do
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 0.3 "http://127.0.0.1:${PORT}/api/version" 2>/dev/null || echo "000")
        if [ "$HTTP_STATUS" = "200" ]; then
            break
        fi
        sleep 0.1
    done
fi

# 2. Abrir en el navegador por defecto
open "$TARGET_URL"
echo "✅ Wetland Digital Twin launched at http://127.0.0.1:${PORT}/"
