const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Configurações do servidor
app.use(cors()); // Permite todas as origens
app.use(express.json());

// Endpoint para o root
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Endpoint para obter dados do arquivo JSON
app.get('/api/dados', (req, res) => {
    const file = path.join(__dirname, 'db.json');
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
        }
        try {
            const dadosJson = JSON.parse(data);
            res.json(dadosJson);
        } catch (parseError) {
            res.status(500).json({ erro: 'Erro ao processar o JSON' });
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
