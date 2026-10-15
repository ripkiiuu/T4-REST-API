import express from 'express';
import { game } from './src/data/game.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Halo dari REST API Koleksi Game!');
});

app.get('/game', (req, res) => {
    res.status(200).json({
        data: game
    });
});

app.get('/game/:id', (req, res) => {
    const id = Number(req.params.id);

    const gameDitemukan = game.find((item) => item.id === id);

    if (!gameDitemukan) {
        return res.status(404).json({
            error: {
                pesan: 'Game tidak ditemukan',
                kode: 404
            }
        });
    }

    res.status(200).json({
        data: gameDitemukan
    });
});

app.delete('/game/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = game.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: {
                pesan: 'Game tidak ditemukan',
                kode: 404
            }
        });
    }

    game.splice(index, 1);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
